<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>
    <v-container>
      <form>
        <v-text-field v-model="notice.title" placeholder="제목을 입력해주세요."></v-text-field>

        <ImageInput :imgurl='notice.img' v-on:changeImg="notice.img = $event"/>
        <v-textarea solo v-model="notice.body"></v-textarea>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn flat color="gray" v-on:click="updateNotice()" class="movebtn">submit</v-btn>
          <v-btn flat color="gray" @click='$router.go(-1)' class="movebtn">back</v-btn>
        </v-flex>

      </form>
    </v-container>
  </div>
</template>

<script>
import ImageInput from '../components/ImageInput'
import FirebaseService from '@/services/FirebaseService'
import $ from 'jquery'
export default {
  name: 'noticeWriter',
  data(){
    return{
      noticeId:this.$route.params.noticeId,
      notice:{},
    }
  },
  components: {
    ImageInput
  },
  mounted(){
    this.getNotice(this.noticeId)
  },
  methods:{
    async getNotice(id) {
      this.notice = await FirebaseService.getNotice(id);
    },
    async updateNotice(){
      if(this.notice.title == ''){
        alert("제목을 입력해주세요")
      }else if(this.notice.body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.updateNotice(this.noticeId,this.notice.title,this.notice.body,this.notice.img,this.notice.uid);
        this.$router.go(-1)
      }

    }
  }
}
</script>
