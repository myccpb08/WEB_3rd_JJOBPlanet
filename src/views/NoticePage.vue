<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>
      <h1>공지사항</h1>
      <!-- Notice -->
      <v-layout>
        <v-flex xs12>
          <NoticeList :limits="limits" :load-more="true" v-on:loadMore="limits = $event"></NoticeList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NoticeList from '../components/NoticeList'

export default {
	name: 'NoticePage',
	components: {
		NoticeList,
	},
  data(){
    return{
      limits : 6
    }
  }
}
</script>
