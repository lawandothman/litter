const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: '✨ Hello World! ✨'
  })
})

function notFound(req, res, next) {
  res.status(404)
  const error = new Error('🚫 Not Found -' + req.originalUrl)
  next(error)
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500)
  res.json({
    message: err.message,
    stack: err.stack
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Your app is listening on port ${PORT} 🚀`)
})


