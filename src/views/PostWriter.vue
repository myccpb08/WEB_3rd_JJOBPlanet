<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>


    <v-container>
      <form>
        <v-text-field v-model="title" placeholder="제목을 입력해주세요."></v-text-field>
        <markdown-editor v-model="body" ref="markdownEditor"></markdown-editor>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn flat @click='checkPost(body)'><v-icon size="25" class="mr-2 notranslate" color="red">check</v-icon>맞춤법검사</v-btn>
          <v-btn flat color="gray" v-on:click="postPost(title, body)" class="movebtn">submit</v-btn>
          <v-btn flat color="gray" @click='$router.go(-1)' class="movebtn">back</v-btn>
        </v-flex>
      </form>
    </v-container>
  </div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'
import axios from 'axios'
export default {
  name: 'PostWriter',
  data(){
    return{
      title: '',
      body: ''
    }
  },
  components: {
    markdownEditor
  },
  mounted(){

  },
  methods:{
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
    async postPost(title, body){
      if(title == ''){
        alert("제목을 입력해주세요")
      }else if(body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.postPost(title, body,this.$store.state.user)
        alert("post가 작성되었습니다.")
        this.$router.replace('/post')
      }
    }
  }
}
</script>
