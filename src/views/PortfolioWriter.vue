<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>
    <ImgBanner>
      <div id="bannerTitle" style="line-height:1.2em;font-size:1.2em;" slot="text">PortfolioWriter</div>
    </ImgBanner>

    <v-container>
      <form>
        <v-text-field v-model="title" placeholder="제목을 입력해주세요."></v-text-field>

        <ImageInput/>

        <v-textarea solo v-model="body"></v-textarea>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn color="info" v-on:click="postPortfolio(title, body, img)" class="movebtn button1">submit</v-btn>
          <v-btn color="info" @click='$router.go(-1)' class="movebtn button2">back</v-btn>
        </v-flex>

      </form>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import ImageInput from '../components/ImageInput'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'
import $ from 'jquery'
export default {
  name: 'PortfolioWriter',
  data(){
    return{
      title: '',
      body: '',
      img: ''
    }
  },
  components: {
    ImgBanner,
    markdownEditor,
    ImageInput
  },
  methods:{
    async postPortfolio(title, body, img){
      if(title == ''){
        alert("제목을 입력해주세요")
      }else if(body == ''){
        alert("내용을 입력해주세요")
      }else{
        img=this.$store.state.inputimg
        await FirebaseService.postPortfolio(title, body, img)
        alert("portfolio가 작성되었습니다."+img)
        this.$router.replace('/portfolio')
      }

    }
  }
}
</script>
