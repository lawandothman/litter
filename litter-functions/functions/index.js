const functions = require('firebase-functions')
const admin = require('firebase-admin')

const serviceAccount = require('./litter-cf67f-firebase-adminsdk-gjcvn-deb4dceca0.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://litter-cf67f.firebaseio.com',
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

exports.getLitters = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection('litters')
    .get()
    .then((data) => {
      let litters = []
      data.forEach((doc) => {
        litters.push(doc.data())
      })
      return res.json(litters)
    })
    .catch((err) => console.error(err))
})

exports.createLitter = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ err: 'Method not allowed' })
  }
  const newLitter = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
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
