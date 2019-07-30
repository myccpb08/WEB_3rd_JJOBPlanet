<template>
  <div>
    <div style="margin-top:48px"></div>

    <v-container>

      <!-- Board -->
      <v-layout>
        <v-flex xs12>
          <BoardList :limits="limits" :load-more="true" v-on:loadMore="limits = $event"></BoardList>
        </v-flex>
      </v-layout>

    </v-container>
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
