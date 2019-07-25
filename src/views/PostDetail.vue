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
