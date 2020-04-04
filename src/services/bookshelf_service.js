const BookshelfService = {
    getAllBooks(knex, user_id) {
      return knex.select('*').from('bookshelf').where('user_id', user_id)
    },
    getById(knex, user_id, book_id) {
      return knex.from('bookshelf').select('*').where({'user_id': user_id, 'id': book_id}).first()
    },
    insertBook(knex, newBook) {
      return knex
        .insert(newBook)
        .into('bookshelf')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    deleteBook(knex, user_id,book_id) {
      return knex('bookshelf')
        .where({ 'user_id': user_id, 'id': book_id })
        .delete()
    },
   }
  
  module.exports = BookshelfService