<template>
  <v-app style="position:absolute;">
    <div class="toolbar">
      <v-toolbar id="header">
        <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">
          <v-icon>menu</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/">
            <v-img id="breadth_logo" :src="getImgUrl('breadth_logo.png')"/>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat to="/calendar">Calendar</v-btn>
          <v-btn flat to="/board">Board</v-btn>
          <v-btn flat to="/post">Post</v-btn>
          <v-btn flat to="/backoffice" v-if='check'>BackOffice</v-btn>

          <!-- login SignUp Form -->
          <v-dialog v-if="!$store.state.user" v-model="loginDialog" width="360">
            <template v-slot:activator="{ on }">
              <v-btn flat v-on="on">
                <router-link to="">login</router-link>
              </v-btn>
            </template>

            <v-card>
              <v-img :src="getImgUrl('login_form.png')" style="width:360px; height:500px">

                <v-card-text style="margin-top:150px">
                  <div style="padding-left:50px; text-align:center;">
                    <v-text-field v-model="loginEmail" label="Email" @keyup.enter='loginWithMail' placeholder="이메일을 입력하세요." style="width:230px;"></v-text-field>
                    <v-text-field v-model="loginPassword" label="Password" @keyup.enter='loginWithMail' placeholder="비밀번호를 입력하세요." style="width:230px;" type="password"></v-text-field>
                  </div>
                  <div style="width:150px; margin: 0 auto; margin-top: 20px; text-align:center">


                    <v-dialog v-model="signupDialog" width="360">
                      <template v-slot:activator="{ on }">
                        <v-btn flat icon round color="#20aa49" dark v-on="on" style="width:25px;height:25px;"><v-img :src="getImgUrl('gmail_icon.png')" style="width:100%"></v-img></v-btn>
                      </template>

                      <v-card style="height:100%">
                        <v-img :src="getImgUrl('sing_up_form.png')" style="width:360px; height:500px">

                          <v-card-text style="margin-top:150px">
                            <div style="padding-left:50px; text-align:center;">
                              <v-text-field v-model="signupEmail" label="Email" placeholder="이메일을 입력하세요." style="width:230px;"></v-text-field>
                              <v-text-field v-model="signupPassword" label="Password" placeholder="비밀번호를 입력하세요." style="width:230px;" type="password"></v-text-field>
                            </div>
                          </v-card-text>
                          <v-divider style="width:300px; margin: 0 auto; margin-top:125px; text-align:center"></v-divider>

                          <v-card-actions>

                            <v-btn flat dark v-on:click="signUp()" style="width:168px; height:40px; color:#ffffff">Sign Up</v-btn>
                            <v-btn flat dark @click="signupDialog = false" style="width:168px; height:40px; color:#ffffff;">Close</v-btn>
                          </v-card-actions>
                        </v-img>
                      </v-card>

                    </v-dialog>


                    <v-btn flat icon round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:25px;height:25px;"><v-img :src="getImgUrl('google_logo.png')" style="width:100%"></v-img></v-btn>
                    <v-btn flat icon round color="#4267B2" dark v-on:click="loginWithFacebook" style="width:25px;height:25px;"><v-img :src="getImgUrl('facebook_logo.png')" style="width:100%"></v-img></v-btn>
                    <br>


                    <v-btn flat icon round dark v-on:click="loginWithMail" style="height:35px; color:#7f7b76"><p style="margin-top: 20px; font-size:18px;">Login</p></v-btn>

                    <p style="margin-top:50px; font-size:12px; color:RGB(255,255,255,0.65)">@provided by HARMONY @2019.07.10 @git:lab.ssafy.com</p>
                  </div>
                </v-card-text>
              </v-img>
            </v-card>

          </v-dialog>

          <v-btn v-else flat v-on:click="logout"><router-link to="/login">logout</router-link></v-btn>



        </v-toolbar-items>
      </v-toolbar>
    </div>



    <!-- Mobile Login SignUp Form -->
    <v-navigation-drawer temporary style="position:fixed" v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-dialog v-model="m_loginDialog" max-width="300">
          <template v-slot:activator="{ on }">
            <v-list-tile v-if="!$store.state.user" v-on="on">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Login</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-else v-on:click="logout">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>Logout</v-list-tile-content>
            </v-list-tile>
          </template>

          <v-card>
            <v-img :src="getImgUrl('mobile_login_form.png')" style="width:300px; height:500px">
              <v-card-text style="margin-top:140px">
                <div style="padding-left:40px; text-align:center;">
                  <v-text-field v-model="loginEmail" label="Email" placeholder="이메일을 입력하세요." style="width:200px;"></v-text-field>
                  <v-text-field v-model="loginPassword" label="Password" placeholder="비밀번호를 입력하세요." style="width:200px;" type="password"></v-text-field>
                </div>
                <div style="width:150px; margin: 0 auto; margin-top:20px; text-align:center">


                  <v-dialog v-model="m_signupDialog" width="300">
                    <template v-slot:activator="{ on }">
                      <v-btn flat icon round color="#20aa49" dark v-on="on" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('gmail_icon.png')" style="width:100%"></v-img></v-btn>
                    </template>

                    <v-card id="mobile_sign_up_form.png" style="width:300px;height:500px">
                      <v-img :src="getImgUrl('mobile_login_form.png')" style="width:300px; height:500px">
                        <v-card-text style="margin-top:140px">
                          <div style="padding-left:40px; text-align:center;">
                            <v-text-field v-model="signupEmail" label="Email" placeholder="이메일을 입력하세요." style="width:200px;"></v-text-field>
                            <v-text-field v-model="signupPassword" label="Password" placeholder="비밀번호를 입력하세요." style="width:200px;" type="password"></v-text-field>
                          </div style="padding-left:40px; text-align:center;">
                        </v-card-text>

                        <v-divider dark style="width:300px; margin: 0 auto; margin-top:140px; text-align:center"></v-divider>

                        <v-card-actions>
                          <v-btn flat dark v-on:click="signUp()" style="width:139px; height:35px;">Sign Up</v-btn>
                          <v-btn flat dark @click="m_signupDialog = false" style="width:139px; height:35px;">Close</v-btn>
                        </v-card-actions>
                      </v-img>
                    </v-card>
                  </v-dialog>

                  <v-btn flat icon round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('google_logo.png')" style="width:100%"></v-img></v-btn>
                  <v-btn flat icon round color="#4267B2" dark v-on:click="loginWithFacebook" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('facebook_logo.png')" style="width:100%"></v-img></v-btn>
                  <br>

                  <v-btn flat icon round dark v-on:click="loginWithMail" style="height:35px; color:RGB(255,255,255,0.55)"><p style="margin-top: 20px; font-size:18px;">Login</p></v-btn>

                  <p style="margin-top: 50px; font-size:12px; color:RGB(255,255,255,0.65)">@provided by HARMONY @2019.07.10 @git:lab.ssafy.com</p>
                </div>
              </v-card-text>
            </v-img>
          </v-card>
        </v-dialog>
      </v-list>
    </v-navigation-drawer>
  </v-app>

</template>

<script>
import $ from 'jquery'
import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'

export default {
  name: 'MainHeader',
  data () {
    return{
      loginEmail: '',
      loginPassword: '',
      signupEmail: '',
      signupPassword: '',
      loginDialog: false,
      signupDialog: false,
      m_loginDialog: false,
      m_signupDialog: false,
      sideNav: false,
      user: '',
      accessToken: '',
      menuItems: [
        { icon: 'home', title: 'home', link: '/' },
        { icon: 'fa-calendar', title: 'Calendar', link: '/calendar' },
        { icon: 'fa-edit', title: 'Board', link: '/board' },
        { icon: 'photo_filter', title: 'Post', link: '/post' }
      ],
      check:false
    }
  },
  methods: {
    async checkUserClass(uid) {
      if (uid == null) {
        return false;
      }
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      console.log(this.userClass)
      if ('admin' === this.userClass) {
        return true;
      } else {
        return false;
      }
    },
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    async loginWithMail(){
      firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .then((user)=>{
        this.$store.state.accessToken = user.user.refreshToken
        this.$store.state.user = user.user
        localStorage.setItem('accessToken', this.$store.state.accessToken)
        localStorage.setItem('user', JSON.stringify(user.user))
        alert(this.$store.state.user.email + "님 로그인 되었습니다")
        this.loginEmail=''
        this.loginPassword=''
        this.closeDialog()
        this.$router.replace('/')
        FirebaseService.addLog(this.$store.state.user.uid,"login with mail")

        FirebaseService.gettingtoken(this.$store.state.user)

        this.check = this.checkUserClass(this.$store.state.user.uid)
      })
      .catch((error)=>{
        alert(error)
      })
    },
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle()
      this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = result.user
      localStorage.setItem('accessToken', this.$store.state.accessToken)
      localStorage.setItem('user', JSON.stringify(result.user))
      alert(this.$store.state.user.email + "님 로그인 되었습니다")
      this.closeDialog()
      FirebaseService.addLog(this.$store.state.user.uid,"login with google")
      FirebaseService.initUserClass(result.user, "visitor")
      this.$router.replace('/')

      FirebaseService.gettingtoken(this.$store.state.user)

      this.check = await this.checkUserClass(this.$store.state.user.uid)
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook()
      this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = result.user
      localStorage.setItem('accessToken', this.$store.state.accessToken)
      localStorage.setItem('user', JSON.stringify(result.user))
      alert(this.$store.state.user.displayName + "님 로그인 되었습니다")
      this.closeDialog()
      FirebaseService.addLog(this.$store.state.user.uid,"login with facebook")
      FirebaseService.initUserClass(result.user, "visitor")
      this.$router.replace('/')

      FirebaseService.gettingtoken(this.$store.state.user)

      this.check = await this.checkUserClass(this.$store.state.user.uid)
    },
    signUp(){
      firebase.auth().createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
      .then((user)=>{
        alert("Your account has been created!")
        this.closeDialog()

        //권한 초기 설정
        FirebaseService.addLog(user.user.uid, "singup")
        FirebaseService.initUserClass(user.user, "visitor")
        this.$router.replace('/')
      })
      .catch((error)=>{
        alert(error)
      })
    },
    logout(){
      if(firebase.auth().currentUser == null){
        alert("로그인 후 이용해주세요.");
        this.$store.state.accessToken = '';
        this.$store.state.user = '';
        localStorage.setItem('accessToken', this.$store.state.accessToken)
        localStorage.setItem('user', this.$store.state.user)
        this.$router.replace('/')
      }
      else if(firebase.auth().currentUser){
        console.log(this.$store.state.user)
        firebase.auth().signOut().then(() => {
          FirebaseService.addLog(this.$store.state.user.uid,"logout");
          alert(this.$store.state.user.email + "님 로그아웃 되었습니다.");
          FirebaseService.outtoken(this.$store.state.user)
          this.$store.state.accessToken = '';
          this.$store.state.user = '';
          localStorage.setItem('accessToken', this.$store.state.accessToken)
          localStorage.setItem('user', this.$store.state.user)
          this.closeDialog()
          this.$router.replace('/')

          this.check =false
        }).catch(function(error) {
          alert(error);
        });
      }

    },
    closeDialog(){
      this.loginDialog = false;
      this.signupDialog = false;
      this.m_loginDialog = false;
      this.m_signupDialog = false;
      this.sideNav = false;
    },

  },
  mounted(){

    if(localStorage.getItem("user")!=null && localStorage.getItem("user")!=''){
      this.$store.state.user = JSON.parse(localStorage.getItem("user") || "{}");
      this.$store.state.accessToken = localStorage.getItem('accessToken');
    }

    this.check = this.checkUserClass(this.$store.state.user.uid)
  }
}
</script>


<style>
#breadth_logo{
  width: 140px;
  display: block;
}

#header{
  position: fixed;
  z-index: 6;
  background-color: white;
  width:100%;
  min-height: 64px;
  max-height: 64px;
  box-shadow: none;
}

a{
  text-decoration: none;
  font-size: 20px;
}

#header a{
  color: #555 !important;
}

</style>
