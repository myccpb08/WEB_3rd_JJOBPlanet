<template>
  <div>
    <div style="margin-top:120px"></div>

    <v-container>
      <v-layout>
        <v-flex xs12>
          <Calendar></Calendar>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex style="text-align:center;" v-for="i in totalfavorite.length > limits ? limits : totalfavorite.length" :class="'xs' + 12 / column" px-3>
      <v-btn color="ffffff" style="height:110px; width:100%; box-shadow: none;">
        <Post
        :date="totalfavorite[i - 1].created_at"
        :title="totalfavorite[i - 1].favorite.name"></Post>
      </v-btn>
    </v-flex>
    <div style="margin-top:120px"></div>
  </div>
</template>

<script>
import Calendar from '../components/Calendar'
import FirebaseService from '@/services/FirebaseService'
export default {
  name: 'PortfolioPage',
  data() {
    return {
      totalfavorite:[],
    }
  },
  components: {
    Calendar,
  },
  methods: {
    async getfavorite(){
      this.totalfavorite = await FirebaseService.getfavorite(this.$store.state.user)
    },
  },
  mounted() {
    this.getfavorite()
  },
}
</script>
