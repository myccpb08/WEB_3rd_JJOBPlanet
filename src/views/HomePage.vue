<template>
  <div class="backDiv">
    <div style="margin-top:60px"></div>

    <!--Main Banner -->
    <v-img :src="getImgUrl('Jjobplanet_banner.png')" style="width:100%;"></v-img>

    <!-- apply  -->
    <div style="background:#3f4b5f;width:100%;height:320px;">

      <div class="hidden-xs-only" style="width:28%;height:100%;display:inline-block;padding-left:10%;padding-top:30px;float:left">
        <hr style="border:1px solid white; width:70px; margin-bottom:20px">
        <!-- <p v-if="userName===undefined">
          <font style="color:white;">로그인 해주세요</font>
        </p>
        <p v-else> -->
          <font style="color:white;">
            <p>추천 채용공고</p>
          </font>
        <!-- </p> -->
        <v-btn flat dark outline style="width:110px;" to="/post"><label style='font-size:14.5px'>자기소개서</label></v-btn>
        <v-btn flat dark outline style="width:110px;" to="/calendar"><label style='font-size:14.5px'>내 채용달력</label></v-btn>

      </div>

      <div class="hidden-sm-and-up" style="width:15%;height:100%;display:inline-block;float:left">
      </div>

      <div class="applyList" style="width:70%;height:100%;display:inline-block;text-align:center;padding-top:25px; overflow:auto;">
        <div v-for="i in mainpagedata" style="background:white; height:130px; width:160px; margin-left:5px; margin-bottom:5px; display:inline-block;">
          <div class="containerbtn"  @click='openmodal(i)'>
            <div style="width:50px; height:50px; padding-top:10px; margin:0 auto;">
              <!-- style="height:auto; width:50px; margin:0 auto;  " -->
              <v-img aspect-ratio=1 :src='i.logo' contain style="width:auto; height:50px;"></v-img>
            </div>
            <div style="width:100%;height:70%; margin-bottom:10px;">
              <p>
                <div>
                  <font><b>{{i.name}}</b></font><br>
                </div>
                <div style="color:gray; font-size:12px; height:15px; overflow:hidden">
                  <font>{{i.plus}}</font><br>
                </div>
                <div style="color:orange; font-size:12px; height:15px; overflow:hidden">
                  <font>{{i.job}}</font>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Job Opening -->
    <div style="background:#f0f0f0; width:100%; text-align:center; padding:20px;">
      <div class="JO" style="text-align:center">

        <!-- hot -->
        <div class="JO" style="margin:20px;">
          <p style="padding-right:120px;">최근 게시판 인기공고</p>
          <div style="background:#ffffff; width:260px; height:450px; padding:20px; display:inline-block">
            <div v-for="i in newdata" style="width:100%; height:85px; margin-bottom:2px;">

              <div class="containerbtn"  @click='openmodal(i)' style="width:75%; padding:5px; text-align:left; overflow:hidden">
                <b>{{i.name}}</b><br>
                <font style="color:gray">{{i.end}}</font>
              </div>
            </div>
          </div>
        </div>

        <!-- Within 7 -->
        <div class="JO" style="margin:20px;">
          <p style="padding-right:80px;">7일 내에 마감하는 인기공고</p>
          <div style="background:#ffffff; width:260px; height:450px; padding:20px; display:inline-block">
            <div v-for="i in weekdata" style="width:100%; height:85px; margin-bottom:2px;">

              <div class="containerbtn"  @click='openmodal(i)' style="width:75%; padding:5px; text-align:left; overflow:hidden">
                <b>{{i.name}}</b><br>
                <font style="color:gray">{{i.end}}</font>
              </div>
            </div>
          </div>
        </div>


        <!--  -->
        <div class="JO hidden-xs-only" style="margin:20px;">
          <p style="padding-right:290px;">직무별 인기공고</p>
          <div style="background:#ffffff; width:400px; height:450px; padding:20px; padding-left:0px; display:inline-block">

            <div class="JO" style="width:35%; height:250px; ">
              <v-btn flat v-for="(value, key,index) in bygroup" @click='getgroup(key,index)' :style="{background : checkClickHot[index]?'orange':'white'}"  style="width:120px; height:25px; margin:1;">
                <font :style="{color : checkClickHot[index]?'white':'gray'}" style="width:100%; color:gray; font-size: 14px;">{{key}}</font>
              </v-btn>
            </div>
            <div class="JO" style="width:1px; height:400px; background:gray;"></div>


            <div class="JO" style="width:64%;">
              <div v-for="i in group" style="width:100%; height:80px; margin-bottom:2px;">
                <div class="containerbtn"  @click='openmodal(i)' style="width:90%; padding:5px; text-align:left;">
                  <b>{{i.name}}</b><br>
                  <div style="height:20px; overflow:hidden;">
                    <p>{{i.job}}</p>
                  </div>
                  <font style="color:gray">{{i.end}}</font>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal" @click='modalclose()'>
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click='modalclose()'>&times;</span>
        <div style="height: 100px;">
          <h1>{{modalfavorite.name}}</h1>
          <p v-if="modalfavorite.end===undefined" style="float: left; padding-top: 15px;">채용시 마감</p>
          <p v-else style="float: left; padding-top: 15px;">{{modalfavorite.start}} ~ {{modalfavorite.end}}</p>
          <v-btn icon disable @click='favorite()'>
            <v-icon small color="red" style="float: left;">star</v-icon>
          </v-btn>
        </div>
        <hr>
        <div v-for="i in modalfavorite.detail" >
          <v-img :src=i style="height:auto; width:auto; margin:0 auto"></v-img>
        </div>
      </div>
    </div>

    <hr>



    <div style="background:#f0f0f0; width:100%; text-align:center; padding:20px; display: inline-block;">

      <!-- section1 -->
      <div style="width:50%;height:600px; float:left">

      <div style="margin-left:30px;height:300px; width: 90%; float: left;">
        <h3 style="margin-left:30px;">공지사항</h3>
        <div class="homeboard">
          <v-flex v-for="i in notices.length > limits ? limits : notices.length"  xs12 sm12 md12 lg12>
            <router-link :to="{ name: 'noticeDetail', params: {noticeId: notices[i-1].id} }">
              <Notice class="ma-3"
              :date="notices[i - 1].created_at.toString()"
              :title="notices[i - 1].title"
              :body="notices[i - 1].body"
              :imgSrc='notices[i-1].img===""?"http://placehold.it/150x150/FFFFFF?text=No+Image":notices[i - 1].img'
              :email='notices[i-1].email'
              :displayName='notices[i-1].displayName'
              ></Notice>
            </router-link>
          </v-flex>
          <v-btn flat to="/notice"><v-icon size="15" class="mr-2">fa-plus</v-icon>View more</v-btn>
        </div>
      </div>


      <div style="width:90%;height:1px;background: RGB(155, 155, 155, 0.2); margin:20px; float:left"></div>

      <div style="margin-left:30px;height:300px; width: 90%; float: left;">
        <h3 style="margin-left:30px;">취업자게시판</h3>
        <div class="homeboard">
          <v-flex v-for="i in  mentors.length > limits ? limits : mentors.length"  xs12 sm12 md12 lg12>
            <router-link :to="{ name: 'mentorDetail', params: {mentorId: mentors[i-1].id} }">
              <Mentor class="ma-3"
              :date="mentors[i - 1].created_at.toString()"
              :title="mentors[i - 1].title"
              :body="mentors[i - 1].body"
              :imgSrc='mentors[i-1].img===""?"http://placehold.it/150x150/FFFFFF?text=No+Image":mentors[i - 1].img'
              :email='mentors[i-1].email'
              :displayName='mentors[i-1].displayName'
              ></Mentor>
            </router-link>
          </v-flex>
          <v-btn flat to="/mentor"><v-icon size="15" class="mr-2">fa-plus</v-icon>View more</v-btn>
        </div>
      </div>

      </div>


      <div style="width:1px; height:600px; background: RGB(155, 155, 155, 0.2); float:left"></div>

      <!-- section2 -->
      <div style="width:1px; height:600px; background: RGB(155, 155, 155, 0.2); float:left"></div>

<!-- section2 -->
<div style="width:49%; height:600px; float:left;">

<div class="onoffmixdiv" style="margin-left:30px; width: 90%; float: left;" >
  <h3 style="margin-left:30px;">추천 공모전/강연</h3>

  <v-carousel
        style="height:550px;">
      <v-carousel-item
        v-for="i in onoffmix"
      >
        <v-sheet
          color="#eee"
          height="100%"
        >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
              <v-img aspect-ratio=1 :src='i.img' contain style="width:300px; height:400px; margin:0 auto; padding-top:100px;"></v-img>

              <div style=" margin:0 auto; color:gray; ">
                <font><b>{{i.title}}</b></font><br>
                {{i.pay}}<br>{{i.time}}
              </div>

          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>


</div>
</div>


    </div>

    <div style="margin-top:100px; clear: both;"></div>

  </div>
</template>
<script>
import Notice from '@/components/Notice'
import Mentor from '@/components/Mentor'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import FirebaseService from '@/services/FirebaseService'
import axios from 'axios'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)
export default {

  name: 'HomePage',
  components: {
    Notice,
    Mentor,
    Vuetify,
  },
  data: function () {
    return {
      mainpagedata: {},
      newdata: {},
      weekdata: {},
      bygroup: {},
      group:{},
      myurl:'',
      prevBtn:null,
      currentIdx : 0,
      checkClickHot:[true,false,false,false,false,false,false,false,false,false,false],
      userName :'방문자',
      detail:'',
      starttime:'',
      endtime:'',
      modalfavorite:'',
      totalfavorite: [],
      notices: [],
      mentors:[],
      onoffmix:[],
      model: 0,
      showArrows: true,
      hideDelimiters: false,
      cycle: false,
    }
  },
  created () {
    var pathReference = FirebaseService.getstorage();
    pathReference.getDownloadURL()
    .then((url) => {
      this.geturl(url);
    });
  },
  methods: {
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    geturl(url){
      this.myurl=url
      axios.get(this.myurl)
      .then(response => {
        this.mainpagedata = response.data.banner
        this.newdata=response.data.new
        this.weekdata=response.data.week
        this.bygroup=response.data.bygroup
        this.group=response.data.bygroup['경영/사무']
        this.onoffmix=response.data.onoffmix
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    getgroup(key, idx){
      this.group=this.bygroup[key];
      this.checkClickHot[this.currentIdx]=false;
      this.checkClickHot[idx]=true;
      this.currentIdx = idx;

    },
    openmodal(input) {
      document.getElementById('myModal').style.display = "block";
      this.modalfavorite = input;
    },
    modalclose(){
      document.getElementById('myModal').style.display = "none"
    },
    async favorite(input){
      FirebaseService.addfavorite(this.modalfavorite,this.$store.state.user)
      this.totalfavorite = await FirebaseService.getfavorite(this.$store.state.user);
    },
    async getfavorite() {
      this.totalfavorite = await FirebaseService.getfavorite(this.$store.state.user);
    },
    async getNotices() {
      this.notices = await FirebaseService.getNotices()
    },
    async getMentors() {
      this.mentors = await FirebaseService.getMentors()
    },
  },
  mounted(){
    this.$store.state.langage = localStorage.getItem('langage');
    if(this.$store.state.user !== undefined && this.$store.state.user !== null){
      if(this.$store.state.user.displayName === null || this.$store.state.user.displayName === undefined){
        this.userName = this.$store.state.user.email ;
      }else{
        this.userName = this.$store.state.user.displayName + '(' + this.$store.state.user.email + ')';
      }
      console.log(this.userName+"!!")
    }else{
      console.log(this.userName)
    }
    this.getfavorite();
    this.getNotices();
    this.getMentors();
  },
  computed: {
    gettest : function(){
      this.totalfavorite = FirebaseService.getfavorite(this.$store.state.user);
    }
  },
  props: {
    limits: {type: Number, default: 4}
  },

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
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}
/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.containerbtn:hover{
  background: #ffffff;
}
.homeboard{
  width: 100%;
}
.homeboard .boardtitle{
  font-size: 14px!important;
  font-weight: bold;
  overflow: hidden;
}
.homeboard .grey--text{
  font-size: 8px!important;
  overflow: hidden;
}
.homeboard .v-card{
  height: 50px!important;
}
.homeboard .v-btn__content {
  font-size: 14px;
}
span.grey--text{
  overflow: hidden;
}
.v-item-group {
  background-color: #eee;
}
.v-item-group .v-btn__content{
  width: 12px;
}
.v-item-group .v-icon{
  color: black!important;
  opacity: 0.5;
  font-size:11px!important;
}
.onoffmixdiv .v-btn__content{
  color: black!important;
}

.onoffmixdiv .v-window {
  box-shadow: none;
}
</style>
