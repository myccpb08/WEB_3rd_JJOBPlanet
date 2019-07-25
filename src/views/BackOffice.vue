<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>

    <div style="padding:50px">
      <div class="headline"><font>BackOfficePage</font></div>
      <v-layout column wrap justify-start mw-700>
        <v-flex v-for="i in userClasses.length">
          <UserClass
          :displayName="userClasses[i - 1].displayName"
          :email="userClasses[i - 1].email"
          :userClass="userClasses[i - 1].userClass"
          :uid="userClasses[i - 1].uid"
          >
          </UserClass>
        </v-flex>
      </v-layout>
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
      userClasses: []
    }
  },
   components: {
    UserClass
   },
  mounted(){
    this.getUserClasses()
  },
  methods:{
    async getUserClasses(){
      this.userClasses = await FirebaseService.getUserClasses()
    }
  }
}
</script>
