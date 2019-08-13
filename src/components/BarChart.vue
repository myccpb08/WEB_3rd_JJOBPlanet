<script>
import {
  Line
} from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    dataList: {
      type: Array
    },
    dataList2: {
      type: Array
    },
    dataList3: {
      type: Array
    },
    dataList4: {
      type: Array
    },
    isloaded: {
      type: Boolean
    },
  },
  data() {
    return {
      datacollection: {
        labels: ['7일전', '6일전', '5일전', '4일전', '3일전', '2일전', '1일전', '오늘'],
        datasets: [{
            label: 'Post',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: "#7F7F7F",
            pointBackgroundColor: '#7F7F7F',
            borderWidth: 2,
            pointBorderColor: '#7F7F7F',
            data: [2, 2, 2]
          },
          {
            label: 'Healing',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: "#6BBCDC",
            pointBackgroundColor: "#6BBCDC",
            borderWidth: 2,
            pointBorderColor: "#6BBCDC",
            data: [2, 2, 2]
          },
          {
            label: 'Notice',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: "orange",
            pointBackgroundColor: "orange",
            borderWidth: 2,
            pointBorderColor: "orange",
            data: [2, 2, 2]
          },
          {
            label: 'Mentor',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: "black",
            pointBackgroundColor: "black",
            borderWidth: 2,
            pointBorderColor: "black",
            data: [2, 2, 2]
          },
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {

  },
  watch: {
    isloaded: function() {
      this.datacollection.datasets[0].data = this.dataList
      this.datacollection.datasets[1].data = this.dataList2
      this.datacollection.datasets[2].data = this.dataList3
      this.datacollection.datasets[3].data = this.dataList4
      this.renderChart(this.datacollection, this.options)
    }
  }
}
</script>
