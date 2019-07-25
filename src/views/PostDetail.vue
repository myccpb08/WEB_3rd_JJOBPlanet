<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>
      <!-- 수정 -->
      <!-- <div v-show='toggleBtn'>
      <form>
        <v-text-field v-model="title" placeholder="제목을 입력해주세요."></v-text-field>
        <markdown-editor v-model="body" ref="markdownEditor"></markdown-editor>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn color="info" v-on:click="updatePost()" class="movebtn button2">update</v-btn>
          <v-btn color="info" @click='back()' class="movebtn button3">back</v-btn>
        </v-flex>
      </form>
      </div> -->
      <!-- Post -->
      <!-- <v-layout v-show='!toggleBtn' column style='text-align:center'>
        <v-flex xs12>
        <strong class="display-1">{{post.title}}</strong><br>
        date : {{formatedDate(post.created_at)}}<br>
        by user <br>
        content : <br>
        {{post.body}}
        </v-flex>
        <v-flex  xs12 text-xs-center round my-5>
          <v-btn color="info" @click='toggleBtn=!toggleBtn' class="movebtn button1">update</v-btn>
          <v-btn color="info" @click='deletePost()' class="movebtn button1">delete</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>
      </v-layout> -->
      <v-layout column style='text-align:center'>
        <v-flex xs12>
        <strong class="display-1">{{post.title}}</strong><br>
        date : {{formatedDate(post.created_at)}}<br>
        by user <br>
        content : <br>
        {{post.body}}
        </v-flex>
        <v-flex  xs12 text-xs-center round my-5>
          <router-link :to="{ name: 'postUpdate', params: {postId: postId} }">
            <v-btn color="info" class="movebtn button1">update</v-btn>
          </router-link>
          <v-btn color="info" @click='deletePost()' class="movebtn button1">delete</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>
      </v-layout>
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
      post :{}
    }
  },
	components: {
		ImgBanner,
		PostList,
	},
  mounted(){
    this.getPost(this.postId)
  },
  methods:{
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
