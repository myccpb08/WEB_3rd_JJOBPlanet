<template>
  <div>
    <div style="margin-top:48px"></div>
    <div style="padding:60px;">
      <v-container>
        <h1>취업자 게시판</h1>
        <!-- Mentor -->
        <v-layout>
          <v-flex xs12>
            <MentorList :limits="limits" :load-more="true" v-on:loadMore="limits = $event"></MentorList>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import MentorList from '../components/MentorList'

export default {
  name: 'MentorPage',
  components: {
    MentorList,
  },
  data(){
    return{
      limits : 6
    }
  }
}
</script>
