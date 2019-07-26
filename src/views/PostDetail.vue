<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>

      <v-layout column style='text-align:center'>
        <v-flex xs12>
        <strong class="display-1">{{post.title}}</strong><br>
        date : {{formatedDate(post.created_at)}}<br>
        by user {{post.displayName}} | {{post.email}}<br>
        content : <br>
        {{post.body}}

        </v-flex>
        <v-flex  xs12 text-xs-center round my-5>
          <router-link :to="{ name: 'postUpdate', params: {postId: postId} }">
            <v-btn color="info" v-if="$store.state.user.uid===post.uid" class="movebtn button1">update</v-btn>
          </router-link>
          <v-btn color="info" @click='deletePost()' v-if="$store.state.user.uid===post.uid" class="movebtn button1">delete</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>
      </v-layout>

        <!-- 댓글 테스트 -->
    <v-layout column style="text-align:left">
      <v-flex xs12>
        <p v-if="this.comments.length == 0">엄써용</p> <!-- 작성된 댓글 리스트가 없으면 -->
        <div v-if="this.comments.length > 0"> <!-- 작성된 댓글 리스트가 있으면 -->
          <h3 v-for="comment in this.comments">
            {{ comment.email }}  -  {{ comment.contents }}
            <v-btn class="movebtn button1" color="info" @click='changeflag()'>수정</v-btn>
            <v-btn class="movebtn button1" color="red" @click='deleteComment(comment.id)'>삭제</v-btn>
          </h3>
        </div>
        <form>
          <v-text-field v-model="content" placeholder="내용을 입력해주세요."></v-text-field>
        </form>
        <v-btn color="info" v-on:click="postComment(postId, content)" class="movebtn button2">submit</v-btn>
      </v-flex>
    </v-layout>
    <!-- 댓글 테스트 끝 -->


    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PostList from '../components/PostList'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'postDetail',
  data(){
    return{
      postId: this.$route.params.postId,
      post :{},
      comments: {},
      content: '',
    }
  },
	components: {
		ImgBanner,
		PostList,
	},
  mounted(){
    this.getPost(this.postId)
    this.getComments(this.postId)
  },
  methods:{
        // 댓글 가져오기
    async getComments(id) {
      this.comments = await FirebaseService.getComments(id);
    },

    // 댓글 생성
    async postComment(postId, content) {
      const where = '/postDetail/'+ postId
      if (content == '') {
        alert("내용을 입력해주세요")
      } else {
        await FirebaseService.postComment(postId, content, this.$store.state.user)
        alert(
          "댓글이 작성되었습니다.")
        this.$router.replace(where)

    // 변화 감지로 리로드 시도해보기
        setTimeout((function() {
          window.location.reload();
        }), 250);
      }
    },

    // 댓글 삭제
    async deleteComment(comment_id){
      await FirebaseService.deleteComment(this.postId, comment_id);
      this.$router.replace('/post')
    },

    async getPost(id) {
      this.post = await FirebaseService.getPost(id);
    },
    async deletePost(){
      await FirebaseService.deletePost(this.postId);
      this.$router.go(-1);
    },
    formatedDate(date) {
      if(date == null){
        return;
      }else{
			  return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`
      }
    }
  }
}
</script>
