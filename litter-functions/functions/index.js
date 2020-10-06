const functions = require('firebase-functions')
const admin = require('firebase-admin')

const serviceAccount = require('./litter-cf67f-firebase-adminsdk-gjcvn-deb4dceca0.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://litter-cf67f.firebaseio.com',
})

const express = require('express')
const app = express()

app.get('/litters', (req, res) => {
  admin
    .firestore()
    .collection('litters')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let litters = []
      data.forEach((doc) => {
        litters.push({
          litterId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        })
      })
      return res.json(litters)
    })
    .catch((err) => console.error(err))
})

app.post('/litter', (req, res) => {
  const newLitter = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  }

  admin
    .firestore()
    .collection('litters')
    .add(newLitter)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(err)
    })
})

exports.api = functions.region('europe-west2').https.onRequest(app)
