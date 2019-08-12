<template>
  <v-card style="padding-bottom:10px; height:70px;">

    <v-card-title primary-title style="float:left; width:60%; overflow: hidden;">
        <div class="mentorTitle" v-line-clamp:20="1"><font>{{title}}</font></div><br>
    </v-card-title>
    <v-card-text style="float:left;  width:40%; text-align:right;">
      <span class="grey--text" v-line-clamp:20="4">{{displayName}}</span>
      <span class="grey--text" v-line-clamp:20="4" v-if='displayName===null'>{{email}}</span>
      <span class="grey--text" v-line-clamp:20="4">{{date.substring(4,15)}}</span>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue       from 'vue'
import lineClamp from 'vue-line-clamp'

Vue.use(lineClamp, {
  // plugin options
})
export default {
	name: 'Mentor',
	props: {
		date: {type: String},
		title: {type: String},
		body: {type: String},
		imgSrc: {type: String},
    email:{type:String},
    displayName:{type:String}
	},
	data() {
		return {
			//
		}
	}
}
</script>
