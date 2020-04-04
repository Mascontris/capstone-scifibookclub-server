const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const bookshelfService = require('../services/bookshelf_service')

const bookshelfRouter = express.Router()
const bodyParser = express.json()

const serializeBook = book => ({
  id: parseInt(book.id),
  cover_url: xss(book.cover_url),
  title: xss(book.title),
  author: xss(book.author),
  description: xss(book.description),
  average_rating: book.average_rating,
  created_at: book.date_created,
  user_id: book.user_id
})

//Get all books from user's bookshelf
bookshelfRouter
  .route('/users/:user_id/bookshelf')
  .get((req, res, next) => {

    const { user_id } = req.params

    bookshelfService.getAllBooks(
      req.app.get('db'), 
      user_id
      )
    .then(books => {
        res.json(books.map(serializeBook))
      })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { user_id } = req.params
    for (const field of ['cover_url', 'title']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

     const { cover_url, title, author, description, average_rating } = req.body

     const newBook = { cover_url, title, author, description, average_rating, user_id }

    bookshelfService.insertBook(
      req.app.get('db'),
      newBook
    )
      .then(book => {
        logger.info(`Book with id ${book.id} created.`)
        res
          .status(201)
          .location(`/users/${user_id}/bookshelf/${book.id}`)
          .json(serializeBook(book))
      })
      .catch(next)
  })

// Get book from user's bookshelf by id
bookshelfRouter
  .route('/users/:user_id/bookshelf/:book_id')
  .all((req, res, next) => {
    const { user_id, book_id } = req.params

    bookshelfService.getById(req.app.get('db'), user_id, book_id)
      .then(book => {
        if (!book) {
          logger.error(`Book with id ${book_id} not found.`)
          return res.status(404).json({
            error: { message: `Book Not Found` }
          })
        }
        res.book = book
        next()
      })
      .catch(next)
  })
  .get((req, res) => {
    res.json(serializeBook(res.book))
  })
  .delete((req, res, next) => {
    const { user_id, book_id } = req.params
    bookshelfService.deleteBook(
      req.app.get('db'),
      user_id,
      book_id
    )
      .then(bookAffected => {
        logger.info(`Book with id ${book_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = bookshelfRouter