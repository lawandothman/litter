const admin = require('firebase-admin')
const serviceAccount = require('../litter-cf67f-firebase-adminsdk-gjcvn-deb4dceca0.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://litter-cf67f.firebaseio.com',
})

const db = admin.firestore()

module.exports = { admin, db }
