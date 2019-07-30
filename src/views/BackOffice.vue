<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>

    <div style="padding:50px; padding-left:30px;">
      <div class="headline" style="margin-bottom:20px;"><font>BackOfficePage</font></div>

      <div>
        <v-card min-width="260" max-width="750" class="mx-auto" style="padding:30px; padding-top:5px; padding-bottom:5px; margin-left:0px">
            <v-layout wrap mw-700 xs6>
              <v-flex style="padding-bottom:0px;" v-for="i in userClasses.length">
                <UserClass
                :displayName="userClasses[i - 1].displayName"
                :email="userClasses[i - 1].email"
                :userClass="userClasses[i - 1].userClass"
                :uid="userClasses[i - 1].uid"
                >
                </UserClass>

              </v-flex>
            </v-layout>
        </v-card>


      </div>
    </div>
  </div>
</template>

<script>
import UserClass from '@/components/UserClass'
import FirebaseService from '@/services/FirebaseService'

export default {
   name: 'BackOfficePage',

  props:{

  },
  data(){
    return{
      userClasses: [],
      userClass :{}
    }
  },
   components: {
    UserClass
   },
  mounted(){
    this.temp()
  },
  methods:{
    async temp() {
      // await this.getUserClasses()
      // console.log(this.$store.state.user)
      var val = await this.checkUserClass(this.$store.state.user.uid);
      console.log("vallllll" + val)

      if(val){
        console.log(this.$store.state.user)
        await this.getUserClasses()
      }else{
        console.log(this.$store.state.user+"!!")
        alert("you are not admin. please login admin account");
        this.$router.replace('/')
      }
    },
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    async getUserClasses(){
      this.userClasses = await FirebaseService.getUserClasses()
    },
    async checkUserClass(uid){
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        console.log('----------')
        console.log(result)
        console.log('----------')
        return result;
      })
      console.log(this.userClass)
      if('admin' ===this.userClass){
        return true;
      }else{
        return false;
      }
    }
  }
}
</script>
