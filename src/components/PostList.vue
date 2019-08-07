<template>
  <div>
    <div style="margin-top:50px;"></div>
    <div style="width:100%;height:650px;border:1px solid #dddddd;">
      <!-- title -->
      <div style="width:100%;height:55px;background:#f2f2f2">
        <v-layout row wrap mw-700>
        <v-select style='width:30%; overflow:auto;'
              v-model="selectedItem"
              :items="searchItem"
              label="Select"
              persistent-hint
              return-object
              single-line
            ></v-select>
        <v-text-field @keyup.enter='searchBtn()' style='width:50%' v-model="searchName" placeholder="Search title.."></v-text-field>
        <v-btn falt color='info' @click='searchBtn()'>검색</v-btn>
      </v-layout>
      </div>
      <!-- list -->
      <div style="width:100%; height:3px;"></div>
      <div class="list" style="width:30%; height:550px; float:left; overflow:auto">
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

      <!-- content -->
      <div style="width:70%;height:550px;padding:20px;text-align:center;float:left">

        <v-text-field v-model="title" label="Q."></v-text-field>
        <hr>
        <v-textarea v-on:keyup="count" v-model="body" :counter="maxCount" rows="23"></v-textarea>
        <router-link to="/postwriter"><v-btn flat class="movebtn button3">
        <v-icon size="25" class="mr-2 notranslate">create</v-icon>새로 작성하기</v-btn></router-link>
        <v-btn flat @click='updatePost'><v-icon size="25" class="mr-2 notranslate">create</v-icon>수정</v-btn>
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
      searchName:''
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
      this.uid=this.posts[i-1].id
    },
    async updatePost(){
      if(this.title == ''){
        alert("제목을 입력해주세요")
      }else if(this.body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.updatePost(this.postId,this.title,this.body,this.uid);
        this.getPersonalPosts()
      }
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
