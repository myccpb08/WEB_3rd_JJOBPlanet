<template>
<div class="notranslate">
  <div style="margin-top:48px"></div>


  <v-container>
    <form>
      <v-text-field v-model="title" placeholder="제목을 입력해주세요."></v-text-field>
      <markdown-editor v-model="body" ref="markdownEditor"></markdown-editor>

      <v-flex xs12 text-xs-center round my-5>

        <!-- 작성의 맞춤법 테스트 -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on }">

            <v-btn flat v-on="on">
              <v-icon size="25" class="mr-2 notranslate" color="red">check</v-icon>맞춤법검사하러가기
            </v-btn>
          </template>
          <v-card>
            <!-- 툴바시작 -->
            <v-toolbar dark color="primary">
              <v-toolbar-title>맞춤법검사</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <!-- <v-btn icon dark @click="dialog = false"> -->
                <v-btn icon dark @click="reset()">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- 툴바끝 -->
            <!-- grid 테스트 -->
            <v-container fluid style="margin:0px auto" height="2000px">
              <v-layout row justify-space-between xs12 md12 lg12>
                <v-flex xs12 md12 lg12 style="padding-left:10px;padding-right:10px">
                  <h3>Before</h3>
                  <v-textarea v-on:keyup="count" v-model="body" :counter="maxCount" :rows="15" style="width:100%"></v-textarea>
                  <v-btn flat @click="checkPost(body)">
                    <v-icon size="25" class="mr-2 notranslate" color="red">check</v-icon>검사시작
                  </v-btn>
                  <v-btn flat v-on:click="postPost(title, body)" class="movebtn">
                    <v-icon size="25" class="mr-2 notranslate">create</v-icon>저장
                  </v-btn>
                </v-flex>

                <v-flex xs12 md12 lg12 style="padding-left:10px;padding-right:10px;">
                  <h3>
                    After
                    <v-spacer></v-spacer>
                    <img src="../../public/spell.png" />
                  </h3>
                  <v-spacer></v-spacer>
                  <div v-html="body2" style="border :1px solid gray;height:280px;width:100%;overflow:auto;"></div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
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
  data() {
    return {
      maxCount: 3000,
      title: '',
      body: '',
      body2: '',
      dialog: false,
    }
  },
  components: {
    markdownEditor
  },
  mounted() {

  },
  methods: {
    count: function() {
      this.letter = this.body.length;
    },

    reset() {
      this.dialog = false;
      this.body2 = "";
    },

    checkPost(sentence) {
      const formData = new FormData();
      formData.append("sentence", sentence);
      console.log("맞춤법검사버튼눌렀음");
      axios
        .post("http://localhost:8000/posts/test/", formData)
        .then(response => {
          console.log(response.data);
          this.body2 = response.data;
        });
    },
    async postPost(title, body) {
      if (title == '') {
        alert("제목을 입력해주세요")
      } else if (body == '') {
        alert("내용을 입력해주세요")
      } else {
        await FirebaseService.postPost(title, body, this.$store.state.user)
        alert("post가 작성되었습니다.")
        this.$router.replace('/post')
      }
    }
  }
}
</script>
