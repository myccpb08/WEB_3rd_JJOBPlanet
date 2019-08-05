<template>
  <div>
    <div style="margin-top:48px"></div>
    <v-container>
      <v-card>
        <v-flex xs8 offset-xs2>
          <div>
            <v-layout column>
              <v-flex xs12>
                <div>
                <br>
                  <div style='min-width:20px; text-align:center;'>
                    <strong class="display-1" style="display:inline-block;">{{portfolio.title}}</strong>
                    <br>
                    <div style="height:1px; width:100%; background:lightgray;"></div>
                  </div>

                  <div style='text-align:right'>
                    <div>작성일 : {{formatedDate(portfolio.created_at)}}</div>

                    <div>작성자 {{portfolio.displayName}} | {{portfolio.email}}</div>

                  </div>
                  <br><br>

                  내용 : <br><br>
                  <hr><br>
                  <v-img style="width:72%; margin:0 auto;" :src="portfolio.img"></v-img>
                  <br><hr><br>
                  {{portfolio.body}}
                </div>
              </v-flex>
              <v-flex  xs12 text-xs-center round my-5>
                <router-link :to="{ name: 'portfolioUpdate', params: {portfolioId: portfolioId} }">
                  <v-btn color="info" v-if="check" class="movebtn">update</v-btn>
                </router-link>
                <v-btn color="info" @click='deletePortfolio()' v-if="check" class="movebtn">delete</v-btn>
                <v-btn color="info" @click='$router.go(-1)' class="movebtn">back</v-btn>
              </v-flex>
            </v-layout>

            <!-- 댓글 테스트 -->
            <v-layout column style="text-align:left">
              <v-flex xs12>
                <p v-if="this.comments.length == 0">첫 댓글을 남겨보세요</p>
                <!-- 작성된 댓글 리스트가 없으면 -->
                <div v-if="this.comments.length > 0">
                  <!-- 작성된 댓글 리스트가 있으면 -->
                  <h3 v-for="comment in this.comments">
                    {{ comment.email }} - {{ comment.contents }}

                    <!-- 수정버튼 -->
                    <v-btn class="ma-1" v-if="comment.uid == $store.state.user.uid" text icon @click='comment.edit = !comment.edit'>
                      <v-icon small color="blue">edit</v-icon>
                    </v-btn>

                    <!-- 삭제버튼 -->
                    <v-btn class="ma-1" v-if="comment.uid == $store.state.user.uid" text icon @click="deleteComment(comment.id)">
                      <v-icon small color="red">delete</v-icon>
                    </v-btn>
                    <hr>
                    <br>

                    <!-- 댓글수정 작성 -->
                    <form v-if="comment.edit">
                      <v-text-field v-model="update_content" placeholder="수정 내용을 입력해주세요.">
                      </v-text-field>
                      <v-btn class="ml-0" text icon @click='editComment_contents(portfolioId, update_content, comment.id)'>
                        <v-icon>check_circle</v-icon>
                      </v-btn>
                    </form>
                  </h3>
                </div>
                <div v-if="$store.state.user">
                  <v-layout wrap>
                    <v-flex pa-1>
                      <form>
                        <v-text-field v-model="content" placeholder="내용을 입력해주세요"></v-text-field>
                      </form>
                    </v-flex>
                    <v-flex shrink pa-1>
                      <v-btn small outlined rounded color="info" v-on:click="postComment(portfolioId, content)" class="movebtn">submit</v-btn>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-card>
    </v-container>
    <br><br><br>
  </div>
</template>

<script>
import ImageInput from '../components/ImageInput'
import PortfolioList from '../components/PortfolioList'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'portfolioDetail',
  props:{
    img:{type:String,default:''}
  },
  data(){
    return{
      portfolioId: this.$route.params.portfolioId,
      portfolio :{},
      comments: {},
      content: '',
      update_content: '',
      check:false
    }
  },
   components: {
      PortfolioList
   },
  mounted(){
    this.temp()
  },
  methods:{
    async temp(){
      this.checkUserClass(this.$store.state.user.uid)
      this.getPortfolio(this.portfolioId)
      this.getComments(this.portfolioId)
    },
    // 댓글 가져오기
    async getComments(id) {
      this.comments_edit = []
      this.comments = await FirebaseService.getPortfolioComments(id);
    },

    // 댓글 생성
    async postComment(portfolioId, content) {
      if (content == "") {
        alert("내용을 입력해주세요");
      } else {
        await FirebaseService.postPortfolioComment(
          portfolioId,
          content,
          this.$store.state.user
        );
        alert("댓글이 작성되었습니다.");
        this.content = ''
        this.getComments(portfolioId)
      }
    },
    // 댓글 수정
    async editComment_contents(portfolioId, update_content, commentId) {
      await FirebaseService.editPortfolioComment(portfolioId, update_content, commentId)
      this.update_content = ''
      this.getComments(portfolioId)

    },
    // 댓글 삭제
    async deleteComment(comment_id) {
      await FirebaseService.deletePortfolioComment(this.portfolioId, comment_id);
      this.getComments(this.portfolioId)
    },

    async checkUserClass(uid){
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      if(this.userClass ==='master' || this.userClass==='admin'){
        this.check=true;
      }
    },
    async getPortfolio(id) {
      this.portfolio = await FirebaseService.getPortfolio(id);
    },
    async deletePortfolio(){
      await FirebaseService.deletePortfolio(this.portfolioId);
      this.$router.go(-1);
    },
    formatedDate(date) {
      if(date == null){
        return;
      }else{
           return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`
      }
    }
  },
  watch : {
   comments_edit : function(){
   }
 }

}
</script>
