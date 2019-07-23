<template>
  <div class="notranslate">
    <v-footer dark class="footcolor" height="auto" color="indigo">
      <v-layout justify-center row wrap>
        <!--weather-->
        <v-layout column style="z-index: 2;  opacity: 0.8;">
          <v-flex xs12>
            <a class="weatherwidget-io footcolor" href="https://forecast7.com/en/36d12128d34/gumi-si/" data-label_1="GUMI" data-label_2="WEATHER" data-theme="weather_one" >GUMI WEATHER</a>
          </v-flex>

          <v-dialog v-model="dialog" width="100%">
            <template v-slot:activator="{ on }">
              <v-btn flat v-on="on">
                <router-link to="" id="foottitle">@provided by HARMONY @2019.07.10 @git:https://lab.ssafy.com/Kim_yh/webmobile-sub2</router-link>
              </v-btn>
            </template>

            <div class="carousel notranslate">

              <div class="slide" style="background:black;">
                <div class="action" style="top:5%;left:5%">
                  <div class="text">PRODUCT <br> BY </div>
                  <div class="action"><span class="blip text footcolor">HARMONY</span></div>
                </div>
              </div>


              <div class="slide" style="background-image:url(https://i.imgur.com/Pk1Cx1N.jpg);">
                <div class="text">YEONGHOON KIM</div>
                <div class="action">
                  <span class="blip"><a href="https://lab.ssafy.com/Kim_yh" target="_blank"><font size="50px">Click me</font></a></span>
                  <span class="action-text"></span>
                </div>
              </div>

              <div class="slide" style="background-image: url(https://i.imgur.com/eFcIgEK.jpg)">
                <div class="text">YURIM KIM</div>
                <div class="action">
                  <span class="blip"><a href="https://lab.ssafy.com/myccpb08" target="_blank"><font size="50px">Click me</font></a></span>
                  <span class="action-text"></span>
                </div>
              </div>
              <div class="slide" style="background-image: url(https://i.imgur.com/KdCfKKg.png)">
                <div class="text">SUKYEONG LEE</div>
                <div class="action">
                  <span class="blip"><a href="https://lab.ssafy.com/LeeSuKyeong" target="_blank"><font size="50px">Click me</font></a></span>
                  <span class="action-text"></span>
                </div>
              </div>
              <div class="slide" style="background-image:url(https://i.imgur.com/7RugBUj.png)">
                <div class="text">JUYEON SEOK</div>
                <div class="action">
                  <span class="blip"><a href="https://lab.ssafy.com/seok" target="_blank"><font size="50px">Click me</font></a></span>
                  <span class="action-text"></span>
                </div>
              </div>
              <div class="slide" style="background-image: url(https://i.imgur.com/Xc0uYrK.png)">
                <div class="text" style="color:gray">GYEONGMIN JI</div>
                <div class="action">
                  <span class="blip"><a href="https://lab.ssafy.com/JIGyeongmin" target="_blank"><font size="50px">Click me</font></a></span>
                  <span class="action-text"></span>
                </div>
              </div>

            </div>



          </v-dialog>

        </v-layout>
    </v-layout>
  </v-footer>

</div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    dialog: false
  })
};
!function(d,s,id){
  var js,fjs=d.getElementsByTagName(s)[0];
  if(!d.getElementById(id)){
    js=d.createElement(s);
    js.id=id;
    js.src='https://weatherwidget.io/js/widget.min.js';
    fjs.parentNode.insertBefore(js,fjs);
  }
}(document,'script','weatherwidget-io-js');

</script>

<style scoped>
#foottitle{
  color: white!important;
  font-size: 2vw;
}
.footcolor{
  z-index: 1;
  background: linear-gradient(45deg, rgba(18,194,233,1) 0%, rgba(196,113,237,1) 46%, rgba(246,79,89,1) 100%);
   background-size: 400% 400%;
   -webkit-animation: Gradient 5s ease infinite;
   -moz-animation: Gradient 5s ease infinite;
   animation: Gradient 5s ease infinite;
}

html, body {
  @include fullsize();
}

.slide {
  position: absolute;
  width: 400px;
  height: 300px;
  left: 50%;
  top: 20%;
  margin-left: -200px;
  margin-top: 50px;
  box-shadow: 0 0 8px #000;
}

.text {
  position: absolute;
  left: 5%;
  top: 0;
  font-size: 50px;
  font-style: italic;
  font-weight: 700;
  white-space: nowrap;
  color: #fff;
  text-transform: uppercase;
}

.action {
  position: absolute;
  bottom: 5%;
  left: 60%;
  font-size: 50px;
  font-style: italic;
  font-weight: 700;
  white-space: nowrap;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

.blip {
  position: relative;

  display: inline-block;
  width: 70px;
  height: 70px;
  top: -8px;
  border-radius: 70px;

  margin-right: -10px;
  vertical-align: middle;
}

.action-text {
  color: #fff;
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
</style>
