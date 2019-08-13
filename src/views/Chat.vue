<template>
<div>
  <div style="margin-top:120px"></div>

  <v-container>
    <v-layout>
      <v-flex style="display: flex; align-items: center; justify-content: center;">
        <div style="width:400px;">
          <template v-if="uid">
            <div id="_top">
              <!-- 회원리스트 -->
              <div class="text-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn color="white" v-on="on" style="cursor: pointer; margin-top:10px">
                      User List
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile v-for="(item, index) in users" :key="index" @click="">

                      <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>{{ item.email }}<br>마지막 접속: {{item.datetime}} <br>
                        <hr>
                      </v-list-tile-content>
                      </v-list-item-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </div>

            <div id="_chat">
              <div v-for="(v,k) in chat" class="_chat" :class="{_right: (v.email == email)}">
                <div class="_msg" v-if="v.msg">
                  <pre>{{v.msg}}</pre>
                </div>
                <!-- <div class="_file" v-if="v.file">
                  <div v-for="f in v.file">
                    <img
                      :src="f.url"
                      :alt="f.name"
                      onload="setScrollToBottom('_chat')"
                      v-if="f.type.indexOf('image')>-1"
                    />
                    <a :href="f.url" download>{{f.name}}</a>
                  </div>
                  </div>-->
                <div class="_meta">
                  {{v.datetime}}
                  <br />
                  {{v.email}}
                </div>
              </div>
            </div>

            <!-- 채팅입력부 -->
            <div id="_bottom">
              <v-form>
                <v-container grid-list-xl>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="msg" outlined label="Message" type="text" @keypress.enter.prevent="_chat" @keypress.ctrl.enter.prevent="_new_line">
                        <template v-slot:append>
                          <v-fade-transition leave-absolute>
                            <i class="fa fa-paper-plane" @click="_chat" aria-hidden="true" style="color:blue"></i> <!-- 전송버튼 -->
                          </v-fade-transition>
                        </template>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </div>



          </template>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

  <div style="margin-top:120px"></div>
</div>
</template>

<script>
import $ from "jquery";
import FirebaseService from "@/services/FirebaseService";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
var async = require("async");

const database = firebase.database();

function setScrollToBottom(id) {
  var target = document.getElementById(id);
  target.scrollTop = target.scrollHeight - target.offsetHeight;
}

var users_ref = database.ref("users");
var chat_ref = database.ref("chat");
// var file_ref = firebase.storage().ref("chat");

export default {
  data() {
    return {
      loading: false,
      uid: "",
      email: "",
      pw: "",
      chat: {},
      users: {},
      msg: "",
      user_list_show: false
    };
  },

  created() {
    var z = this;
    firebase.auth().onAuthStateChanged(user => {
      // 현재 로그인한 사용자 불러오기
      if (user) {
        this.uid = user.uid;
        this.email = user.email; // 현재 로그인한 사람 이메일 등록

        // Retrieve new posts as they are added to our database : 새로 올라온 콘텐츠 추가
        chat_ref.on("child_added", d => {
          // 새로 추가된 행위
          this.$set(this.chat, d.key, d.val()); // this.chat 에  d.key 의 값으로 d.val 을 넣어라. 즉, chat = { {d.key:d.val()}} 상태
          this.$nextTick(() => {
            setScrollToBottom("_chat");
          });
        });

        users_ref.on("child_added", d => {
          this.$set(z.users, d.key, d.val()); // 로그인 한 사람 등록 시키기
        });

        users_ref.on("child_changed", d => {
          this.$set(z.users, d.key, d.val());
        });

        users_ref.child(z.uid).once("value", d => {
          var newdate = new Date();
          var month = newdate.getMonth() + 1;
          var day = newdate.getDay();
          var hour = newdate.getHours();
          var min = newdate.getMinutes();
          var timestamp = month + "/" + day + " " + hour + ":" + min;
          if (d.val()) {
            users_ref.child(z.uid).update({
              datetime: timestamp
            });
          } else {
            users_ref.child(z.uid).set({
              email: z.email,
              datetime: timestamp
            });
          }
        });
      } else {
        z.uid = "";
      }
    });
  },
  methods: {
    // _login() {
    //   if (!this.email || !this.pw) return;
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(this.email, this.pw)
    //     .catch(err => {
    //       alert(err);
    //     });
    // },
    // _join() {
    //   if (!this.email || !this.pw) return;
    //   firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(this.email, this.pw)
    //     .catch(err => {
    //       alert(err);
    //     });
    // },
    // _google_login() {
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .catch(err => {
    //       alert(err);
    //     });
    // },
    // _logout() {
    //   firebase.auth().signOut();
    // },
    _chat() {
      var newdate = new Date();
      var month = newdate.getMonth() + 1;
      var day = newdate.getDay();
      var hour = newdate.getHours();
      var min = newdate.getMinutes();
      var timestamp = month + "/" + day + " " + hour + ":" + min;

      if (!this.msg || event.ctrlKey) return;
      chat_ref.push().set({
        msg: this.msg,
        datetime: timestamp,
        uid: this.uid,
        email: this.email
      });
      this.msg = "";
    },
    _new_line() {
      this.msg += "\n";
    }
  }
};
</script>

<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  margin: 500;
  padding: 0;
  background-color: gainsboro;
}

/* #_root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */

._btn {
  display: inline-block;
  width: 150px;
  height: 40px;
  font-size: 17px;
  line-height: 40px;
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  text-align: center;
  cursor: pointer;
  cursor: hand;
}

._btn._right {
  float: right;
}

._btn._wide {
  width: 310px !important;
}

._btn_2 {
  display: inline-block;
  width: auto;
  height: 20px;
  font-size: 17px;
  line-height: 20px;
  margin-top: 10px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  cursor: hand;
}

._btn_2._right {
  float: right;
}

._btn_write {
  display: inline-block;
  float: right;
  width: 100px;
  height: 100px;
  font-size: 17px;
  line-height: 100px;
  background-color: white;
  color: #000;
  text-align: center;
  cursor: pointer;
  /* cursor: hand; */
}

/* #_login_form {
  position: absolute;
  width: 310px;
  height: 200px;
  top: calc(50% - 100px);
  left: calc(50% - 155px);
}

#_login_form input {
  width: 310px;
  height: 40px;
  border: 1px solid #000;
  font-size: 20px;
  padding: 5px;
  margin-top: 10px;
} */

#_top {
  height: 60px;
  background-color: dimgrey;
  padding: 0px 15px;
}

#_chat {
  height: calc(100% - 200px);
  overflow-y: auto;
}

/* #_file {
  height: 40px;
  background-color: dimgrey;
  padding: 0px 15px;
} */

#_bottom {
  width: 100%;
  height: 100px;
  /* background-color: #fff; */
}

#_bottom textarea {
  width: calc(100% - 100px);
  height: 100px;
  border: 0;
  vertical-align: middle;
  padding: 5px;
  font-size: 15px;
}

#_user_list {
  position: absolute;
  top: 60px;
  left: -1000px;
  width: 500px;
  max-width: 100%;
  height: calc(100% - 200px);
  background-color: #fff;
  z-index: 100;
  transition: all 0.5s ease-out;
  padding: 20px;
}

#_user_list._show {
  left: 0;
}

#_user_list>div {
  margin-top: 10px;
  font-size: 12px;
}

#_chat ._chat {
  clear: both;
}

/* display:block; */

/* 왼쪽 텍스트 상자 */
#_chat ._chat>div {
  display: inline-block;
}

#_chat ._chat._right>div {
  float: right;
}

/* 왼쪽 대화상자 */
#_chat ._chat ._msg,
#_chat ._chat ._file {
  float: left;
  font-weight: bold;
  max-width: 80%;
  padding: 5px 10px;
  margin: 10px;
  color: #fff;
  background-color: #00c6da;
  border-radius: 10px;
}

#_chat ._chat ._file img {
  display: block;
  max-width: 200px;
  margin-top: 10px;
}

/* 오른쪽 대화상자 */
#_chat ._chat._right ._msg,
#_chat ._chat._right ._file {
  color: antiquewhite;
  font-weight: bold;
  float: right;
  background-color: #ee591f;
}

#_chat ._chat ._msg pre {
  word-break: break-all;
  white-space: pre-wrap;
}

#_chat ._chat ._meta {
  margin-top: 15px;
  font-size: 9px;
  color: #777;
}

#_chat ._chat._right ._meta {
  text-align: right;
}

#_file input {
  display: none;
}
</style>
