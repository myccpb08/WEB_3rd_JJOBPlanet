const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssafy-245804.firebaseio.com"
});

var db = admin.firestore();

exports.dbPostWrite = functions.firestore.document('posts/{any}').onCreate( event => {
    // const beforeData = change.before.data(); // data before the write
    // const afterData = change.after.data(); // data after the write
    // console.log(beforeData)
    // console.log(afterData)

    const payload = {
        notification : {
            title: '포스트 생성되었습니다',
            body: '알림아 울려줘'
        }
    }
    console.log('글변경')

    db.collection('users').get().then((snapshot)=> {
        snapshot.forEach(doc => {
            // console.log(doc.data()['test_token'])

            if (doc.data()['test_token']) {
                console.log(doc.data()['test_token'])
                admin.messaging().sendToDevice(doc.data()['test_token'], payload)
            }
        })
    })
  });
//

exports.dbBoardWrite = functions.firestore.document('boards/{any}').onCreate( event => {
    // const beforeData = change.before.data(); // data before the write
    // const afterData = change.after.data(); // data after the write
    // console.log(beforeData)
    // console.log(afterData)

    const payload = {
        notification : {
            title: '게시글 생성되었습니다',
            body: '알림아 울려줘'
        }
    }
    console.log('글변경')

    db.collection('users').get().then((snapshot)=> {
        snapshot.forEach(doc => {
            console.log(doc.data()['test_token'])

            if (doc.data()['test_token']) {
                admin.messaging().sendToDevice(doc.data()['test_token'], payload)
            }
        })
    })
