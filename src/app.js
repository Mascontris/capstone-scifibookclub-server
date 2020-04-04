require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('../src/routes/users_router')
const bookshelfRouter = require('../src/routes/bookshelf_router')
const authRouter = require('../src/auth/auth-router')


const app = express()

const morganOption = (NODE_ENV === 'production') 
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors({origin: 'https://capstone-scifibookclub-client.mascontris.now.sh'}))
app.use(helmet())
app.use(usersRouter)
app.use(bookshelfRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello, corona world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app
