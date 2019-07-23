<template>
  <v-app>
    <div id="contall" :class="{night : this.$store.state.night}">
    <MainHeader/>

    <v-content>
      <router-view/>
    </v-content>

    <back-to-top bottom="20px" right="10px">
      <v-btn flat icon type="button" class="btn btn-info btn-to-top notranslate"><v-icon>keyboard_arrow_up</v-icon></v-btn>
    </back-to-top>
    <MainFooter/>
  </div>
  </v-app>
</template>

<script>
import store from './store'
import MainHeader from './components/MainHeader'
import MainFooter from './components/MainFooter'
import Vue from 'vue'
import BackToTop from 'vue-backtotop'

import $ from 'jquery'
Vue.use(BackToTop)
var agent = navigator.userAgent.toLowerCase();
var name = navigator.appName;

// MS 계열 브라우저를 구분  IE 11+, IE 11,Edge
if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
  alert("해당 브라우저는 크롬에 최적화 되어 있습니다.");
} else if(agent.indexOf('safari') > -1) { // Chrome or Safari
  if(agent.indexOf('chrome') > -1) { // Chrome
  }else{
    alert("해당 브라우저는 크롬에 최적화 되어 있습니다.");
  }
} else if(agent.indexOf('firefox') > -1) { // Firefox
  alert("해당 브라우저는 크롬에 최적화 되어 있습니다.");
}

export default {
  name: 'App',
  store,
  data() {
    return {
      night: false,
    }
  },
  components: {
    'MainHeader' : MainHeader,
    'MainFooter' : MainFooter,
    BackToTop,
  }
}

</script>
<style>
@font-face {
  font-family: 'Swagger';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/Swagger.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  }
*{
  font-family: Swagger;
}
#bannerTitle{
  z-index: 1;
  /* background: linear-gradient(90deg, rgba(240,20,30,5) 0%, rgba(150,120,220,1) 46%, rgba(250,240,0,5) 100%); */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

     letter-spacing: 0;
     padding: .25em 0 .325em;
     display: block;
     margin: 0 auto;
     text-shadow: 0 0 80px rgba(255,255,255,.5);

/* Clip Background Image */


    background: url('./assets/team6/bannerTitleColor.png');
     /*linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);*/
    -webkit-background-clip: text;
    background-clip: text;
       background-size: 400% 400%;
       -webkit-animation: Gradient 15s ease infinite;
       -moz-animation: Gradient 15s ease infinite;
       animation: Gradient 15s ease infinite;
}
#contall{
  color: black;
}
#contall.night
{ background: rgb(12,9,29)!important;
color: white;
}

@-webkit-keyframes Gradient {
   0% {
      background-position: 0% 50%
   }
   50% {
      background-position: 100% 50%
   }
   100% {
      background-position: 0% 50%
   }
}
::-webkit-scrollbar {width: 8px; height: 8px; border: 3px solid #fff; }
::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment {display: block; height: 10px; background: #efefef}
::-webkit-scrollbar-track {background: #efefef; -webkit-border-radius: 10px; border-radius:10px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.2)}
::-webkit-scrollbar-thumb {height: 50px; width: 50px; background: rgba(0,0,0,.2); -webkit-border-radius: 8px; border-radius: 8px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.1)}

.movebtn{
  flex: 1 1 auto;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
 /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  color: #fff !important;
}
.button1{
 background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
}
.button2{
 background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%);
}
.button3{
  background-image: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 51%, #a1c4fd 100%);
}
.movebtn:hover {
  background-position: right center; /* change the direction of the change here */
}

.morebtn {
  width: 100px;
  height: 45px;
  color: #FC6472 !important;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }

.morebtn:hover {
  background-color: #FC6472 !important;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff!important;
  transform: translateY(-7px);
}
</style>
