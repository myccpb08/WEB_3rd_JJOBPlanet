<template>
  <div class="notranslate">
    <div style="margin-top:48px"></div>
    <v-container>
      <form>
        <v-text-field v-model="mentor.title" placeholder="제목을 입력해주세요."></v-text-field>

        <ImageInput :imgurl='mentor.img' v-on:changeImg="mentor.img = $event"/>
        <v-textarea solo v-model="mentor.body"></v-textarea>

        <v-flex  xs12 text-xs-center round my-5>
          <v-btn flat color="gray" v-on:click="updateMentor()" class="movebtn">submit</v-btn>
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
  name: 'mentWriter',
  data(){
    return{
      mentId:this.$route.params.mentId,
      ment:{},
    }
  },
  components: {
    ImageInput
  },
  mounted(){
    this.getMentor(this.mentorId)
  },
  methods:{
    async getMentor(id) {
      this.mentor = await FirebaseService.getMentor(id);
    },
    async updateMentor(){
      if(this.mentor.title == ''){
        alert("제목을 입력해주세요")
      }else if(this.mentor.body == ''){
        alert("내용을 입력해주세요")
      }else{
        await FirebaseService.updateMentor(this.mentorId,this.mentor.title,this.mentor.body,this.mentor.img,this.mentor.uid);
        this.$router.go(-1)
      }

    }
  }
}
</script>
