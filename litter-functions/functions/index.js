const functions = require('firebase-functions')
const app = require('express')()
const FBAuth = require('./util/fbAuth')
const { db } = require('./util/admin')

const {
  getAllLitters,
  postOneLitter,
  getLitter,
  commentOnLitter,
  likeLitter,
  unlikeLitter,
  deleteLitter,
} = require('./handlers/litters')

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handlers/users')

// Litter Routes
app.get('/litters', getAllLitters)
app.post('/litter', FBAuth, postOneLitter)
app.get('/litter/:litterId', getLitter)
app.post('/litter/:litterId/comment', FBAuth, commentOnLitter)
app.get('/litter/:litterId/like', FBAuth, likeLitter)
app.get('/litter/:litterId/unlike', FBAuth, unlikeLitter)
app.delete('/litter/:litterId', FBAuth, deleteLitter)

// Users Routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.region('europe-west2').https.onRequest(app)

// CREATE A NOTIFICATION WHEN A LITTER IS LIKED
exports.createNotificationOnLike = functions
  .region('europe-west2')
  .firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    db.doc(`/litters/${snapshot.data().litterId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            litterId: doc.id,
          })
        }
      })
      .then(() => {
        return
      })
      .catch((err) => {
        console.error(err)
        return
      })
  })

// DELETE THE NOTIFICATION WHEN THE LITTER IS UNLIKED
exports.deleteNotificationOnUnlike = functions
  .region('europe-west2')
  .firestore.document('likes/{id}')
  .onDelete((snapshot) => {
    db.doc(`notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return
      })
      .catch((err) => {
        console.error(err)
        return
      })
  })

// CREATE A NOTIFICATION WHEN A LITTER RECEIVES A COMMENT
exports.createNotificationOnComment = functions
  .region('europe-west2')
  .firestore.document('comments/{id}')
  .onCreate((snapshot) => {
    db.doc(`litters/${snapshot.data().litterId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            litterId: doc.id,
          })
        }
      })
      .then(() => {
        return
      })
      .catch((err) => {
        console.error(err)
        return
      })
  })
