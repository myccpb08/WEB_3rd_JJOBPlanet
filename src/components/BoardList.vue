<template>
  <div class="notranslate">

    <v-layout mt-5 wrap>
      <v-select
            v-model="selectedItem"
            :items="searchItem"
            return-object
            single-line
          ></v-select>
      <v-text-field @keyup.enter='searchBtn()' style='width:20%; padding-left:5px;' v-model="searchName" placeholder="Search"></v-text-field>
      <button style="padding-top:15px; width:30px; height:40px; padding-left:5px;" color='white' @click='searchBtn()'><v-icon color="lightgray">fa-search</v-icon></button>
      <router-link to="/boardwriter"><v-btn flat style="padding-top:5px; padding-right:5px;" v-if="check" class="movebtn button2">
      <v-icon size="25" class="mr-1">create</v-icon>작성</v-btn></router-link>

      <v-flex v-for="i in boards.length > limits ? limits : boards.length"  xs12 sm12 md12 lg12>
        <router-link :to="{ name: 'boardDetail', params: {boardId: boards[i-1].id} }">
        <Board class="ma-3"
        :date="boards[i - 1].created_at.toString()"
        :title="boards[i - 1].title"
        :body="boards[i - 1].body"
        :imgSrc='boards[i-1].img===""?"http://placehold.it/150x150/FFFFFF?text=No+Image":boards[i - 1].img'
        :email='boards[i-1].email'
        :displayName='boards[i-1].displayName'
        ></Board>
        </router-link>
      </v-flex>
      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn flat v-if="limits<boards.length" v-on:click="loadMoreBoards" class="movebtn button1"><v-icon size="25" class="mr-2">fa-plus</v-icon>View more</v-btn>

        </v-flex>
      <v-layout row wrap mw-700>
      <v-select style='width:20%; overflow:auto; padding-left:5px;'
            v-model="selectedItem"
            :items="searchItem"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
          </v-layout>
          <v-text-field style='width:20%; padding-left:5px;' v-model="searchName" placeholder="Search"></v-text-field>
          <button style="padding-top:15px; padding-left:15px; width:30px; height:40px;" color='white' @click='searchBtn()'><v-icon color="lightgray">fa-search</v-icon></button>
          <router-link to="/boardwriter"><v-btn flat v-if="check" class="movebtn button2">
            <v-icon size="25" class="mr-1">create</v-icon>작성</v-btn></router-link>

      </v-layout>
      <br><br><br>
    </div>
  </template>
  <script>
  import Board from '@/components/Board'
  import FirebaseService from '@/services/FirebaseService'

  export default {
    name: 'BoardsList',
    props: {
      limits: {type: Number, default: 4},
      loadMore: {type: Boolean, default: false}
    },
    data() {
      return {
        totalBoards:[],
        boards: [],
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
      Board
    },
    mounted() {
      this.getBoards()
      this.checkUserClass(this.$store.state.user.uid)
    },
    methods: {
      searchBtn(){
        if(this.selectedItem === this.currentItem && this.searchName === this.currentName){
          return;
        }

        if(this.selectedItem === '전체'){
          this.boards = this.totalBoards
        }else if(this.selectedItem !== '' && this.selectedItem !=='전체'){
          this.getBoardsByItem(this.selectedItem)
        }
        this.currentItem = this.selectedItem
        this.currentName=this.searchName
        this.proplimit = 6
        this.$emit('loadMore',this.proplimit)

      },
      getBoardsByItem(word){
        this.boards=[]
        if(word === 'title'){
          for(let i=1;i<this.totalBoards.length;i++){
            if(this.totalBoards[i-1].title.includes(this.searchName)){
              this.boards.push(this.totalBoards[i-1])
            }
          }
        }else if(word === 'body'){
          for(let i=1;i<this.totalBoards.length;i++){
            if(this.totalBoards[i-1].body.includes(this.searchName)){
              this.boards.push(this.totalBoards[i-1])
            }
          }
        }else if(word === 'displayName'){
          for(let i=1;i<this.totalBoards.length;i++){
            if(this.totalBoards[i-1].displayName.includes(this.searchName)){
              this.boards.push(this.totalBoards[i-1])
            }
          }
        }else if(word === 'email'){
          for(let i=1;i<this.totalBoards.length;i++){
            if(this.totalBoards[i-1].email.includes(this.searchName)){
              this.boards.push(this.totalBoards[i-1])
            }
          }
        }
      },
      async getBoards() {
        this.totalBoards = await FirebaseService.getBoards()
        this.boards = this.totalBoards
      },
      loadMoreBoards() {
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
  </style>
