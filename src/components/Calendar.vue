<template>
  <!-- <v-layout wrap> -->
  <v-layout justify-space-around>
    <v-flex sm12 lg3 class="mb-4 controls">
      <v-btn fab small color="#ffffff" @click="$refs.calendar.prev()">
        <v-icon dark>keyboard_arrow_left</v-icon>
      </v-btn>

      <v-btn class="mr-4" @click="setToday">
            Today
      </v-btn>

      <v-btn fab small color="#ffffff" @click="$refs.calendar.next()">
        <v-icon dark>keyboard_arrow_right</v-icon>
      </v-btn>
      <br><br><br>

      <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
      <v-menu ref="startMenu" v-model="startMenu" :close-on-content-click="false" :nudge-right="40"
        :return-value.sync="start" transition="scale-transition" min-width="290px" offset-y full-width>
        <template v-slot:activator="{ on }">
          <v-text-field v-model="start" label="Start Date" prepend-icon="event" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="start" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="#6bbcdc" @click="startMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="#6bbcdc" @click="$refs.startMenu.save(start)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>


      <v-menu v-if="hasEnd" ref="endMenu" v-model="endMenu" :close-on-content-click="false"
        :nudge-right="40" :return-value.sync="end" transition="scale-transition" min-width="290px"
        offset-y full-width>
        <template v-slot:activator="{ on }">
          <v-text-field v-model="end" label="End Date" prepend-icon="event" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="end" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="#6bbcdc" @click="endMenu = false">
            Cancel
          </v-btn>
          <v-btn text color="#6bbcdc" @click="$refs.endMenu.save(end)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>

    <!-- calendar -->
    <v-flex sm12 lg9 class="pl-4">
      <v-sheet height="500">
        <v-calendar ref="calendar"
          v-model="start"
          :type="type"
          :start="start"
          :end="end"
          :min-weeks="minWeeks"
          :max-days="maxDays"
          :now="now"
          :weekdays="weekdays"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :interval-style="intervalStyle"
          :show-interval-label="showIntervalLabel"
          :short-intervals="shortIntervals"
          :short-months="shortMonths"
          :short-weekdays="shortWeekdays"
          :color="color"
        >

          <template v-slot:day="day">
            <v-sheet v-if="day.day % 9 === 0" :color="color" class="white--text pa-1">
              day slot <br> {{ day.date }}
            </v-sheet>
          </template>
        </v-calendar>
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
    workday (interval) {
      const inactive = interval.weekday === 0 ||
        interval.weekday === 6 ||
        interval.hour < 9 ||
        interval.hour >= 17
      const startOfHour = interval.minute === 0
      return {
        borderTop: startOfHour ? undefined : '1px dashed ' + mid,
      }
    },
    past (interval) {
      return {
      }
    },
  }
  export default {
    data: () => ({
      today: '2019-07-31',
      focus: '2019-07-31',
      startMenu: false,
      start: null,
      endMenu: false,
      end: null,
      nowMenu: false,
      minWeeks: 1,
      now: null,
      type: 'month',
      typeOptions: [
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
      ],
      weekdays: weekdaysDefault,

      intervals: intervalsDefault,
      intervalsOptions: [
        { text: 'Default', value: intervalsDefault },
        { text: 'Workday', value: { first: 16, minutes: 30, count: 20, height: 40 } },
      ],
      maxDays: 7,
      styleInterval: 'default',
      styleIntervalOptions: [
        { text: 'Default', value: 'default' },
        { text: 'Workday', value: 'workday' },
        { text: 'Past', value: 'past' },
      ],
      color: '#6bbcdc',
      shortIntervals: true,
      shortMonths: true,
      shortWeekdays: true,
    }),
    computed: {
      intervalStyle () {
        return stylings[this.styleInterval].bind(this)
      },
      hasIntervals () {
        return this.type in {
          week: 1, day: 1, '4day': 1, 'custom-daily': 1,
        }
      },
      hasEnd () {
        return this.type in {
          'custom-weekly': 1, 'custom-daily': 1,
        }
      },
    },
    methods: {
      viewDay ({ date }) {
        this.start = date
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
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
