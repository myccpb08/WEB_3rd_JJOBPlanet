<template>
  <div>
    <div style="margin-top:50px;"></div>
    <div style="width:100%;height:670px;border:1px solid #dddddd;">
      <!-- title -->
      <div style="width:100%;height:55px;background:#f2f2f2">
        <v-layout row wrap mw-700>
        <v-select style='width:20%; overflow:auto; padding-left:5px;'
              v-model="selectedItem"
              :items="searchItem"
              label="Select"
              persistent-hint
              return-object
              single-line
            ></v-select>
        <v-text-field @keyup.enter='searchBtn()' style='width:20%; padding-left:5px;' v-model="searchName" placeholder="Search"></v-text-field>
        <button style="padding-top:15px; padding-left:15px; width:30px; height:40px;" color='white' @click='searchBtn()'><v-icon color="lightgray">fa-search</v-icon></button>
        <router-link to="/postwriter"><v-btn flat style="padding-top:5px; padding-right:5px;" class="movebtn button3">
        <v-icon size="25" class="mr-1 notranslate">create</v-icon>작성</v-btn></router-link>
      </v-layout>
      </div>
      <!-- list -->
      <div style="width:100%; height:3px;"></div>
      <div class="list hidden-xs-only" style="width:30%; height:550px; float:left; overflow:auto">
        <v-layout row wrap mw-700>
          <v-flex style="text-align:center;" @click="postDetail(i)" v-for="i in posts.length > limits ? limits : posts.length" :class="'xs' + 12 / column" px-3>
            <v-btn color="ffffff" style="height:110px; width:100%; box-shadow: none;">
            <!--<router-link :to="{ name: 'postDetail', params: {postId: posts[i-1].id} }">-->
            <Post
            :date="posts[i - 1].created_at"
            :title="posts[i - 1].title"
            :body="posts[i - 1].body"></Post>
            <!--</router-link>-->
            <!-- <v-divider></v-divider> -->
            </v-btn>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
            <v-btn flat v-if="limits<posts.length" v-on:click="loadMorePosts" class="movebtn button2"><v-icon size="25" class="mr-2">fa-plus</v-icon>더보기</v-btn>
          </v-flex>
        </v-layout>
      </div>
      <!-- moile list -->

      <div class="list mob" style="width:100%; height:550px; float:left; overflow:auto" :class="$mq">
        <v-layout row wrap mw-700>
          <v-flex style="text-align:center;" v-for="i in posts.length > limits ? limits : posts.length" :class="'xs' + 12 / column" px-3>
            <div>
              <div class="text-center mb-4">
                <!-- <v-btn @click="alert = !alert" color="ffffff" style="height:110px; width:100%; box-shadow: none;"> -->
                <v-btn @click="alert?updatePost():postDetail(i)" color="ffffff" style="height:110px; width:100%; box-shadow: none;">
                <!--<router-link :to="{ name: 'postDetail', params: {postId: posts[i-1].id} }">-->
                  <Post
                  :date="posts[i - 1].created_at"
                  :title="posts[i - 1].title"
                  :body="posts[i - 1].body"></Post>
                <!--</router-link>-->
                <!-- <v-divider></v-divider> -->
                </v-btn>
              </div>
              <v-alert v-if='i===choicePost' :value="alert" color="white" dark border="top" icon="mdi-home" transition="scale-transition">

                <!-- moblie content -->
                <div style="width:100%;padding:20px;text-align:center;float:left">

                  <v-text-field v-model="title" label="Q."></v-text-field>
                  <hr>
                  <v-textarea v-on:keyup="count" v-model="body" :counter="maxCount" rows="23"></v-textarea>
                  <!-- <router-link to="/postwriter"><v-btn flat class="movebtn button3">
                  <v-icon size="25" class="mr-2 notranslate">create</v-icon>새로 작성하기</v-btn></router-link> -->

                  <v-btn flat @click='checkPost(body)'><v-icon size="25" class="mr-2 notranslate" color="red">check</v-icon>맞춤법검사</v-btn>
                  <v-btn flat @click='updatePost'><v-icon size="25" class="mr-2 notranslate">create</v-icon>수정</v-btn>
                  <v-btn flat @click='deletePost'><v-icon size="25" class="mr-2 notranslate">delete</v-icon>삭제</v-btn>
                  <br>
                  <!--<v-label>{{letter}} / {{maxCount}}</v-label>-->
                </div>

              </v-alert>
            </div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
            <v-btn flat v-if="limits<posts.length" v-on:click="loadMorePosts" class="movebtn button2"><v-icon size="25" class="mr-2">fa-plus</v-icon>더보기</v-btn>
          </v-flex>
        </v-layout>
      </div>

      <!-- content -->
      <div style="width:70%;height:700px;padding:20px;text-align:center;float:left" class="hidden-xs-only">

        <v-text-field v-model="title" label="Q."></v-text-field>
        <hr>
        <v-textarea v-on:keyup="count" v-model="body" :counter="maxCount" rows="23" ></v-textarea>
        <!-- <router-link to="/postwriter"><v-btn flat class="movebtn button3">
        <v-icon size="25" class="mr-2 notranslate">create</v-icon>새로 작성하기</v-btn></router-link> -->
        <v-btn flat @click='checkPost(body)'><v-icon size="25" class="mr-2 notranslate" color="red">check</v-icon>맞춤법검사</v-btn>
        <v-btn flat @click='updatePost'><v-icon size="25" class="mr-2 notranslate">create</v-icon>수정</v-btn>
        <v-btn flat @click='deletePost'><v-icon size="25" class="mr-2 notranslate">delete</v-icon>삭제</v-btn>
        <br>
        <!--<v-label>{{letter}} / {{maxCount}}</v-label>-->
      </div>

    </div>

    <div style="margin-top:150px;"></div>

  </div>
</template>
<script>
import Post from '@/components/Post'
import FirebaseService from '@/services/FirebaseService'
import axios from 'axios'
export default {
  name: 'PostList',
  props: {
    column: {type: Number, default: 1},
    limits: {type: Number, default: 4},
    loadMore: {type: Boolean, default: false}
  },
  data() {
    return {
      totalPosts:[],
      posts: [],
      proplimit : this.limits,
      letter: 0,
      title:'',
      body: '',
      postId:'',
      uid:'',
      maxCount: 1000,
      searchItem:['전체','title','body'],
      selectedItem:'전체',
      currentItem:'전체',
      currentName:'' ,
      searchName:'',
      alert:false,
      choicePost:0
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
      checkPost(sentence){
       const formData = new FormData();
       formData.append('sentence', sentence);
       console.log('맞춤법검사버튼눌렀음')
       axios.post('http://localhost:8000/posts/test/', formData)
       .then(response => {
           console.log(response.data)
           this.body = response.data
         }
       )
     },
    searchBtn(){
      if(this.selectedItem === this.currentItem && this.searchName === this.currentName){
        return;
      }

      if(this.selectedItem === '전체'){
        this.posts = this.totalPosts
      }else if(this.selectedItem !== '' && this.selectedItem !=='전체'){
        this.getPostsByItem(this.selectedItem)
      }
      this.currentItem = this.selectedItem
      this.currentName=this.searchName
      this.proplimit = 6
      this.$emit('loadMore',this.proplimit)

    },
    getPostsByItem(word){
      this.posts=[]
      if(word === 'title'){
        for(let i=1;i<this.totalPosts.length;i++){
          if(this.totalPosts[i-1].title.includes(this.searchName)){
            this.posts.push(this.totalPosts[i-1])
          }
        }
      }else if(word === 'body'){
        for(let i=1;i<this.totalPosts.length;i++){
          if(this.totalPosts[i-1].body.includes(this.searchName)){
            this.posts.push(this.totalPosts[i-1])
          }
        }
      }
    },
    async getPersonalPosts(){
      this.totalPosts = await FirebaseService.getPersonalPosts(this.$store.state.user)
      this.posts = this.totalPosts
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
      this.postId=this.posts[i-1].id;
      this.uid=this.posts[i-1].id;
      this.choicePost=i;
      this.alert = !this.alert;
    },
    async updatePost(i){
      if(this.title == ''){
        alert("제목을 입력해주세요")
      }else if(this.body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.updatePost(this.postId,this.title,this.body,this.uid);
        alert("해당 자소서가 수정되었습니다")
        this.alert = !this.alert;
        this.getPersonalPosts()
      }
    },
    async deletePost() {
      await FirebaseService.deletePost(this.postId);
      alert("해당 자소서가 삭제되었습니다")
      this.getPersonalPosts()
    }
  }
}
</script>
<style>
.mob{
  display:none;
}
.mob.mobile {
  display:inline-block;
}
.mw-700 {
  max-width: 700px;
  margin: auto;
}

.list::-webkit-scrollbar {
  display:none;
}
</style>
