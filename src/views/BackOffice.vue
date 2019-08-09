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
            <h1>Bulletin Board Analysis</h1>
            POST 게시판에 총 <b>{{postNum}}</b>개의 글이 게시되었습니다.<br>
            BOARD 게시판에 총 <b>{{boardNum}}</b>개의 글이 게시되었습니다.
          </v-flex>
          <div style="width:100%; height:5px;"></div>
          <v-flex style="padding-bottom:0px; text-align:center" align-self-center>
            <label style='font-size:medium'>7일간 새로 게시된 게시글</label>
            <BarChart :isloaded="isloaded" :dataList="chartList" :dataList2="chartList2" ></BarChart>
          </v-flex>
          <div style="width:100%; height:5px;"></div>
        </v-layout>
        <br>
      </v-card>
      <br>
      <v-card min-width="260" max-width="750" class="mx-auto" style="padding:30px; padding-top:5px; padding-bottom:5px; padding-right:5px; margin-left:0px">
        <!-- 검색 -->
        <v-layout row wrap mw-700 align-center justify-center>
          <v-flex xs6 sm6>
          <v-text-field @keyup.enter='searchBtn()' v-model="searchName" placeholder="Search name or email.."></v-text-field>
          </v-flex>
          <!-- <v-btn falt color='gray' @click='searchBtn()'>검색</v-btn> -->
          <button style="padding-top:15px;padding-left:15px;width:30px; height:40px;" color='white' @click='searchBtn()'><v-icon color="lightgray">fa-search</v-icon></button>

        </v-layout>
        <div class="list" style="height:600px; overflow:auto">
        <v-layout wrap mw-700 xs6 justify-start>
          <v-flex style="padding-bottom:0px;" v-for="i in userClasses.length">
            <UserClass :displayName="userClasses[i - 1].displayName" :email="userClasses[i - 1].email" :userClass="userClasses[i - 1].userClass" :uid="userClasses[i - 1].uid">
            </UserClass>
          </v-flex>
        </v-layout>
      </div>
      </v-card>
    </div>
  </div>
  <div style="margin-top:25px;"></div>
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
      searchName: '',
      totalUserClasses: [],
      userClasses: [],
      userClass: {},
      postNum: 0,
      boardNum: 0,
      chartList: [],
      chartList2: [],
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
      await this.getUserClasses()
      this.postNum = await this.getListNum('posts')
      this.boardNum = await this.getListNum('boards')

      this.chartList = await this.getDayListNum('posts')
      this.chartList2 = await this.getDayListNum('boards')

      this.isloaded = true
    },
    searchBtn() {
      if (this.searchName === this.currentName) {
        return;
      }
      if (this.searchName === "") {
        this.userClasses = this.totalUserClasses
      } else {
        this.getUsersByItem()
      }
      this.currentName = this.searchName
    },
    getUsersByItem() {
      this.userClasses = []
      for (let i = 1; i < this.totalUserClasses.length; i++) {
        if ((this.totalUserClasses[i - 1].displayName !== null && this.totalUserClasses[i - 1].displayName.includes(this.searchName)) ||
          (this.totalUserClasses[i - 1].email !== null && this.totalUserClasses[i - 1].email.includes(this.searchName))) {
          this.userClasses.push(this.totalUserClasses[i - 1])
        }
      }
    },
    async getListNum(board) {
      return await FirebaseService.getListNum(board)
    },
    async getDayListNum(board) {
      return await FirebaseService.getDayListNum(board)
    },
    getImgUrl(img) {
      return require('../assets/team6/logo/' + img)
    },
    async getUserClasses() {
      this.totalUserClasses = await FirebaseService.getUserClasses()
      this.userClasses = this.totalUserClasses
    }
  }
}
</script>
<style>
.list::-webkit-scrollbar {
  display:none;
}
</style>
