<template>
  <div>
    <div style="margin-top:68px"></div>
    <v-container>
      <v-card>
        <v-flex xs8 offset-xs2>
          <div>
            <v-layout column>
              <v-flex xs12>
                <div>
                <br>
                  <div style='min-width:20px; text-align:center;'>
                    <strong class="display-1" style="display:inline-block; margin-top: 15px;">{{mentor.title}}</strong>
                    <br>
                    <div style="height:1px; width:100%; background:lightgray;"></div>
                  </div>

                  <div style='text-align:right'>
                    <div>작성일 : {{formatedDate(mentor.created_at)}}</div>

                    <div>작성자 {{mentor.displayName}} | {{mentor.email}}</div>

                  </div>
                  <br>

                  <template v-if='mentor.img!==""'>
                    <br><hr><br>
                  </template>
                  <v-img style="width:72%; margin:0 auto;" :src="mentor.img"></v-img>
                  <br>
                  <template v-if='mentor.img!==""'>
                    <hr><br>
                  </template>
                  {{mentor.body}}
                </div>
              </v-flex>
              <v-flex  xs12 text-xs-center round my-5>
                <v-btn :to="{ name: 'mentorUpdate', params: {mentorId: mentorId} }" flat color="gray" v-if="check" class="movebtn">update</v-btn>
                <v-btn flat color="gray" @click='deleteMentor()' v-if="check" class="movebtn">delete</v-btn>
                <v-btn flat color="gray" @click='$router.go(-1)' class="movebtn">back</v-btn>
              </v-flex>
            </v-layout>
            <hr>
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
                      <v-btn class="ml-0" text icon @click='editComment_contents(mentorId, update_content, comment.id)'>
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
                      <v-btn style="padding-top:5px;" small outlined rounded flat color="gray" v-on:click="postComment(mentor, content)" class="movebtn">submit</v-btn>
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
import MentorList from '../components/MentorList'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'mentorDetail',
  props:{
    img:{type:String,default:''}
  },
  data(){
    return{
      mentorId: this.$route.params.mentorId,
      mentor :{},
      comments: {},
      content: '',
      update_content: '',
      check:false
    }
  },
   components: {
      MentorList
   },
  mounted(){
    this.temp()
  },
  methods:{
    async temp(){
      this.checkUserClass(this.$store.state.user.uid)
      this.getMentor(this.mentorId)
      this.getComments(this.mentorId)
    },
    // 댓글 가져오기
    async getComments(id) {
      this.comments_edit = []
      this.comments = await FirebaseService.getMentorComments(id);
    },

    // 댓글 생성
    async postComment(mentorId, content) {
      if (content == "") {
        alert("내용을 입력해주세요");
      } else {
        await FirebaseService.postMentorComment(
          mentorId,
          content,
          this.$store.state.user
        );
        alert("댓글이 작성되었습니다.");
        this.content = ''
        this.getComments(mentorId)
      }
    },
    // 댓글 수정
    async editComment_contents(mentorId, update_content, commentId) {
      await FirebaseService.editMentorComment(mentorId, update_content, commentId)
      this.update_content = ''
      this.getComments(mentorId)
    },
    // 댓글 삭제
    async deleteComment(comment_id) {
      await FirebaseService.deleteMentorComment(this.mentorId, comment_id);
      this.getComments(this.mentorId)
    },

    async checkUserClass(uid){
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      if(this.userClass ==='master' || this.userClass==='admin'){
        this.check=true;
      }
    },
    async getMentor(id) {
      this.mentor = await FirebaseService.getMentor(id);
    },
    async deleteMentor(){
      await FirebaseService.deleteMentor(this.mentorId);
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
