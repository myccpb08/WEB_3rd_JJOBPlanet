<template>
  <div class="backDiv">
    <div style="margin-top:60px"></div>

    <!--Main Banner -->
    <v-img :src="getImgUrl('Jjobplanet_banner.png')" style="width:100%;"></v-img>

    <!-- apply  -->
    <div style="background:#3f4b5f;width:100%;height:320px;">

      <div class="hidden-xs-only" style="width:28%;height:100%;display:inline-block;padding-left:10%;padding-top:30px;float:left">
        <hr style="border:1px solid white; width:70px; margin-bottom:20px">
        <p>
          <font style="color:white;">
            Test님이 <br>
            <b>지원하신 채용공고</b> <br>
            입니다 <br><br>
          </font>
        </p>
        <v-btn flat dark outline style="width:100px;">채용공고 보기</v-btn><br>
        <v-btn flat dark outline style="width:100px;" to="/post">자기소개서</v-btn>
      </div>

      <div class="hidden-sm-and-up" style="width:15%;height:100%;display:inline-block;float:left">
      </div>

      <div v-if="$store.state.userApplyData" style="width:72%;height:100%;display:inline-block;text-align:center;padding-top:80px;">
        <p>
          <font style="color:white;font-size:30px;">
            Test님이 지원하신 공고가 없습니다.<br>
            <router-link to="" style="color:white;font-size:30px"><b>전체 공고 보러가기</b></router-link>
            <hr style="border:1px solid white; width:150px; margin:0 auto">
          </font>
        </p>
      </div>

      <div v-else class="applyList" style="width:70%;height:100%;display:inline-block;text-align:center;padding-top:25px; overflow:auto;">
  <div v-for="i in mainpagedata" style="background:white; height:130px; width:160px; margin-left:5px; margin-bottom:5px; display:inline-block;">
    <div style="width:50px; height:50px; padding-top:10px; margin:0 auto">
      <v-img :src=i.logo style="height:auto; width:50px; margin:0 auto"></v-img>
    </div>
    <div style="width:100%;height:50%; margin-bottom:10px;">
      <p>
        <div>
        <font><b>{{i.name}}</b></font><br>
      </div>
      <div style="color:gray; height:15px; overflow:hidden">
        <font>{{i.plus}}</font><br>
      </div>
      <div style="color:orange; height:15px; overflow:hidden">
        <font>{{i.job}}</font>
      </div>
      </p>
    </div>
  </div>
</div>

    </div>

    <!-- Job Opening -->
    <div style="background:#f0f0f0; width:100%; text-align:center; padding:20px;">
      <div class="JO" style="text-align:center">

        <!-- hot -->
        <div class="JO" style="margin:8px;">
          <p style="padding-right:170px;">최근 게시판 인기공고</p>
          <div style="background:#ffffff; width:260px; height:450px; padding:20px; display:inline-block">
            <div v-for="i in newdata" style="width:100%; height:85px; margin-bottom:2px;">
              <div style="width:25%; padding:15px; float:left">
                <!--<font style="color:gray"><b>{{i}}</b></font>-->
              </div>
              <div style="width:75%; padding:5px; text-align:left">
                <b>{{i.name}}</b><br>
                <font style="color:gray">{{i.dday}}</font>
              </div>
            </div>
          </div>
        </div>

        <!-- Within 7 -->
        <div class="JO" style="margin:8px;">
          <p style="padding-right:140px;">7일 내에 마감하는 인기공고</p>
          <div style="background:#ffffff; width:260px; height:450px; padding:20px; display:inline-block">
            <div v-for="i in weekdata" style="width:100%; height:85px; margin-bottom:2px;">
              <div style="width:25%; padding:15px; float:left">
                <!--<font style="color:gray"><b>{{i}}</b></font>-->
              </div>
              <div style="width:75%; padding:5px; text-align:left">
                <b>{{i.name}}</b><br>
                <font style="color:gray">{{i.dday}}</font>
              </div>
            </div>
          </div>
        </div>


        <!--  -->
        <div class="JO hidden-xs-only" style="margin:8px;">
          <p style="padding-right:330px;">직무별 인기공고</p>
          <div style="background:#ffffff; width:400px; height:450px; padding:8px; padding-left:0px; display:inline-block">

            <div class="JO" style="width:35%; height:250px;">
              <v-btn flat v-for="(value, key) in bygroup" @click='getgroup(key)' style="width:120px; height:25px; margin:1;">
                <font style="color:gray">{{key}}</font>
              </v-btn>
            </div>
            <div class="JO" style="width:1px; height:400px; background:gray;"></div>

            <div class="JO" style="width:64%;">
              <div v-for="i in group" style="width:100%; height:80px; margin-bottom:2px;">
                <div style="width:30%; padding:15px; float:left">
                  <font style="color:gray"><b>{{i.dday}}</b></font>
                </div>
                <div style="width:90%; padding:5px; text-align:left">
                  <b>{{i.name}}</b><br>
                  <b>{{i.job}}</b><br>
                  <font style="color:gray"></font>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- content -->
    <div style="width:100%; min-height:800px;">
      <div style="width:80%; height:100%; margin:0 auto; padding:50px;">

        <div>
          <div style="width:65%; height:100%; display:inline-block;">
              <p>
                <font style="font-size:24px;color:#ff6813">
                  <b>작성도구:</b><br>
                  자기소개서에 딱 필요한 기능<br>
                </font>
                <br>
                <font style="color:#555555">
                  원하는 공고만 클릭하면 자기소개서 문항을 바로 볼 수 있고<br>
                  맞춤법 검사의 글자 수도 확인 할 수 있어요.
                </font>
                <br><br><br><br>
              </p>
            </div>
            <!-- img -->
            <div class="hidden-xs-only" style="width:35%; height:100%; display:inline-block">
              <v-img :src="getImgUrl('contents_img1.png')" style="width:350px;"></v-img>
            </div>
          </div>

          <hr style="margin-top:50px;margin-bottom:50px;">

          <div>
            <!-- text -->
            <div style="width:65%; height:100%; display:inline-block;">
              <p>
                <font style="font-size:24px;color:#ff6813">
                  <b>취업자료:</b><br>
                  지원자 스펙 분석과 자소서연구소<br>
                </font>
                <br>
                <font style="color:#555555">
                  지원기업의 경쟁률이 궁금하다면? 실시간 지원자 분석!<br>
                  자기소개서 쓰기가 막막하다면? 자소서 연구소
                </font>
                <br><br><br><br><br>
              </p>
            </div>
            <!-- img -->
            <div class="hidden-xs-only" style="width:35%; height:100%; display:inline-block">
              <v-img :src="getImgUrl('contents_img2.png')" style="width:350px;"></v-img>
            </div>
          </div>

          <hr style="margin-top:50px;margin-bottom:50px;">

          <div>
            <!-- text -->
            <div style="width:65%; height:100%; display:inline-block;">
              <p>
                <font style="font-size:24px;color:#ff6813">
                  <b>정보공유:</b><br>
                  기업별, 직무별 채팅방<br>
                </font>
                <br>
                <font style="color:#555555">
                  같은 기업에 지원하는 사람들의 실시간으로 만나보세요.<br>
                  유용한 정보와 대화를 주고받을 수 있어요.
                </font>
                <br><br><br><br>
              </p>
            </div>
            <!-- img -->
            <div class="hidden-xs-only" style="width:35%; height:100%; display:inline-block">
              <v-img :src="getImgUrl('contents_img1.png')" style="width:350px;"></v-img>
            </div>
          </div>

        </div>
      </div>

    <div style="margin-top:100px;"></div>

  </div>
</template>
<script>

import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import firebase from 'firebase/app'
import FirebaseService from '@/services/FirebaseService'
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'HomePage',
  components: {
    PortfolioList,
    PostList,
    RepositoryList,
  },
  data: function () {
    return {
      mainpagedata: {},
      newdata: {},
      weekdata: {},
      bygroup: {},
      group:{},
      myurl:'',
      mygroup:'IT/인터넷',
    }
  },
  created () {
    var pathReference = FirebaseService.getstorage();
    pathReference.getDownloadURL()
   .then((url) => {
       this.geturl(url);
   });
    console.log(this.mainpagedata)
  },
  methods: {
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    geturl(url){
      this.myurl=url
      console.log(this.myurl);
      axios.get(this.myurl)
        .then(response => {
          this.mainpagedata = response.data.banner
          this.newdata=response.data.new
          this.weekdata=response.data.week
          this.bygroup=response.data.bygroup
          this.group=response.data.bygroup['IT/인터넷']
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getgroup(key){
      console.log(key);
      this.group=this.bygroup[key];
      console.log(this.group);
    }

  },
  mounted(){
    this.$store.state.langage = localStorage.getItem('langage');
  }

}
</script>

<style>
h2{
  color: black;
}
hr{
  border: solid 1px RGB(155, 155, 155, 0.2);
}
.backDiv{
  min-height: 1800px;
}

.JO{
  display: inline-block;
}

.applyList::-webkit-scrollbar {
  display:none;
}


</style>
