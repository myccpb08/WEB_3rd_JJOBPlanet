<template>
<v-layout v-if="this.$store.state.user.email===undefined" wrap justify-center>
  <div style="width:100%;height:750px; margin-top:-100px;">
  <div style="background-color: #404C5F; width:100%;height:320px;">

      <p style="text-align:center">
        <div style="margin-left:34%; padding-top:12%; width:270px; display:flex;">
          <v-img :src="getImgUrl('calendar_w.png')" style="padding-top:10px;"></v-img>
          <font style="color:white; font-weight: bold; font-size:1.6em; margin-left:20px; padding-top:7%;">로그인하고<br> 내 채용 달력보기</font>
        </div>
      </p>
      <br><br>
    <v-flex xs12 sm12 lg12 class="mb-4 controls" style="text-align:center">
      <v-flex xs12 sm12 lg12>
        <br>
        <v-sheet min-height="400" style="margin-top:80px">
          <div style="text-align:center">
            <v-btn fab flat small dark color="#7f7b76" @click="$refs.calendar.prev()" style="display:inline-block">
              <v-icon dark>keyboard_arrow_left</v-icon>
            </v-btn>
            <h1 style="display:inline-block; margin-left:10%; margin-right:10%;">{{start.substring(0, 7)}}</h1>
            <v-btn fab flat small dark color="#7f7b76" @click="$refs.calendar.next()" style="display:inline-block">
              <v-icon dark>keyboard_arrow_right</v-icon>
            </v-btn>
          </div>
          <v-calendar ref="calendar" v-model="start" :type="type" :start="start" :first-interval="intervals.first" :interval-minutes="intervals.minutes" :interval-count="intervals.count" :interval-height="intervals.height"
            :show-interval-label="showIntervalLabel" :short-intervals="true" :short-months="true" :short-weekdays="true" :color="color">
          </v-calendar>
          <div style="width:100%; height:70px; padding:15px; text-align:center">
            <v-btn small dark color="#7f7b76" @click="viewToday()">today</v-btn>
          </div>
        </v-sheet>
        <br>
      </v-flex>
    </v-flex>
  </div>

  </div>
</v-layout>

<v-layout v-else wrap justify-center>

<v-flex xs12 sm12 lg12 class="mb-4 controls" style="text-align:center">
  <v-sheet min-height="500">

    <div style="text-align:center">
      <v-btn fab flat small dark color="#7f7b76" @click="$refs.calendar.prev()" style="display:inline-block">
        <v-icon dark>keyboard_arrow_left</v-icon>
      </v-btn>
      <h1 style="display:inline-block; margin-left:10%; margin-right:10%;">{{start.substring(0, 7)}}</h1>
      <v-btn fab flat small dark color="#7f7b76" @click="$refs.calendar.next()" style="display:inline-block">
        <v-icon dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </div>

    <v-calendar ref="calendar" v-model="start" :type="type" :start="start" :first-interval="intervals.first" :interval-minutes="intervals.minutes" :interval-count="intervals.count" :interval-height="intervals.height"
      :show-interval-label="showIntervalLabel" :short-intervals="true" :short-months="true" :short-weekdays="true" :color="color">

      <template v-slot:day="day">
        <div v-for="(i,j) in totalfavorite">
         <v-sheet v-if="day.date===drawstart(i)" :color="getcolor(j)" class="calendarmsg white--text pa-1" @click='openmodal(i.favorite)'>
           <v-img :src="getImgUrl('start_icon.png')" style="margin-top:1px; height:15px; width:15px; float:left;"></v-img>
           <p style="padding-left:3px; padding-top:0px; height:1.3em; overflow:hidden;">{{ i.favorite.name }}</p>
         </v-sheet>
         <v-sheet v-else-if="day.date===drawend(i)" :color="getcolor(j)" class="calendarmsg white--text pa-1" @click='openmodal(i.favorite)'>
           <v-img :src="getImgUrl('end_icon.png')" style="margin-top:1px; height:15px; width:15px; float:left; "></v-img>
           <p style="padding-left:3px; padding-top:0px; height:1.3em; overflow:hidden;">{{ i.favorite.name }}</p>
         </v-sheet>
        </div>
      </template>

      <template v-slot:day-header="date">
        <v-sheet :color="color" class="calendarmsg white--text pa-1">
          <!--주간사일간어떻게 넣슴까-->
        </v-sheet>
      </template>

    </v-calendar>
    <div style="width:100%; height:70px; padding:15px; text-align:center">
      <v-btn small dark color="#7f7b76" @click="viewToday()">today</v-btn>
    </div>
  </v-sheet>
  <br>
  <hr>
  <br>
  <v-card class="mx-auto">
    <v-toolbar color="#6BBCDC" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>내가 추가한 기업</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <br>
    <v-container fluid grid-list-md pa-2>
      <v-layout wrap style="width:80%; margin-left:10%;">
        <v-flex style="text-align:center; width:100%;" v-for="i in totalfavorite">
          <!-- <div v-if="drawcalender(i)"></div> -->
          <div color="white" style="min-height:110px; width:100%; box-shadow: 4px 4px 4px 4px gray;">
            <v-btn @click='openmodal(i.favorite)' style="width:80%; box-shadow:none; min-height:110px; backgroundColor:white">
              <v-img aspect-ratio=1 :src='i.favorite.logo' contain style="width:10%; margin-left:5%; "></v-img>
              <div style="width:80%; ">
                {{i.favorite.name}}<br>
                <p style="font-size:17px; color:gray; padding-left:20px; overflow:auto;" v-if="i.favorite.end===undefined">채용시 마감</p>
                <p style="font-size:17px; color:gray; padding-left:20px; overflow:auto;" v-else>{{i.favorite.start}} ~ {{i.favorite.end}}
                </p>
              </div>
            </v-btn>
            <!-- <v-btn class="ma-1" v-if="comment.uid == $store.state.user.uid" text icon @click="deleteComment(comment.id)"> -->
            <!--<v-icon color="red" style="width:5%;" @click='delfavorite(i.favorite)'>delete</v-icon>-->
             <v-btn icon @click='delfavorite(i.favorite)'><v-icon color="red" style="width:5%;">delete</v-icon></v-btn>
          </div>
          <br>
        </v-flex>
      </v-layout>
    </v-container>
    <br>
  </v-card>


</v-flex>

<!-- The Modal -->
<div id="myModal" class="modal" @click='modalclose()'>
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close" @click='modalclose()'>&times;</span>
    <div style="height: 100px;">
      <h1>{{modalfavorite.name}}</h1>
      <p v-if="modalfavorite.end===undefined" style="float: left; padding-top: 15px;">채용시 마감</p>
      <p v-else style="float: left; padding-top: 15px;">{{modalfavorite.start}} ~ {{modalfavorite.end}}</p>
      <v-btn icon disable @click='delfavorite(modalfavorite)'>
        <v-icon small color="red" style="float: left;">delete</v-icon>
      </v-btn>
    </div>
    <hr>
    <div v-for="i in modalfavorite.detail">
      <v-img :src=i style="height:auto; width:auto; margin:0 auto" ></v-img>
    </div>
  </div>
</div>
</v-layout>

</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import moment from 'moment'
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]
const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 40,
}
const stylings = {
  default (interval) {
    return undefined
  },

}
export default {
  data: () => ({
    start: moment().format('YYYY.MM.dd'),
    today: moment().format('YYYY.MM.dd'),
    startMenu: false,
    endMenu: false,
    nowMenu: false,
    type: 'month',
    typeOptions: [{
        text: '4 Day',
        value: '4day'
      },
      {
        text: 'Week',
        value: 'week'
      },
      {
        text: 'Month',
        value: 'month'
      }
    ],
    intervals: intervalsDefault,
    styleInterval: 'default',
    color: '#6BBCDC',
    colors: ['#6BBCDC','#FFA7A7','#E68333','#25B8AE','#86E57F','#F15F5F','#FFB2D9','#E6AAE6','#BFA0ED','#FFDD73','#E8AD44','#934F00'],
    coloridx: 0,
    totalfavorite: [],
    modalfavorite: '',
  }),
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this)
    },

  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    this.start = year + '.' + month + '.' + day;
    this.today = year + '.' + month + '.' + day;

    this.getfavorite();
  },
  methods: {
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    viewToday() {
      this.start = this.today
    },
    showIntervalLabel(interval) {
      return interval.minute === 0
    },
    async getfavorite() {
      this.totalfavorite = await FirebaseService.getfavorite(this.$store.state.user);
    },
    async delfavorite(input) {
      FirebaseService.deletefavorite(input, this.$store.state.user);
      this.totalfavorite = await FirebaseService.getfavorite(this.$store.state.user);
    },
    openmodal(input) {
      document.getElementById('myModal').style.display = "block";
      this.modalfavorite = input;
    },
    modalclose() {
      document.getElementById('myModal').style.display = "none"
    },
    drawstart(input) {
      if (input.favorite.start === undefined) return '';
      var temp = JSON.stringify(input.favorite.start).replace(/[.]/g, '-').split(' ')[0];
      var output = temp.replace(/[@"]/gi, '');
      //console.log(JSON.stringify(input.favorite.start).replace(/[.]/g,'-'))
      return output;
    },
    drawend(input) {
      if (input.favorite.end === undefined) return '';
      var temp = JSON.stringify(input.favorite.end).replace(/[.]/g, '-').split(' ')[0];
      var output = temp.replace(/[@"]/gi, '');
      return output;
    },
    getcolor(input) {
      return this.colors[input % 10];
    }
  },
}
</script>

<style scoped>
.controls {
  position: relative;
}

.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  /* Could be more or less, depending on screen size */
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

.calendarmsg {
  width: 90%;
  height: 25px;
  font-size: 13px;
}
</style>
