<template>
  <div>
    <div style="margin-top:48px"></div>
    <div style="padding:60px;">
      <v-container>
        <h1>자유게시판</h1>
        <p>채용공고나 스터디 등 자유롭게 이야기하세요</p>
        <!-- Board -->
        <v-layout>
          <v-flex xs12>
            <BoardList :limits="limits" :load-more="true" v-on:loadMore="limits = $event"></BoardList>
          </v-flex>
        </v-layout>

      </v-container>
    </div>
  </div>
</template>

<script>
import BoardList from '../components/BoardList'

export default {
  name: 'BoardPage',
  components: {
    BoardList,
  },
  data(){
    return{
      limits : 6
    }
  }
}
</script>
