const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssafy-245804.firebaseio.com"
});

var db = admin.firestore();

exports.dbPostWrite = functions.firestore.document('posts/{any}').onCreate( event => {

    const payload = {
        notification : {
            title: '포스트 생성되었습니다',
            body: '알림아 울려줘'
        }
    }
    console.log('글변경')

    db.collection('users').get().then((snapshot)=> {
        snapshot.forEach(doc => {

            if (doc.data()['test_token'] !='' && doc.data()['test_token'] != undefined) {
                console.log(doc.data()['test_token'])
                admin.messaging().sendToDevice(doc.data()['test_token'], payload)
            }
        })
    })
  });

exports.dbBoardWrite = functions.firestore.document('boards/{any}').onCreate( event => {

    const payload = {
        notification : {
            title: '게시글 생성되었습니다',
            body: '알림아 울려줘'
        }
    }
    console.log('글변경')

    db.collection('users').get().then((snapshot)=> {
        snapshot.forEach(doc => {


            if (doc.data()['test_token'] !='' && doc.data()['test_token'] != undefined) {
                console.log(doc.data()['test_token'])
                admin.messaging().sendToDevice(doc.data()['test_token'], payload)
            }
        })
    })
  });

  exports.dbPostWriteComment = functions.firestore.document('posts/{any}/post-comments/{anyy}').onCreate( event => {

    const payload = {
        notification : {
            title: '포스트게시글에 댓글 생성되었습니다',
            body: '알림아 울려줘'
        }
    }
    console.log('댓글생성')

    db.collection('users').get().then((snapshot)=> {
        snapshot.forEach(doc => {

            if (doc.data()['userClass'] == 'admin' && doc.data()['test_token']) {
                console.log(doc.data()['test_token'])
                admin.messaging().sendToDevice(doc.data()['test_token'], payload)
            }
        })
    })
  });

  exports.dbBoardWriteComment = functions.firestore.document('boards/{any}/post-comments/{anyy}').onCreate( event => {

    const payload = {
        notification : {
            title: '게시글에 댓글 생성되었습니다',
            body: '알림아 울려줘'
        }
    }
    console.log('댓글생성')

    db.collection('users').get().then((snapshot)=> {
        snapshot.forEach(doc => {
          
            if (doc.data()['userClass'] == 'admin' && doc.data()['test_token']) {
                console.log(doc.data()['test_token'])
                admin.messaging().sendToDevice(doc.data()['test_token'], payload)
            }
        })
    })
  });
