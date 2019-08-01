<template>
  <v-footer>
    <v-layout>

      <!-- advertisement -->
      <div style="background:#f0f0f0; width:100%; min-height:130px; padding-top:30px;padding-left:10%">

        <div style="width:65%;height:100%;display:inline-block;float:left">
          <v-img :src="getImgUrl('loudspeaker.png')" style="width:50px; float:left"></v-img>
          <p>
            <font style="font-size:30px; color:#3f4b5f;">광고/채용공고 문의</font><br>
            <font>함께 할 인재를 찾고 계신가요? Jjobplanet에서 찾으세요!</font>
          </p>
        </div>

        <div class="hidden-xs-only" style="width:35%;height:100%;display:inline-block;">
          <v-btn dark color="warning">기업회원 페이지 가기</v-btn>
          <v-img :src="getImgUrl('footerimg.png')" style="width:350px; float:right"></v-img>
        </div>



      </div>


    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({

  }),
  methods: {
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
  },
};

</script>
