import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNER = 'banner'
const USER = 'users'


// Setup Firebase
const config = {
   projectId: 'ssafy-245804',
   authDomain: 'ssafy-245804.firebaseapp.com',
   apiKey: 'AIzaSyAh53Ji2z1PjJFVo4EvJYe_bN9oms0iYMc',
   databaseURL: 'https://ssafy-245804.firebaseio.com',
   storageBucket: 'ssafy-245804.appspot.com'
}

firebase.initializeApp(config)
const firestore = firebase.firestore()

export default {
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
  deletePost(postId){
   const post = firestore.collection(POSTS).doc(postId)
   post.delete().then(function(){
    console.log("해당 Post가 삭제되었습니다.");
  }).catch(function(error) {
    console.error("삭제에 실패했습니다 ", error);
  })
  },
  updatePost(postId,title,body){
   return firestore.collection(POSTS).doc(postId).update({
     title:title,
     body:body,
     created_at: firebase.firestore.FieldValue.serverTimestamp()
   })
   .then(function() {
     console.log("게시글이 수정되었습니다.");
    })
    .catch(function(error) {
      console.error("수정 실패: ", error);
    });
  },
   postPost(title, body) {
      return firestore.collection(POSTS).add({
         title,
         body,
         created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
   },
   getPortfolios() {
      const postsCollection = firestore.collection(PORTFOLIOS)
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
   postPortfolio(title, body, img) {
      return firestore.collection(PORTFOLIOS).add({
         title,
         body,
         img,
         created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
   },
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
     .then(function(){
       console.log("update banner");
     })
   },
   addLog(id,msg) {
     return firestore.collection(USER).doc(id).collection("history").add({
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        msg:msg
     })
     .then(function(){
       console.log("update log");
     })
   },

}
