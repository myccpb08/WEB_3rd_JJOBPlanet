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
            <h1>Bulletin Board Analysis</h1><br />
            <table>
              <thead>
                <tr>
                  <th class="text-left">게시판</th>
                  <th class="text-left">num</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class='text-left tTitle'>Post</td>
                  <td class='text-left num'>{{postNum}}</td>
                </tr>
                <tr>
                  <td class='text-left tTitle'>HEALING</td>
                  <td class='text-left num'>{{boardNum}}</td>
                </tr>
                <tr>
                  <td class='text-left tTitle'>NOTICE</td>
                  <td class='text-left num'>{{noticeNum}}</td>
                </tr>
                <tr>
                  <td class='text-left tTitle'>MENTOR</td>
                  <td class='text-left num'>{{mentorNum}}</td>
                </tr>
              </tbody>
            </table>
          </v-flex>
          <div style="width:100%; height:5px;"></div>
          <v-flex style="padding-bottom:0px; padding-top:15px; text-align:center" align-self-center>
            <h2 style='font-size:medium'>7일간 새로 게시된 게시글</h2>
            <BarChart :isloaded="isloaded" :dataList="chartList" :dataList2="chartList2" :dataList3="chartList3" :dataList4="chartList4"></BarChart>
          </v-flex>
          <div style="width:100%; height:5px;"></div>
        </v-layout>
        <br>
      </v-card>
      <br>
      <v-card min-width="260" max-width="750" class="mx-auto" style="padding:30px; padding-top:5px; padding-bottom:5px; padding-right:5px; margin-left:0px">
        <!-- 검색 -->
        <v-flex style="padding-top:5px;padding-bottom:0px; text-align:center" align-self-center>
          <h1>Member</h1>
          <v-layout row wrap mw-700 align-center justify-center>

            <v-flex xs6 sm6 row>
              <v-text-field @keyup.enter='searchBtn()' v-model="searchName" placeholder="Search name or email.."></v-text-field>
            </v-flex>

            <button style="padding-left:15px;width:30px; height:40px;" color='white' @click='searchBtn()'>
              <v-icon color="lightgray">fa-search</v-icon>
            </button>

          </v-layout>
        </v-flex>

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
      noticeNum: 0,
      mentorNum: 0,
      chartList: [],
      chartList2: [],
      chartList3: [],
      chartList4: [],
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
      this.noticeNum = await this.getListNum('notices')
      this.mentorNum = await this.getListNum('mentors')

      this.chartList = await this.getDayListNum('posts')
      this.chartList2 = await this.getDayListNum('boards')
      this.chartList3 = await this.getDayListNum('notices')
      this.chartList4 = await this.getDayListNum('mentors')

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
  display: none;
}

table {
  border: 2px solid #7F7F7F;
  border-radius: 2px;
  background-color: #fff;
  width: 100%;
}

th {
  background-color: #6BBCDC;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  padding: 10px 20px;
}

.tTitle {
  width: 40%;
}

.num {
  width: 60%;
}
</style>
