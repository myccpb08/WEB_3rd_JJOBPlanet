<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>

      <v-layout column style='text-align:center'>
        <v-flex xs12>
        <strong class="display-1">{{board.title}}</strong><br>
        date : {{formatedDate(board.created_at)}}<br>
        by user {{board.displayName}} | {{board.email}}<br>
        content : <br>
        <v-img :src="board.img"></v-img>
        {{board.body}}

        </v-flex>
        <v-flex  xs12 text-xs-center round my-5>
          <router-link :to="{ name: 'boardUpdate', params: {board: board} }">
            <v-btn color="info" v-if="check" class="movebtn button1">update</v-btn>
          </router-link>
          <v-btn color="info" @click='deleteBoard()' v-if="check" class="movebtn button1">delete</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>
      </v-layout>

      <!-- 댓글 테스트 -->
      <v-layout column style="text-align:left">
        <v-flex xs12>
          <p v-if="this.comments.length == 0">엄써용</p>
          <!-- 작성된 댓글 리스트가 없으면 -->
          <div v-if="this.comments.length > 0">
            <!-- 작성된 댓글 리스트가 있으면 -->
            <h3 v-for="comment in this.comments">
              {{ comment.email }} - {{ comment.contents }}

              <!-- 수정버튼 -->
              <v-btn class="ma-2" v-if="comment.uid == $store.state.user.uid" text icon @click='comment.edit = !comment.edit'>
                <v-icon color="blue">edit</v-icon>
              </v-btn>

              <!-- 삭제버튼 -->
              <v-btn class="ma-2" v-if="comment.uid == $store.state.user.uid" text icon @click="deleteComment(comment.id)">
                <v-icon color="red">delete</v-icon>
              </v-btn>

              <!-- 댓글수정 작성 -->
              <form v-if="comment.edit">
                <v-text-field v-model="update_content" placeholder="수정 내용을 입력해주세요.">
                </v-text-field>
                <v-btn class="ml-0" text icon @click='editComment_contents(boardId, update_content, comment.id)'>
                  <v-icon>check_circle</v-icon>
                </v-btn>
              </form>

            </h3>
          </div>

          <div v-if="$store.state.user">
            <form>
              <v-text-field v-model="content" placeholder="내용을 입력해주세요"></v-text-field>
            </form>
            <v-btn color="info" v-on:click="postComment(boardId, content)" class="movebtn button2">submit</v-btn>
          </div>
        </v-flex>
      </v-layout>


    </v-container>
  </div>
</template>

<script>
import ImageInput from '../components/ImageInput'
import BoardList from '../components/BoardList'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'boardDetail',
  props:{
    img:{type:String,default:''}
  },
  data(){
    return{
      boardId: this.$route.params.boardId,
      board :{},
      comments: {},
      content: '',
      update_content: '',
      check:false
    }
  },
	components: {
		BoardList
	},
  mounted(){
    this.temp()
  },
  methods:{
    async temp(){
      this.checkUserClass(this.$store.state.user.uid)
      this.getBoard(this.boardId)
      this.getComments(this.boardId)
    },
    // 댓글 가져오기
    async getComments(id) {
      this.comments_edit = []
      this.comments = await FirebaseService.getBoardComments(id);
    },

    // 댓글 생성
    async postComment(boardId, content) {
      if (content == "") {
        alert("내용을 입력해주세요");
      } else {
        await FirebaseService.postBoardComment(
          boardId,
          content,
          this.$store.state.user
        );
        alert("댓글이 작성되었습니다.");
        this.content = ''
        this.getComments(boardId)
      }
    },
    // 댓글 수정
    async editComment_contents(boardId, update_content, commentId) {
      await FirebaseService.editBoardComment(boardId, update_content, commentId)
      this.update_content = ''
      this.getComments(boardId)

    },
    // 댓글 삭제
    async deleteComment(comment_id) {
      await FirebaseService.deleteBoardComment(this.boardId, comment_id);
      this.getComments(this.boardId)
    },

    async checkUserClass(uid){
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      if(this.userClass ==='master' || this.userClass==='admin'){
        this.check=true;
      }
    },
    async getBoard(id) {
      this.board = await FirebaseService.getBoard(id);
    },
    async deleteBoard(){
      await FirebaseService.deleteBoard(this.boardId);
      this.$router.go(-1);
    },
    formatedDate(date) {
      if(date == null){
        return;
      }else{
			  return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
      }
    }
  },
  watch : {
   comments_edit : function(){
   }
 }

}
</script>
