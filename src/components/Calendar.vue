<template>
<v-layout wrap>

  <v-flex xs12 sm12 lg3 class="mb-4 controls" style="text-align:center">

    <br><br><br>
    <v-select v-model="type" :items="typeOptions" label="Type"></v-select>


    <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="start" transition="scale-transition" min-width="290px" offset-y full-width>
      <template v-slot:activator="{ on }">
        <v-text-field v-model="start" label="Start Date" prepend-icon="event" readonly v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="start" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text dark :color="color" @click="startMenu = false">Cancel</v-btn>
        <v-btn text dark :color="color" @click="$refs.startMenu.save(start)">OK</v-btn>
      </v-date-picker>
    </v-menu>



    <v-menu ref="nowMenu" v-model="nowMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="now" transition="scale-transition" min-width="290px" offset-y full-width>
      <template v-slot:activator="{ on }">
        <v-text-field v-model="now" label="Today" prepend-icon="event" readonly v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="now" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text dark :color="color" @click="nowMenu = false">Cancel</v-btn>
        <v-btn text dark :color="color" @click="$refs.nowMenu.save(now)">OK</v-btn>
      </v-date-picker>
    </v-menu>

  </v-flex>

  <v-flex xs12 sm12 lg9 class="pl-4">
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

      <v-calendar ref="calendar" v-model="start" :type="type" :start="start" :now="now" :first-interval="intervals.first" :interval-minutes="intervals.minutes" :interval-count="intervals.count" :interval-height="intervals.height"
        :show-interval-label="showIntervalLabel" :short-intervals="true" :short-months="true" :short-weekdays="true" :color="color">

        <template v-slot:day="day">
        <div v-for="i in totalfavorite">
         <v-sheet v-if="day.date===drawstart(i)" :color="color" class="calendarmsg white--text pa-1">
           {{ i.favorite.name }}
         </v-sheet>
         <v-sheet v-else-if="day.date===drawend(i)" :color="color" class="calendarmsg white--text pa-1">
           {{ i.favorite.name}}
         </v-sheet>
        </div>
       </template>

      </v-calendar>
      <div style="width:100%; height:70px; padding:15px; text-align:center">
        <v-btn small dark color="#7f7b76" @click="viewToday()">today</v-btn>
      </div>
    </v-sheet>
<br>
<hr>
<br>
      <v-card class="mx-auto" max-width="830">

        <v-toolbar color="#6BBCDC" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>내가 추가한 기업</v-toolbar-title>

          <v-spacer></v-spacer>

        </v-toolbar>
<br>
        <v-container fluid grid-list-md pa-2>
          <v-layout wrap>
            <v-flex style="text-align:center;" v-for="i in totalfavorite">
              <!-- <div v-if="drawcalender(i)"></div> -->
              <v-btn color="white" style="height:110px; width:500px; box-shadow: 4px 4px 4px 4px gray;" @click='openmodal(i.favorite)'>
                <v-img aspect-ratio=1 :src='i.favorite.logo' contain style="max-width:100px; height:80px;"></v-img>
                <div>
                  {{i.favorite.name}}<br>
                  <p style="font-size:17px; color:gray; padding-left:20px;" v-if="i.favorite.end===undefined">채용시 마감</p>
                  <p style="font-size:17px; color:gray; padding-left:20px;" v-else>{{i.favorite.start}} ~ {{i.favorite.end}}
                  <!-- <v-btn class="ma-1" v-if="comment.uid == $store.state.user.uid" text icon @click="deleteComment(comment.id)"> -->
                    <v-icon small color="red" style="padding-bottom:20px; padding-left:20px;">delete</v-icon>
                  <!-- </v-btn> -->
                  </p>

                </div>
              </v-btn>
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
        <div>
          <p v-if="endtime===undefined">채용시 마감</p>
          <p v-else>{{starttime}} ~ {{endtime}}</p>
          <v-btn icon disable @click='favorite()'>
              <v-icon color="orange">star</v-icon>
            </v-btn>
        </div>
        <div v-for="i in detail" >
          <v-img :src=i style="height:auto; width:auto; margin:0 auto"></v-img>
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
    now: moment().format('YYYY.MM.dd'),
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
    totalfavorite: [],
    detail: '',
    starttime: '',
    endtime: '',
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
    this.now = year + '.' + month + '.' + day;

  },
  methods: {
    viewToday() {
      this.start = this.now
    },
    showIntervalLabel(interval) {
      return interval.minute === 0
    },
    async getfavorite() {
      this.totalfavorite = await FirebaseService.getfavorite(this.$store.state.user);
    },
    openmodal(input) {
      document.getElementById('myModal').style.display = "block";
      this.detail = input.detail;
      this.starttime = input.start;
      this.endtime = input.end;
      this.tempfavorite = input;
    },
    modalclose() {
      document.getElementById('myModal').style.display = "none"
    },
    checktime(now,time){
      console.log(time+" "+now+"?")
      if(time.includes(now))return true;
      else return false;
    },
    drawstart(input){
      var temp=JSON.stringify(input.favorite.start).replace(/[.]/g,'-').split(' ')[0];
      var output=temp.replace(/[@"]/gi,'');
      return output;
    },
    drawend(input){
      var temp=JSON.stringify(input.favorite.end).replace(/[.]/g,'-').split(' ')[0];
      var output=temp.replace(/[@"]/gi,'');
      return output;
    }
  },
  mounted() {
    this.getfavorite()
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
.calendarmsg{
  width: 90px;
  height: 28px;
  overflow: hidden;
}
</style>
