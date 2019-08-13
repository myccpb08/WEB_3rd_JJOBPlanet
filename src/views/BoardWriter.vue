<template>
  <div class="notranslate">
    <div style="margin-top:108px"></div>

    <v-container>
      <form>
        <v-text-field v-model="title" placeholder="제목을 입력해주세요."></v-text-field>

          <ImageInput :imgurl='img' v-on:changeImg="img = $event"/>

        <v-textarea rows="15" solo v-model="body"></v-textarea>

        <v-flex xs12 text-xs-center round my-5>
          <v-btn flat color="gray" v-on:click="postBoard(title, body, img)" class="movebtn">submit</v-btn>
          <v-btn flat color="gray" @click='$router.go(-1)' class="movebtn">back</v-btn>
        </v-flex>

      </form>
    </v-container>
    <div style="margin-top:78px"></div>
  </div>
</template>

<script>

import ImageInput from '../components/ImageInput'
import FirebaseService from '@/services/FirebaseService'
export default {
  name: 'BoardWriter',
  data(){
    return{
      title: '',
      body: '',
      img: ''
    }
  },
  components: {
    ImageInput
  },
  methods:{
    async postBoard(title, body, img){
      if(title == ''){
        alert("제목을 입력해주세요")
      }else if(body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.postBoard(title, body, img, this.$store.state.user)
        alert("Board가 작성되었습니다.")
        this.$router.replace('/board')
      }
    }
  }
}
</script>
