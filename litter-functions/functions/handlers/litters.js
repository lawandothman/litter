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
      res.status(500).json({ error: '❌  Something went wrong' })
    })
}

// POST A LITTER
exports.postOneLitter = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: '❌  Body must not be empty' })
  }
  const newLitter = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  }

  db.collection('litters')
    .add(newLitter)
    .then((doc) => {
      const resLitter = newLitter
      resLitter.litterId = doc.id
      res.json(resLitter)
    })
    .catch((err) => {
      res.status(500).json({ error: '❌  Something went wrong' })
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
        return res.status(404).json({ error: '❌  Litter not found' })
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 })
    })
    .then(() => {
      return db.collection('comments').add(newComment)
    })
    .then(() => {
      return res.json(newComment)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: '❌  Something went wrong' })
    })
}

// LIKE A LITTER
exports.likeLitter = (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('litterId', '==', req.params.litterId)
    .limit(1)

  const litterDocument = db.doc(`/litters/${req.params.litterId}`)

  let litterData

  litterDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        litterData = doc.data()
        litterData.litterId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: '❌  Litter not found' })
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('likes')
          .add({
            litterId: req.params.litterId,
            userHandle: req.user.handle,
          })
          .then(() => {
            litterData.likeCount++
            return litterDocument.update({ likeCount: litterData.likeCount })
          })
          .then(() => {
            return res.json(litterData)
          })
      } else {
        return res.status(400).json({ error: '❌  Litter already liked' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: '❌  Something went wrong' })
    })
}

// UNLIKE A LITTER
exports.unlikeLitter = (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('litterId', '==', req.params.litterId)
    .limit(1)

  const litterDocument = db.doc(`litters/${req.params.litterId}`)

  let litterData

  litterDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        litterData = doc.data()
        litterData.litterId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: '❌  Litter not found' })
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: '❌  Litter not liked' })
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            litterData.likeCount--
            return litterDocument.update({ likeCount: litterData.likeCount })
          })
          .then(() => {
            return res.json(litterData)
          })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: '❌  Something went wrong' })
    })
}

// DELETE A LITTER
exports.deleteLitter = (req, res) => {
  const document = db.doc(`/litters/${req.params.litterId}`)
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: '❌  Litter not found' })
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: '❌  Unauthorized' })
      } else {
        return document.delete()
      }
    })
    .then(() => {
      res.json({ message: '✅  Litter deleted successfully' })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: '❌  Something went wrong' })
    })
}
