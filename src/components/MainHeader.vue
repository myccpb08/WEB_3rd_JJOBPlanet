<template>
  <div class="notranslate">
    <v-app style="position:absolute">
      <div class="toolbar">
        <v-toolbar id="header" :class="{night : night}">
          <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up">
            <v-icon>menu</v-icon>
          </v-toolbar-side-icon>
          <v-toolbar-title>
            <router-link to="/">
              <v-img id="breadth_logo" :class="{night : night}" :src="getImgUrl('breadth_logo.png')"/>
              <v-img id="breadth_logo_night" :class="{night : night}" :src="getImgUrl('night_breadth_logo_hormony_shadow.png')"/>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items class="hidden-xs-only">
            <v-btn flat>
              <router-link to="/portfolio" :class="{night : night}">Portfolio</router-link>
            </v-btn>
            <v-btn flat>
              <router-link to="/post" :class="{night : night}">Post</router-link>
            </v-btn>

            <!-- login SignUp Form -->
            <v-dialog v-if="!$store.state.user" v-model="loginDialog" width="380">
              <template v-slot:activator="{ on }">
                <v-btn flat v-on="on">
                  <router-link to="" :class="{night : night}">login</router-link>
                </v-btn>
              </template>

              <v-card>
                <v-img :src="getImgUrl('login_form.png')" style="width:100%">

                  <v-card-text style="margin-top:150px">
                    <div class="notranslate" style="padding-left:50px; text-align:center;">
                      <v-text-field v-model="loginEmail" label="Email" placeholder="이메일을 입력하세요." style="width:250px;"></v-text-field>
                      <v-text-field v-model="loginPassword" label="Password" placeholder="비밀번호를 입력하세요." type="password" style="width:250px;"></v-text-field>
                    </div>
                    <div class="notranslate" style="width:150px; margin: 0 auto; margin-top: 20px; text-align:center">
                      <v-btn flat icon round color="#20aa49" dark v-on:click="loginWithMail" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('gmail_icon.png')" style="width:100%"></v-img></v-btn>
                      <v-btn flat icon round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('google_logo.png')" style="width:100%"></v-img></v-btn>
                      <v-btn flat icon round color="#4267B2" dark v-on:click="loginWithFacebook" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('facebook_logo.png')" style="width:100%"></v-img></v-btn>
                      <br>

                      <v-dialog class="notranslate" v-model="signupDialog" width="385">
                        <template v-slot:activator="{ on }">
                          <v-btn flat icon round dark v-on="on" style="height:35px; color:RGB(255,255,255,0.55)"><p style="margin-top: 20px; font-size:18px;">Sing Up</p></v-btn>
                        </template>

                        <v-card class="notranslate">
                          <v-card-title class="headline" style="color:RGB(255,255,255,0)" primary-title></v-card-title>
                          <v-card-text>
                            <form>
                              <v-text-field v-model="signupEmail" style="width:300px; margin: 0 auto; margin-top: 50px; text-align:center" label="Email" placeholder="이메일을 입력하세요."></v-text-field>
                              <v-text-field v-model="signupPassword" style="width:300px; margin: 0 auto; text-align:center" label="Password" placeholder="비밀번호를 입력하세요." type="password"></v-text-field>
                            </form>
                          </v-card-text>
                          <v-divider style="width:300px; margin: 0 auto; text-align:center"></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat v-on:click="signUp()" style="height:35px; color:RGB(255,255,255,0.55)">Sign Up</v-btn>
                            <v-btn flat @click="signupDialog = false" style="height:35px; color:RGB(255,255,255,0.55)">Close</v-btn>
                          </v-card-actions>
                        </v-card>

                      </v-dialog>
                      <p style="margin-top: 20px; font-size:12px; color:RGB(255,255,255,0.65)">@provided by HARMONY @2019.07.10 @git:lab.ssafy.com</p>
                    </div>
                  </v-card-text>
                </v-img>
              </v-card>

            </v-dialog>

            <v-btn v-else flat v-on:click="logout" :class="{night : night}"><router-link to="/login">logout</router-link></v-btn>
            <v-btn flat icon v-on:click="bookmarksite('ujj', 'http://ujj.com')"><v-icon width="25px">bookmark</v-icon></v-btn>
            <v-dialog v-model="bookmarkDialog" width="380">
                    <v-card style="background-color: rgba(0,0,0,0);">
                      <v-img :src="getImgUrl('merong.png')" style="width:100%"></v-img>
                    </v-card>
                  </v-dialog>

            <!-- audio -->
            <v-btn icon @click='bgm()'>
              <v-icon v-if='audioFlag===true' >fa-play-circle</v-icon>
              <v-icon v-else>fa-pause-circle</v-icon>
            </v-btn>
            <audio id="bgm" preload="auto" loop>
              <source :src="bgmSrc" :type="bgmType"/>
            </audio>
            <input class="l" type="checkbox" @click='nightcheck()'/>



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

          <v-dialog class="notranslate" v-model="m_loginDialog" max-width="300">
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
              <v-img :src="getImgUrl('mobile_login_form.png')" style="width:100%">
                <!-- <v-card-title class="headline grey lighten-2 notranslate" primary-title>Login</v-card-title> -->
                <v-card-text style="margin-top:110px">
                  <div class="notranslate" style="padding-left:40px; text-align:center;">
                    <v-text-field v-model="loginEmail" label="Email" placeholder="이메일을 입력하세요." style="width:155px;"></v-text-field>
                    <v-text-field v-model="loginPassword" label="Password" placeholder="비밀번호를 입력하세요." type="password" style="width:158px;"></v-text-field>
                  </div>
                  <div class="notranslate" style="width:150px; margin: 0 auto; text-align:center">
                    <v-btn flat icon round color="#20aa49" dark v-on:click="loginWithMail" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('gmail_icon.png')" style="width:100%"></v-img></v-btn>
                    <v-btn flat icon round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('google_logo.png')" style="width:100%"></v-img></v-btn>
                    <v-btn flat icon round color="#4267B2" dark v-on:click="loginWithFacebook" style="width:25px;height:25px; opacity: 0.75;"><v-img :src="getImgUrl('facebook_logo.png')" style="width:100%"></v-img></v-btn>
                    <br>

                    <v-dialog class="notranslate" v-model="m_signupDialog" width="385">
                      <template v-slot:activator="{ on }">
                        <v-btn flat icon round dark v-on="on" style="height:35px; color:RGB(255,255,255,0.55)"><p style="margin-top: 20px; font-size:18px;">Sing Up</p></v-btn>
                      </template>

                      <v-card class="notranslate" id="mobile_login_form">
                        <v-card-title class="headline" style="color:RGB(255,255,255,0)" primary-title></v-card-title>
                        <v-card-text>
                          <form>
                            <v-text-field v-model="signupEmail" style="width:300px; margin: 0 auto; margin-top: 50px; text-align:center" label="Email" placeholder="이메일을 입력하세요."></v-text-field>
                            <v-text-field v-model="signupPassword" style="width:300px; margin: 0 auto; text-align:center" label="Password" placeholder="비밀번호를 입력하세요." type="password"></v-text-field>
                          </form>
                        </v-card-text>
                        <v-divider style="width:300px; margin: 0 auto; text-align:center"></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat v-on:click="signUp()" style="height:35px; color:RGB(255,255,255,0.55)">Sign Up</v-btn>
                          <v-btn flat @click="m_signupDialog = false" style="height:35px; color:RGB(255,255,255,0.55)">Close</v-btn>
                        </v-card-actions>
                      </v-card>

                    </v-dialog>
                    <p style="margin-top: 10px; font-size:12px; color:RGB(255,255,255,0.65)">@provided by HARMONY @2019.07.10 @git:lab.ssafy.com</p>
                  </div>
                </v-card-text>
              </v-img>
            </v-card>
          </v-dialog>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>

<script>
import $ from 'jquery'
import FirebaseService from '@/services/FirebaseService'
import firebase from 'firebase/app'

export default {
  name: 'MainHeader',
  data () {
    return{
      bgmSrc:'bgm.wav',
      bgmType:'audio/wav',
      audioFlag:true,
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
      night: false,
      bookmarkClick:0,
            bookmarkDialog:false,
      menuItems: [
        { icon: 'home', title: 'home', link: '/' },
        { icon: 'portrait', title: 'Portfolio', link: '/portfolio' },
        { icon: 'photo_filter', title: 'Post', link: '/post' }
      ]
    }
  },
  methods: {
    bgm(){
      var cBgm = document.getElementById("bgm");
      if(this.audioFlag==true){
        cBgm.play();
        this.audioFlag=false;
      }else if(this.audioFlag==false){
        cBgm.pause();
        this.audioFlag=true;
      }
    },
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    bookmarksite(title, url) {
      var agent = navigator.userAgent.toLowerCase();
      var name = navigator.appName;
      this.bookmarkClick+=1;
           if(this.bookmarkClick==10){

             this.bookmarkDialog=true;
             alert("이런 귀한 곳에 누추하신 분이????");
             this.bookmarkClick=0;
             return;
           }
      // MS 계열 브라우저를 구분  IE 11+, IE 11,Edge
      if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        window.external.AddFavorite(url, title);
      }
      else if(agent.indexOf('safari') > -1||agent.indexOf('chrome') > -1) { // Chrome
        alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
      }
      else if(agent.indexOf('firefox') > -1) { // Firefox
        alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
        window.sidebar.addPanel(title, url, " ");
      }
      else if (window.opera && window.print) { // opera
        var elem = document.createElement('a');
        elem.setAttribute('href', url);
        elem.setAttribute('title', title);
        elem.setAttribute('rel', 'sidebar');
        elem.click();
      }
    },
    async loginWithMail(){
      firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .then((user)=>{
        this.$store.state.accessToken = user.user.refreshToken
        this.$store.state.user = user.user
        localStorage.setItem('accessToken', this.$store.state.accessToken)
        localStorage.setItem('user', JSON.stringify(user.user))
        alert(this.$store.state.user.email + "님 로그인 되었습니다")
        this.closeDialog()
        this.$router.replace('/')
        FirebaseService.addLog(this.$store.state.user.uid,"login with mail")
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
          this.$store.state.accessToken = '';
          this.$store.state.user = '';
          localStorage.setItem('accessToken', this.$store.state.accessToken)
          localStorage.setItem('user', this.$store.state.user)
          this.closeDialog()
          this.$router.replace('/')
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
    nightcheck(event){
      this.night=!this.night;
      this.$store.state.night=this.night;
      if(this.$store.state.night){
        this.$store.state.imgSrc = "https://media.giphy.com/media/xUA7bgufvQFiE9nHPy/giphy.gif";
      }else{
        this.$store.state.imgSrc = "https://source.unsplash.com/random";
      }
      this.changeBgm();
    },
    changeBgm(){
      var cBgm = document.getElementById("bgm");
      cBgm.pause();
      if(this.$store.state.night){
        this.bgmSrc='maple_remix.mp3';
        this.bgmType='audio/mp3';
      }else{
        this.bgmSrc='bgm.wav';
        this.bgmType='audio/wav';
      }
      cBgm.currentTime=0;
      cBgm.load();
      if(this.audioFlag==false){
        cBgm.play();
        this.audioFlag=false;
      }else{
        cBgm.pause();
        this.audioFlag=true;
      }
    }
  },
  mounted(){

    if(localStorage.getItem("user")!=null && localStorage.getItem("user")!=''){
      this.$store.state.user = JSON.parse(localStorage.getItem("user") || "{}");
      this.$store.state.accessToken = localStorage.getItem('accessToken');
    }
  }
}
</script>


<style>
.notranslate.v-card.v-sheet.theme--light{
  background-image: url('../assets/team6/logo/sing_up_form.png')!important;
}

#breadth_logo{
  width: 140px;
  display: block;
}
#breadth_logo.night{
  display: none;
}
#breadth_logo_night{
  width: 140px;
  display: none;
}
#breadth_logo_night.night{
  display: block;
}
#header{
  position: fixed;
  z-index: 6;
  background-color: white;
  width:100%;

  }.night
  { background: rgb(12,9,29)!important; }

  a{
    text-decoration: none;
    font-size: 20px;
  }

  #header a{
    color: #555 !important;
  }
  #header a.night
  {
    color: #fff!important;
    animation: flashText .5s ease-out alternate infinite;
  }
  @keyframes flashText {
    to {
      text-shadow: 5px 5px 5px rgba(255, 255, 255, .50);
      opacity: 0.1;
    }
  }


  .l {
    background-color: rgba(0,0,0,0.7);
    border-radius: 0.75em;
    box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.3) inset;
    color: #fdea7b;
    display: inline-flex;
    align-items: center;
    margin: auto;
    padding: 0.15em;
    width: 3em;
    height: 1.5em;
    transition: background-color 0.1s 0.3s ease-out, box-shadow 0.1s 0.3s ease-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .l:before, .l:after {
    content: "";
    display: block;
  }
  .l:before {
    background-color: #d7d7d7;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    z-index: 1;
  }
  .l:after {
    background:
    linear-gradient(transparent 50%, rgba(0,0,0,0.15) 0) 0 50% / 50% 100%,
    repeating-linear-gradient(90deg,#bbb 0,#bbb,#bbb 20%,#999 20%,#999 40%) 0 50% / 50% 100%,
    radial-gradient(circle at 50% 50%,#888 25%, transparent 26%);
    background-repeat: no-repeat;
    border: 0.25em solid transparent;
    border-left: 0.4em solid #d8d8d8;
    border-right: 0 solid transparent;
    transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    transform: translateX(-22.5%);
    transform-origin: 25% 50%;
    width: 1.2em;
    height: 1em;
  }
  /* Checked */
  .l:checked {
    background-color: rgba(0,0,0,0.45);
    box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.1) inset;
  }
  .l:checked:before {
    background-color: currentColor;
    transform: translateX(125%)
  }
  .l:checked:after {
    border-left-color: currentColor;
    transform: translateX(-2.5%) rotateY(180deg);
  }
  /* Other States */
  .l:focus {
    /* Usually an anti-A11Y practice but set to remove an annoyance just for this demo */
    outline: 0;
  }

  </style>
