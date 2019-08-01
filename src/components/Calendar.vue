<template>
  <v-layout wrap>

    <v-flex xs12 sm12 lg3 class="mb-4 controls" style="text-align:center">

      <br><br><br>
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
      ></v-select>


      <v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="start"
            label="Start Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn text dark :color="color" @click="startMenu = false">Cancel</v-btn>
          <v-btn text dark :color="color" @click="$refs.startMenu.save(start)">OK</v-btn>
        </v-date-picker>
      </v-menu>



      <v-menu
        ref="nowMenu"
        v-model="nowMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="now"
        transition="scale-transition"
        min-width="290px"
        offset-y
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="now"
            label="Today"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="now"
          no-title
          scrollable
        >
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

        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"

          :now="now"

          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"

          :show-interval-label="showIntervalLabel"
          :short-intervals="true"
          :short-months="true"
          :short-weekdays="true"
          :color="color"
        >

          <template v-slot:day="day">
            <v-sheet v-if="day.day % 6 === 0" :color="color" class="white--text pa-1">
              day slot<br> {{ day.date }}
            </v-sheet>
          </template>

        </v-calendar>
        <div style="width:100%; height:70px; padding:15px; text-align:center">
          <v-btn small dark color="#7f7b76" @click="viewToday()">today</v-btn>
        </div>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
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
      start: '1993-05-31',
      now: '1993-05-31',
      startMenu: false,
      endMenu: false,
      nowMenu: false,
      type: 'month',
      typeOptions: [
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' }
      ],

      intervals: intervalsDefault,
      styleInterval: 'default',
      color: '#6BBCDC',
    }),
    computed: {
      intervalStyle () {
        return stylings[this.styleInterval].bind(this)
      },

    },
    mounted(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day =  date.getDate();

      if(month<10) month = '0'+ month;
      if(day<10) day = '0'+ day;

      this.start = year + '-' + month + '-' + day;
      this.now = year + '-' + month + '-' + day;
    },
    methods: {
      viewToday () {
        this.start = this.now
      },
      showIntervalLabel (interval) {
        return interval.minute === 0
      },
    },
  }
</script>

<style scoped>
.controls {
  position: relative;
}
</style>
