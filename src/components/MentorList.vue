<template>
  <div class="notranslate">

    <v-layout mt-5 wrap>
      <v-select style='width:5%'
            v-model="selectedItem"
            :items="searchItem"
            return-object
            single-line
          ></v-select>
      <v-text-field @keyup.enter='searchBtn()' style='width:20%; padding-left:5px;' v-model="searchName" placeholder="Search"></v-text-field>
      <button style="padding-top:15px; width:30px; height:40px; padding-left:5px;" color='white' @click='searchBtn()'><v-icon color="lightgray">fa-search</v-icon></button>
      <router-link to="/mentorwriter"><v-btn flat style="padding-top:5px; padding-right:5px;" v-if="check" class="movebtn button2">
      <v-icon size="25" class="mr-1">create</v-icon>작성</v-btn></router-link>

      <v-flex v-for="i in mentors.length > limits ? limits : mentors.length"  xs12 sm12 md12 lg12>
        <router-link :to="{ name: 'mentorDetail', params: {mentorId: mentors[i-1].id} }">
        <Mentor class="ma-3"
        :date="mentors[i - 1].created_at.toString()"
        :title="mentors[i - 1].title"
        :body="mentors[i - 1].body"
        :imgSrc='mentors[i-1].img===""?"http://placehold.it/150x150/FFFFFF?text=No+Image":mentors[i - 1].img'
        :email='mentors[i-1].email'
        :displayName='mentors[i-1].displayName'
        ></Mentor>
        </router-link>
      </v-flex>
      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn flat v-if="limits<mentors.length" v-on:click="loadMoreMentors" class="movebtn button1"><v-icon size="25" class="mr-2">fa-plus</v-icon>View more</v-btn>

        </v-flex>
      <v-layout row wrap mw-700>
        <v-select style='width:5%'
              v-model="selectedItem"
              :items="searchItem"
              return-object
              single-line
            ></v-select>
        <v-text-field @keyup.enter='searchBtn()' style='width:20%; padding-left:5px;' v-model="searchName" placeholder="Search"></v-text-field>
        <button style="padding-top:15px; width:30px; height:40px; padding-left:5px;" color='white' @click='searchBtn()'><v-icon color="lightgray">fa-search</v-icon></button>
        <router-link to="/mentorwriter"><v-btn flat style="padding-top:5px; padding-right:5px;" v-if="check" class="movebtn button2">
        <v-icon size="25" class="mr-1">create</v-icon>작성</v-btn></router-link>

      </v-layout>
    </v-layout>
      <br><br><br>
    </div>
  </template>
  <script>
  import Mentor from '@/components/Mentor'
  import FirebaseService from '@/services/FirebaseService'

  export default {
    name: 'MentorsList',
    props: {
      limits: {type: Number, default: 4},
      loadMore: {type: Boolean, default: false}
    },
    data() {
      return {
        totalMentors:[],
        mentors: [],
        proplimit:this.limits,
        check:false,
        searchName:'',
        searchItem:['전체','title','body','email','displayName'],
        selectedItem:'전체',
        currentItem:'전체',
        currentName:''
      }
    },
    components: {
      Mentor
    },
    mounted() {
      this.getMentors()
      this.checkUserClass(this.$store.state.user.uid)
    },
    methods: {
      searchBtn(){
        if(this.selectedItem === this.currentItem && this.searchName === this.currentName){
          return;
        }

        if(this.selectedItem === '전체'){
          this.mentors = this.totalMentors
        }else if(this.selectedItem !== '' && this.selectedItem !=='전체'){
          this.getMentorsByItem(this.selectedItem)
        }
        this.currentItem = this.selectedItem
        this.currentName=this.searchName
        this.proplimit = 6
        this.$emit('loadMore',this.proplimit)

      },
      getMentorsByItem(word){
        this.mentors=[]
        if(word === 'title'){
          for(let i=1;i<this.totalMentors.length;i++){
            if(this.totalMentors[i-1].title.includes(this.searchName)){
              this.mentors.push(this.totalMentors[i-1])
            }
          }
        }else if(word === 'body'){
          for(let i=1;i<this.totalMentors.length;i++){
            if(this.totalMentors[i-1].body.includes(this.searchName)){
              this.mentors.push(this.totalMentors[i-1])
            }
          }
        }else if(word === 'displayName'){
          for(let i=1;i<this.totalMentors.length;i++){
            if(this.totalMentors[i-1].displayName.includes(this.searchName)){
              this.mentors.push(this.totalMentors[i-1])
            }
          }
        }else if(word === 'email'){
          for(let i=1;i<this.totalMentors.length;i++){
            if(this.totalMentors[i-1].email.includes(this.searchName)){
              this.mentors.push(this.totalMentors[i-1])
            }
          }
        }
      },
      async getMentors() {
        this.totalMentors = await FirebaseService.getMentors()
        this.mentors = this.totalMentors
      },
      loadMoreMentors() {
        this.proplimit +=6;
        console.log("proplimit : " + this.proplimit)
        this.$emit('loadMore',this.proplimit)
      },
      async checkUserClass(uid) {
        this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
          return result;
        })
        if (this.userClass === 'master' || this.userClass === 'admin') {
          this.check = true;
        }
      }

    },
  }
  </script>
  <style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
  .mobBr{
    display:none;
  }
  .mobBr.mobile {
    display:inline-block;
    text-align:center;
    align:center;
  }
  </style>
