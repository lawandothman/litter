const { db } = require('../util/admin')

exports.getAllLitters = (req, res) => {
  db.collection('litters')
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
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
        })
      })
      return res.json(litters)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.postOneLitter = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: '❌ Body must not be empty' })
  }
  const newLitter = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  }

  db.collection('litters')
    .add(newLitter)
    .then((doc) => {
      res.json({ message: `✅ Document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: '❌ Something went wrong' })
      console.error(err)
    })
}
