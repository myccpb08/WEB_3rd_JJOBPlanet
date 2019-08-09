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

    <div style="margin-top:120px"></div>
  </div>
</template>

<script>
import Calendar from '../components/Calendar'
export default {
  name: 'PortfolioPage',
  components: {
    Calendar,
  },
}
</script>
