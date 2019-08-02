import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/messaging'
import 'firebase/storage'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNER = 'banner'
const USERS = 'users'
const SNS = 'post-comments'
const BOARDS = 'boards'

// Setup Firebase
const config = {
  projectId: 'ssafy-245804',
  authDomain: 'ssafy-245804.firebaseapp.com',
  apiKey: 'AIzaSyAh53Ji2z1PjJFVo4EvJYe_bN9oms0iYMc',
  databaseURL: 'https://ssafy-245804.firebaseio.com',
  storageBucket: 'ssafy-245804.appspot.com',
  messagingSenderId: "452889627202",
  appId: "1:452889627202:web:b22e00319bd3559b"
}


firebase.initializeApp(config)
const firestore = firebase.firestore()
const messaging = firebase.messaging()
messaging.usePublicVapidKey('BH4H7pKz2nJHRkzwWzgUtSna-zCJzPM-KeR_MemZjinDVVuEzd6FulRn_P4zIxZFObFkE_mvIOnKHrrBING55ZE')


firebase.firestore().enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
  // onmessage handling
  messaging.onMessage((payload) => {
    alert('Message received ' + payload.notification.title)
  })

export default {
  test() {
    var storage = firebase.storage()
    var pathReference = storage.ref('result.json')
    return pathReference;
  },
  notificationcheck() {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        console.log('알림이 허용되었어')
      } else {
        console.log('알림 거부하지마 ㅠㅠ')
      }
    })
  }, // notificationcheck 끝

  gettingtoken(user) { // user : 현재로그인 한 사람
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        var test_token = currentToken
        console.log(test_token)
        // firestore.collection('tokens').doc(test_token).set({
        //   test_token : test_token
        // })
        firestore.collection('users').doc(user.uid).update({
          test_token: test_token
        })
      } else {
        console.log('No Instance ID token available. Request permission to generate one.'); // Show permission UI.
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    })
  },
  outtoken(user) {
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        var test_token = currentToken
        console.log(test_token)
        // firestore.collection('tokens').doc(test_token).delete()
        firestore.collection('users').doc(user.uid).update({
          test_token: ''
        })
      } else {
        console.log('No Instance ID token available. Request permission to generate one.'); // Show permission UI.
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    })
  },
  //post 댓글
  getComments(postId) {
    const commentCollection = firestore.collection(POSTS).doc(postId).collection(SNS)
    // console.log(commentCollection)
    return commentCollection
      .orderBy('created_at')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          // data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },

  postComment(postId, content, user) {
    return firestore.collection(POSTS).doc(postId).collection(SNS).add({
      contents: content,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      email: user.email,
      edit: false
    })
  },
  editComment(postId, update_content, commentId) {
    const comment = firestore.collection(POSTS).doc(postId).collection(SNS).doc(commentId)
    comment.update({
        contents: update_content,
        edit: false,
      })
      .then(function() {
        alert('해당 댓글이 수정되었습니다');
      }).catch(function(error) {
        console.error('댓글 수정에 실패했습니다', error);
      })
  },

  deleteComment(postId, commentId) {
    const comment = firestore.collection(POSTS).doc(postId).collection(SNS).doc(commentId)
    comment.delete().then(function() {
      alert('해당 댓글이 삭제되었습니다');
    }).catch(function(error) {
      console.error('댓글 삭제에 실패했습니다', error);
    })
  },
  //portfolio 댓글
  getPortfolioComments(portfolioId) {
    const commentCollection = firestore.collection(PORTFOLIOS).doc(portfolioId).collection(SNS)
    // console.log(commentCollection)
    return commentCollection
      .orderBy('created_at')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          // data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },
  postPortfolioComment(portfolioId, content, user) {
    return firestore.collection(PORTFOLIOS).doc(portfolioId).collection(SNS).add({
      contents: content,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      email: user.email,
      edit: false
    })
  },
  editPortfolioComment(portfolioId, update_content, commentId) {
    const comment = firestore.collection(PORTFOLIOS).doc(portfolioId).collection(SNS).doc(commentId)
    comment.update({
        contents: update_content,
        edit: false,
      })
      .then(function() {
        alert('해당 댓글이 수정되었습니다');
      }).catch(function(error) {
        console.error('댓글 수정에 실패했습니다', error);
      })
  },
  deletePortfolioComment(portfolioId, commentId) {
    const comment = firestore.collection(PORTFOLIOS).doc(portfolioId).collection(SNS).doc(commentId)
    comment.delete().then(function() {
      alert('해당 댓글이 삭제되었습니다');
    }).catch(function(error) {
      console.error('댓글 삭제에 실패했습니다', error);
    })
  },
  //게시글 댓글
  getBoardComments(boardId) {
    const commentCollection = firestore.collection(BOARDS).doc(boardId).collection(SNS)
    // console.log(commentCollection)
    return commentCollection
      .orderBy('created_at')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          // data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },
  postBoardComment(boardId, content, user) {
    return firestore.collection(BOARDS).doc(boardId).collection(SNS).add({
      contents: content,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      email: user.email,
      edit: false
    })
  },
  editBoardComment(boardId, update_content, commentId) {
    const comment = firestore.collection(BOARDS).doc(boardId).collection(SNS).doc(commentId)
    comment.update({
        contents: update_content,
        edit: false,
      })
      .then(function() {
        alert('해당 댓글이 수정되었습니다');
      }).catch(function(error) {
        console.error('댓글 수정에 실패했습니다', error);
      })
  },
  deleteBoardComment(boardId, commentId) {
    const comment = firestore.collection(BOARDS).doc(boardId).collection(SNS).doc(commentId)
    comment.delete().then(function() {
      alert('해당 댓글이 삭제되었습니다');
    }).catch(function(error) {
      console.error('댓글 삭제에 실패했습니다', error);
    })
  },
  //포스트
  getPosts() {
    const postsCollection = firestore.collection(POSTS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },
  getPost(postId) {
    return firestore.collection(POSTS).doc(postId)
      .get()
      .then((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
      })
  },
  deletePost(postId) {
    const post = firestore.collection(POSTS).doc(postId)
    post.delete().then(function() {
      console.log("해당 Post가 삭제되었습니다.");
    }).catch(function(error) {
      console.error("삭제에 실패했습니다 ", error);
    })
  },
  updatePost(postId, title, body, uid) {
    return firestore.collection(POSTS).doc(postId).update({
        title: title,
        body: body,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("게시글이 수정되었습니다.");
      })
      .catch(function(error) {
        console.error("수정 실패: ", error);
      });
  },
  postPost(title, body, user) {
    return firestore.collection(POSTS).add({
      title,
      body,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  //포트폴리오
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },
  getPortfolio(portfolioId) {
    return firestore.collection(PORTFOLIOS).doc(portfolioId)
      .get()
      .then((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
      })
  },
  deletePortfolio(portfolioId) {
    const portfolio = firestore.collection(PORTFOLIOS).doc(portfolioId)
    portfolio.delete().then(function() {
      console.log("해당 portfolio가 삭제되었습니다.");
    }).catch(function(error) {
      console.error("삭제에 실패했습니다 ", error);
    })
  },
  updatePortfolio(portfolioId, title, body, img, uid) {
    return firestore.collection(PORTFOLIOS).doc(portfolioId).update({
        title: title,
        body: body,
        img: img,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("게시글이 수정되었습니다.");
      })
      .catch(function(error) {
        console.error("수정 실패: ", error);
      });
  },
  postPortfolio(title, body, img, user) {
    console.log("service 안 " + img)
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  //게시판
  getBoards() {
    const postsCollection = firestore.collection(BOARDS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },
  getBoard(boardId) {
    return firestore.collection(BOARDS).doc(boardId)
      .get()
      .then((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
      })
  },
  deleteBoard(boardId) {
    const board = firestore.collection(BOARDS).doc(boardId)
    board.delete().then(function() {
      console.log("해당 board가 삭제되었습니다.");
    }).catch(function(error) {
      console.error("삭제에 실패했습니다 ", error);
    })
  },
  updateBoard(boardId, title, body, img, uid) {
    return firestore.collection(BOARDS).doc(boardId).update({
        title: title,
        body: body,
        img: img,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("게시글이 수정되었습니다.");
      })
      .catch(function(error) {
        console.error("수정 실패: ", error);
      });
  },
  postBoard(title, body, img, user) {
    return firestore.collection(BOARDS).add({
      title,
      body,
      img,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  //게시글수
  getListNum(board) {
    const num = firestore.collection(board).get().then(querySnapshot => {
      return querySnapshot.size
    })
    return num;
  },
  async getDayListNum(board) {
    const list = [0, 0, 0, 0, 0, 0, 0, 0]
    console.log(list)
    const currentDay = new Date()
    currentDay.setHours(0)
    currentDay.setMinutes(0)
    currentDay.setSeconds(0)
    currentDay.setDate(currentDay.getDate() - 7 - 1)
    console.log(currentDay)
    return await firestore.collection(board)
      .where("created_at", ">=", currentDay)
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        docSnapshots.docs.map((doc) => {
          // let data = doc.data()
          let data_date = new Date(doc.data().created_at.toDate())
          let startDay = new Date(currentDay)
          let endDay = new Date(currentDay)
          // console.log("c " + currentDay + "s " + startDay + "e " + endDay + "d " + data_date)
          for (let i = 0; i < 8; i++) {
            startDay.setDate(startDay.getDate() + 1)
            endDay.setDate(startDay.getDate() + 1)
            if (data_date >= startDay && data_date < endDay) {
              list[i]++
              break;
            }
          }

        })
        // console.log(typeof(list))
        return list
      })
  },
  //로그인
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken
      let user = result.user
      return result
    }).catch(function(error) {
      console.error('[Google Login Error]', error)
    })
  },
  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken
      let user = result.user
      return result
    }).catch(function(error) {
      console.error('[Facebook Login Error]', error)
    })
  },

  getBanner() {
    const postsCollection = firestore.collection(BANNER)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postBanner(img) {
    return firestore.collection(BANNER).doc("imgid").update({
        img,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("update banner");
      })
  },
  addLog(uid, msg) {
    return firestore.collection(USERS).doc(uid).collection("history").add({
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        msg: msg
      })
      .then(function() {

      })
  },
  //유저등급
  initUserClass(user, userClass) {
    const usersCollection = firestore.collection(USERS).doc(user.uid).get().then((docSnapshots) => {
      if (docSnapshots._document == null) {
        firestore.collection(USERS).doc(user.uid).set({
          changed_at: firebase.firestore.FieldValue.serverTimestamp(),
          displayName: user.displayName,
          email: user.email,
          userClass: "visitor",
          uid: user.uid
        })
      }
    })
  },
  getUserClasses() {
    const usersCollection = firestore.collection(USERS)
    return usersCollection
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          return data
        })
      })
  },
  getUserClass(uid) {
    return firestore.collection(USERS).doc(uid)
      .get()
      .then((doc) => {
        let data = doc.data().userClass
        return data
      })
  },
  updateUserClass(uid, userClass) {
    return firestore.collection(USERS).doc(uid).update({
        userClass,
      })
      .then(function() {
        alert("Changed!");
      })
  }

}
