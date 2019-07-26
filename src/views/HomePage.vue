<template>
  <div>
    <div style="margin-top:48px"></div>
    <div class="notranslate">
      <ImgBanner>
        <div id="bannerTitle" style="line-height:1.2em; font-size:7rem;" slot="text">JJOBPLANET</div>
      </ImgBanner>
    </div>
<canvas id="canvas" v-show="this.$store.state.night" style="position:absolute; width:100%; height:85%; z-index:0"></canvas>
    <v-container>
      <!-- About Me -->
      <v-layout my-5>
        <v-flex class="aboutMe" :class="$mq" style="z-index:1" xs8>
          <h2 class="notranslate" :class="{night : this.$store.state.night}">
            <span style="font-size:25pt;">About Us</span>


            <v-btn v-if="this.$store.state.langage==0" flat icon @click='refreshKR()' href="#googtrans(en|ko)"><img src="img/KR.png" alt="KOREA" width="25px"></v-btn>
            <v-btn v-else flat icon @click='refreshUS()' href="#googtrans(en|en)"><img src="img/US.png" alt="USA" width="25px"></v-btn>
          </h2>

          <p class="mr-4" v-line-clamp:20="5">
            안녕하세요! JJOBPLANET을 방문해주셔서 감사합니다.<br>
            저희 페이지는 취업을 하고싶은 취준생들의<br>
            취준생을 위한 취준생들에 의한 페이지입니다.<br>
            전국 취준생들의 취업을 열렬히 응원합니다.<br>
          </p>
        </v-flex>

        <div class="cubeshape cube" v-show="$mq==='mobile' ? false : true">
          <v-flex class="first_cube">
            <v-img :src="getImgUrl('harmony.png')" style="height:200px"/>
          </v-flex>

          <v-flex class="second_cube">
            <clock style="font-size:5px; height:650%"/>
          </v-flex>
        </div>

      </v-layout>

      <!--clock-->
      <v-layout :class="$mq" my-5 v-show="$mq==='mobile' ? true : false">
        <v-flex xs12>
          <clock/>
        </v-flex>
      </v-layout>

      <div style="margin-top:200px"></div>


      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex style="z-index:1" xs12>
          <router-link to="/portfolio">
            <h2 class="notranslate":class="{night : this.$store.state.night}">Portfolio</h2>
            <hr>
            <PortfolioList :column="$mq==='mobile'?1:2"></PortfolioList>
          </router-link>
        </v-flex>
      </v-layout>

      <div style="margin-top:150px"></div>

      <!-- Post -->
      <v-layout my-5>
        <v-flex style="z-index:1" xs12>
          <router-link to="/post">
            <h2 class="notranslate" :class="{night : this.$store.state.night}">Post</h2>
            <hr>
            <div style="margin-top:40px"></div>
          </router-link>
          <PostList :column="$mq==='mobile'?1:2"></PostList>
        </v-flex>
      </v-layout>

      <div style="margin-top:150px"></div>

      <!-- Github -->
      <v-layout my-5>
        <v-flex style="z-index:1" xs12>
          <h2 class="notranslate" :class="{night : this.$store.state.night}"><span style="font-size:25pt;">Project</span></h2>
          <hr>

          <div style="margin-top:40px"></div>
          <v-layout column v-if="$mq==='mobile'" >
            <v-flex xs12>
              <RepositoryList class="notranslate"></RepositoryList>
            </v-flex>
            <v-flex xs12 class="show-on-scroll">
              <membersgraph></membersgraph>
            </v-flex>
          </v-layout>
          <v-layout v-else align-center>
            <v-flex xs6 grow>
              <RepositoryList class="notranslate"></RepositoryList>
            </v-flex>
            <v-flex xs6 shrink class="show-on-scroll">
              <membersgraph></membersgraph>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <div style="margin-top:150px"></div>

      <!-- Graph -->
      <div class='notranslate'>
        <v-layout my-5 v-show="$mq==='mobile' ? false : true">
          <v-flex style="z-index:1" xs12>
            <h2 class="notranslate" :class="{night : this.$store.state.night}">
              <span style="font-size:25pt;">Graph</span>
            </h2>
            <hr>
            <gitgraph></gitgraph>
          </v-flex>
        </v-layout>
      </div>

      <div style="margin-top:80px"></div>

    </v-container>
  </div>
</template>
<script>
import membersgraph from '../components/membersgraph'
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'
import clock from '../components/clock'
import firebase from 'firebase/app'
import gitgraph from '../components/gitgraph'

export default {
  name: 'HomePage',
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    clock,
    gitgraph,
    membersgraph
  },
  data(){
    return{
      toggle_one : localStorage.getItem('langage')
    }
  },
  methods: {
    refreshKR(){
      localStorage.setItem('langage', 1)
      setTimeout((function() {
        window.location.reload();
      }), 250);
    },
    refreshUS(){
      localStorage.setItem('langage', 0)
      setTimeout((function() {
        window.location.reload();
      }), 250);
    },
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
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

.aboutMe.mobile{
  text-align: center;
  margin: 0 auto;
  font-size: 2vw;
}

.aboutMe.mr-4{
  overflow-y: scroll;
}

.cubeshape {
   width: 350px;
   text-align: center;
   margin: 0 auto;
   height: 100px;
  text-transform: uppercase;
}

.cube {
   -webkit-transition: -webkit-transform .33s;
   transition: transform .33s; /* Animate the transform properties */
   -webkit-transform-style: preserve-3d;
   transform-style: preserve-3d;
}


.first_cube,.second_cube {
   height: 100px;
   width: 100%;
  position: relative;
}

.first_cube {
   -webkit-transform: translateZ(50px);
   transform: translateZ(50px);
}

.second_cube {
   -webkit-transform: rotateX(-90deg) translateZ(-50px);
   transform: rotateX(-90deg) translateZ(-50px);
}

.second_cube h1{
  font-size: 1000%;
}

.cube:hover {
   -webkit-transform: rotateX(89deg);
   transform: rotateX(89deg);
}


h2.night{
  color: white;
}



</style>
