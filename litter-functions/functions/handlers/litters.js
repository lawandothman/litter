const { db } = require('../util/admin')

// GET ALL LITTERS
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

// POST A LITTER
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

// GET A LITTER
exports.getLitter = (req, res) => {
  let litterData = {}
  db.doc(`litters/${req.params.litterId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: '❌  Litter not found' })
      }
      litterData = doc.data()
      litterData.litterId = doc.id
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('litterId', '==', req.params.litterId)
        .get()
    })
    .then((data) => {
      litterData.comments = []
      data.forEach((doc) => {
        console.log(doc.data())
        litterData.comments.push(doc.data())
      })
      return res.json(litterData)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

// COMMENT ON A LITTER
exports.commentOnLitter = (req, res) => {
  if (req.body.body.trim() === '')
    return res.status(400).json({ error: '❌  Must not be empty' })

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    litterId: req.params.litterId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  }

  db.doc(`/litters/${req.params.litterId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: '❌ Litter not found' })
      }
      return db.collection('comments').add(newComment)
    })
    .then(() => {
      return res.json(newComment)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}
