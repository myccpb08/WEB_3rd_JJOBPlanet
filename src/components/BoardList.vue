<template>
  <div class="notranslate">

    <v-layout mt-5 wrap>
      <v-select style='width:30%'
            v-model="selectedItem"
            :items="searchItem"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
      <v-text-field @keyup.enter='searchBtn()' style='width:50%' v-model="searchName" placeholder="Search title.."></v-text-field>
      <v-btn falt color='info' @click='searchBtn()'>검색</v-btn>
      <router-link to="/boardwriter"><v-btn v-if="check" class="movebtn button2">
        <v-icon size="25" class="mr-2">create</v-icon>Write</v-btn></router-link>

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
      <v-select style='width:30%'
            v-model="selectedItem"
            :items="searchItem"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
          <v-text-field style='width:50%' v-model="searchName" placeholder="Search title.."></v-text-field>
          <v-btn falt color='info' @click='searchBtn()'>검색</v-btn>
      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn v-if="limits<boards.length" v-on:click="loadMoreBoards" class="movebtn button1"><v-icon size="25" class="mr-2">fa-plus</v-icon>View more</v-btn>
        <router-link to="/boardwriter"><v-btn v-if="check" class="movebtn button2">
          <v-icon size="25" class="mr-2">create</v-icon>Write</v-btn></router-link>
        </v-flex>
      </v-layout>
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
