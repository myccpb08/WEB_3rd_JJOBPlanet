<template>
  <v-card>
    <v-card-title primary-title>
        <div class="headline" v-line-clamp:20="1"><font>{{title}}</font></div><br>
    </v-card-title>
    <v-img aspect-ratio=3 :src="imgSrc" contain ></v-img>
    <v-card-title>
      <span class="grey--text" v-line-clamp:20="4">{{displayName}}</span>
      <span class="grey--text" v-line-clamp:20="4" v-if='displayName===null'>{{email}}</span>
      <v-spacer></v-spacer>
      <span class="grey--text" v-line-clamp:20="4">{{date.substring(4,15)}}</span><br>
    </v-card-title>
    <v-card-text>{{body}}</v-card-text>
  </v-card>
</template>

<script>
import Vue       from 'vue'
import lineClamp from 'vue-line-clamp'

Vue.use(lineClamp, {
  // plugin options
})
export default {
	name: 'Board',
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
