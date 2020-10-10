const functions = require('firebase-functions')

const app = require('express')()

const FBAuth = require('./util/fbAuth')

const {
  getAllLitters,
  postOneLitter,
  getLitter,
  commentOnLitter,
  likeLitter,
  unlikeLitter,
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

// TODO delete litter
// TODO unlike a litter

// Users Routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.region('europe-west2').https.onRequest(app)
