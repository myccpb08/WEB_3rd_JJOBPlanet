<template>
  <div class="notranslate">
    <v-layout mt-5 wrap>
      <v-flex v-for="i in boards.length > limits ? limits : boards.length"  xs12 sm12 md12 lg12>
        <router-link :to="{ name: 'boardDetail', params: {boardId: boards[i-1].id} }">
        <Board class="ma-3"
        :date="boards[i - 1].created_at.toString()"
        :title="boards[i - 1].title"
        :body="boards[i - 1].body"
        :imgSrc="boards[i - 1].img"
        ></Board>
        </router-link>
      </v-flex>

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
        check:false
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
