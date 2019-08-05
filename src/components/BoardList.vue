<template>
  <div class="notranslate">
    <v-select
          v-model="selectedItem"
          :items="searchItem"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
    <v-text-field v-model="searchName" placeholder="Search title.."></v-text-field>

    <v-layout mt-5 wrap>
        <template v-if='searchName===""'>
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
    </template>
      <template v-else>
      <v-flex  v-if='checkMember(i,selectedItem)' v-for="i in boards.length" xs12 sm12 md12 lg12>
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
    </template>

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
        boards: [],
        proplimit:this.limits,
        check:false,
        searchName:'',
        searchItem:['title','body','email','displayName'],
        selectedItem:[],
        count:0
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
      checkMember(i,selectedItem){
        if(selectedItem === 'body' && this.boards[i-1].body.includes(this.searchName)){
          this.count++;
          return true
        }
        if(selectedItem === 'title' && this.boards[i-1].title.includes(this.searchName)){
          this.count++;
          return true
        }
        if(selectedItem === 'email' && this.boards[i-1].email !==null && this.boards[i-1].email.includes(this.searchName)){
          this.count++;
          return true
        }
        if(selectedItem === 'displayName' && this.boards[i-1].displayName !==null && this.boards[i-1].displayName.includes(this.searchName)){
          this.count++;
          return true
        }

        return false
      },
      async getBoards() {
        this.boards = await FirebaseService.getBoards()
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
