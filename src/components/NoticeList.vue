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
      <router-link to="/noticewriter"><v-btn flat style="padding-top:5px; padding-right:5px;" v-if="check" class="movebtn button2">
      <v-icon size="25" class="mr-1">create</v-icon>작성</v-btn></router-link>

      <v-flex v-for="i in notices.length > limits ? limits : notices.length"  xs12 sm12 md12 lg12>
        <router-link :to="{ name: 'noticeDetail', params: {noticeId: notices[i-1].id} }">
        <Notice class="ma-3"
        :date="notices[i - 1].created_at.toString()"
        :title="notices[i - 1].title"
        :body="notices[i - 1].body"
        :imgSrc='notices[i-1].img===""?"http://placehold.it/150x150/FFFFFF?text=No+Image":notices[i - 1].img'
        :email='notices[i-1].email'
        :displayName='notices[i-1].displayName'
        ></Notice>
        </router-link>
      </v-flex>
      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn flat v-if="limits<notices.length" v-on:click="loadMoreNotices" class="movebtn button1"><v-icon size="25" class="mr-2">fa-plus</v-icon>View more</v-btn>

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
        <router-link to="/noticewriter"><v-btn flat style="padding-top:5px; padding-right:5px;" v-if="check" class="movebtn button2">
        <v-icon size="25" class="mr-1">create</v-icon>작성</v-btn></router-link>

      </v-layout>
    </v-layout>
      <br><br><br>
    </div>
  </template>
  <script>
  import Notice from '@/components/Notice'
  import FirebaseService from '@/services/FirebaseService'

  export default {
    name: 'NoticesList',
    props: {
      limits: {type: Number, default: 4},
      loadMore: {type: Boolean, default: false}
    },
    data() {
      return {
        totalNotices:[],
        notices: [],
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
      Notice
    },
    mounted() {
      this.getNotices()
      this.checkUserClass(this.$store.state.user.uid)
    },
    methods: {
      searchBtn(){
        if(this.selectedItem === this.currentItem && this.searchName === this.currentName){
          return;
        }

        if(this.selectedItem === '전체'){
          this.notices = this.totalNotices
        }else if(this.selectedItem !== '' && this.selectedItem !=='전체'){
          this.getNoticesByItem(this.selectedItem)
        }
        this.currentItem = this.selectedItem
        this.currentName=this.searchName
        this.proplimit = 6
        this.$emit('loadMore',this.proplimit)

      },
      getNoticesByItem(word){
        this.notices=[]
        if(word === 'title'){
          for(let i=1;i<this.totalNotices.length;i++){
            if(this.totalNotices[i-1].title.includes(this.searchName)){
              this.notices.push(this.totalNotices[i-1])
            }
          }
        }else if(word === 'body'){
          for(let i=1;i<this.totalNotices.length;i++){
            if(this.totalNotices[i-1].body.includes(this.searchName)){
              this.notices.push(this.totalNotices[i-1])
            }
          }
        }else if(word === 'displayName'){
          for(let i=1;i<this.totalNotices.length;i++){
            if(this.totalNotices[i-1].displayName.includes(this.searchName)){
              this.notices.push(this.totalNotices[i-1])
            }
          }
        }else if(word === 'email'){
          for(let i=1;i<this.totalNotices.length;i++){
            if(this.totalNotices[i-1].email.includes(this.searchName)){
              this.notices.push(this.totalNotices[i-1])
            }
          }
        }
      },
      async getNotices() {
        this.totalNotices = await FirebaseService.getNotices()
        this.notices = this.totalNotices
      },
      loadMoreNotices() {
        this.proplimit +=6;
        console.log("proplimit : " + this.proplimit)
        this.$emit('loadMore',this.proplimit)
      },
      async checkUserClass(uid) {
        this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
          return result;
        })
        if (this.userClass === 'admin') {
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
