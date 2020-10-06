const functions = require('firebase-functions')

const app = require('express')()

const FBAuth = require('./util/fbAuth')

const { getAllLitters, postOneLitter } = require('./handlers/litters')
const { signup, login } = require('./handlers/users')

// Litter Routes
app.get('/litters', getAllLitters)
app.post('/litter', FBAuth, postOneLitter)

// Users Routes
app.post('/signup', signup)
app.post('/login', login)

exports.api = functions.region('europe-west2').https.onRequest(app)
