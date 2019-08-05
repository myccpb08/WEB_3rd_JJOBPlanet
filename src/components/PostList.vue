<template>
  <div>
    <div style="margin-top:50px;"></div>

    <div style="width:100%;height:650px;border:1px solid #dddddd;">
      <!-- title -->
      <div style="width:100%;height:50px;background:#f2f2f2">

      </div>
      <!-- list -->
      <div class="list" style="width:30%; height:550px; float:left;overflow:auto">

        <v-layout row wrap mw-700>
          <v-flex @click="postDetail(i)" v-for="i in posts.length > limits ? limits : posts.length" :class="'xs' + 12 / column" px-3>
            <!--<router-link :to="{ name: 'postDetail', params: {postId: posts[i-1].id} }">-->
            <Post
            :date="posts[i - 1].created_at"
            :title="posts[i - 1].title"
            :body="posts[i - 1].body"></Post>
            <!--</router-link>-->
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
            <v-btn flat v-if="limits<posts.length" v-on:click="loadMorePosts" class="movebtn button2"><v-icon size="25" class="mr-2">fa-plus</v-icon>더보기</v-btn>
            <br>
            <router-link to="/postwriter"><v-btn flat class="movebtn button3">
            <v-icon size="25" class="mr-2 notranslate">create</v-icon>새로 작성하기</v-btn></router-link>
          </v-flex>
        </v-layout>

      </div>

      <!-- content -->
      <div style="width:70%;height:550px;padding:20px;text-align:center;float:left">

        <v-text-field v-model="title" label="Q."></v-text-field>
        <hr>
        <v-textarea v-on:keyup="count" v-model="body" :counter="maxCount" rows="23"></v-textarea>
        <v-btn flat>수정</v-btn>
        <!--<v-label>{{letter}} / {{maxCount}}</v-label>-->

      </div>
    </div>

    <div style="margin-top:150px;"></div>

  </div>
</template>
<script>
import Post from '@/components/Post'
import FirebaseService from '@/services/FirebaseService'
export default {
  name: 'PostList',
  props: {
    column: {type: Number, default: 1},
    limits: {type: Number, default: 4},
    loadMore: {type: Boolean, default: false}
  },
  data() {
    return {
      posts: [],
      proplimit : this.limits,
      letter: 0,
      title:'',
      body: '',
      maxCount: 1000,

    }
  },
  components: {
    Post
  },
  mounted() {
    // this.getPosts()
    this.getPersonalPosts()
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts()
    },
    async getPersonalPosts(){
      this.posts = await FirebaseService.getPersonalPosts(this.$store.state.user)
    },
    async postPost(title, body){
      await FirebaseService.postPost(title, body,this.$store.state.user)
    },
    loadMorePosts() {
        this.proplimit +=6;
        console.log("proplimit : " + this.proplimit)
        this.$emit('loadMore',this.proplimit)
        // console.log(this.limits)
    },
    count: function(){
      this.letter = this.body.length;

    },
    postDetail(i){
      this.title = this.posts[i - 1].title;
      this.body = this.posts[i - 1].body;
    }
  }
}
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}

.list::-webkit-scrollbar {
  display:none;
}
</style>
