<template>
<div class="notranslate">
  <div style="margin-top:48px"></div>
  <v-container>
    <form>
      <v-text-field v-model="board.title" placeholder="제목을 입력해주세요."></v-text-field>

      <ImageInput :imgurl='board.img' v-on:changeImg="board.img = $event" />
      <v-textarea solo v-model="board.body"></v-textarea>

      <v-flex xs12 text-xs-center round my-5>
        <v-btn flat color="gray" v-on:click="updateBoard()" class="movebtn">submit</v-btn>
        <v-btn flat color="gray" @click='$router.go(-1)' class="movebtn">back</v-btn>
      </v-flex>

    </form>
  </v-container>
</div>
</template>

<script>
import ImageInput from '../components/ImageInput'
import FirebaseService from '@/services/FirebaseService'
export default {
  name: 'boardWriter',
  data() {
    return {
      boardId: this.$route.params.boardId,
      board: {},
    }
  },
  components: {
    ImageInput
  },
  mounted() {
    this.getBoard(this.boardId)
  },
  methods: {
    async getBoard(id) {
      this.board = await FirebaseService.getBoard(id);
    },
    async updateBoard() {
      if (this.board.title == '') {
        alert("제목을 입력해주세요")
      } else if (this.board.body == '') {
        alert("내용을 입력해주세요")
      } else {
        await FirebaseService.updateBoard(this.boardId, this.board.title, this.board.body, this.board.img, this.board.uid);
        this.$router.go(-1)
      }

    }
  }
}
</script>
