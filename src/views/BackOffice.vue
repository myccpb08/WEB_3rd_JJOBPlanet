<template>
<div class="notranslate">
  <div style="margin-top:48px"></div>
  <div style="padding:50px; padding-left:30px;">
    <div>
      <div class="headline" style="margin-bottom:20px;">
        <font>BackOfficePage</font>
      </div>
      <v-card min-width="260" max-width="750" class="mx-auto" style="padding:30px; padding-top:5px; padding-bottom:5px; margin-left:0px">
        <v-layout wrap mw-700 xs6 column>
          <v-flex style="padding-bottom:0px; text-align:center" align-self-center>
            <h1>Total 게시글 수</h1>
            POST 게시글 총 수 : {{postNum}}<br>
            Portfolio 게시글 총 수 : {{portfolioNum}}<br>
            게시판 게시글 총 수 : {{boardNum}}
          </v-flex>
          <v-flex>
              <BarChart :isloaded="isloaded" :dataList = "chartList" :dataList2="chartList2" :dataList3='chartList3'></BarChart>
              <!-- <BarChart :isloaded="isloaded" :dataList = "chartList2"></BarChart> -->
          </v-flex>
        </v-layout>
      </v-card>
      <br>
      <v-card min-width="260" max-width="750" class="mx-auto" style="padding:30px; padding-top:5px; padding-bottom:5px; padding-right:5px; margin-left:0px">
        <v-layout wrap mw-700 xs6>
          <v-flex style="padding-bottom:0px;" v-for="i in userClasses.length">
            <UserClass :displayName="userClasses[i - 1].displayName" :email="userClasses[i - 1].email" :userClass="userClasses[i - 1].userClass" :uid="userClasses[i - 1].uid">
            </UserClass>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </div>
</div>
</template>


<script>
import UserClass from '@/components/UserClass'
import BarChart from '@/components/BarChart'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'BackOfficePage',
  props: {

  },
  data() {
    return {
      userClasses: [],
      userClass: {},
      postNum: 0,
      portfolioNum: 0,
      boardNum: 0,
      chartList:[],
      chartList2:[],
      chartList3:[],
      isloaded: false,
    }
  },
  components: {
    UserClass,
    BarChart
  },
  mounted() {
    this.temp()
  },
  methods: {
    async temp() {
      // await this.getUserClasses()
      // console.log(this.$store.state.user)
      var val = await this.checkUserClass(this.$store.state.user.uid);

      if (val) {
        console.log(this.$store.state.user)
        await this.getUserClasses()
        this.postNum = await this.getListNum('posts')
        this.portfolioNum = await this.getListNum('portfolios')
        this.boardNum = await this.getListNum('boards')
      } else {
        console.log(this.$store.state.user + "!!")
        alert("you are not admin. please login admin account");
        this.$router.replace('/')
      }
      console.log(this.chartList)

      // this.chartList[0].logs = await this.getDayListNum('portfolios')

      this.chartList = await this.getDayListNum('portfolios')
      this.chartList2 = await this.getDayListNum('posts')
      this.chartList3 = await this.getDayListNum('boards')
      this.isloaded = true
      // const ddList = await this.getDayListNum('portfolios')
      // console.log(typeof(ddList))
      // console.log(ddList)
    },
    async getListNum(board) {
      return await FirebaseService.getListNum(board)
    },
    async getDayListNum(board) {
      const ddlist = await FirebaseService.getDayListNum(board)
      console.log(ddlist)
      return ddlist
      // this.chartList = await FirebaseService.getDayListNum(board)
      // console.log(this.chartList)
      // console.log(typeof(this.chartList))
    },
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    async getUserClasses() {
      this.userClasses = await FirebaseService.getUserClasses()
    },
    async checkUserClass(uid) {
      if (uid == null) {
        return false;
      }
      this.userClass = await FirebaseService.getUserClass(uid).then((result) => {
        return result;
      })
      console.log(this.userClass)
      if ('admin' === this.userClass) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
