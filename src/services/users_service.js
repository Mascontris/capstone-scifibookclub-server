bcrypt = require('bcryptjs')

const usersService = {
    getAllUsers(knex) {
      return knex.select('*').from('users')
    },
    getById(knex, id) {
      return knex.from('users').select('*').where('id', id).first()
    },
    hasUserWithUserName(db, user_name) {
      return db('users')
        .where({ user_name })
        .first()
        .then(user => !!user)
    },
    hashPassword(password) {
      return bcrypt.hash(password, 12)
    },
    insertUser(knex, newUser) {
      return knex
        .insert(newUser)
        .into('users')
        .returning('*')
        .then(rows => {
          console.log(rows)
          return rows[0]
        })
    },
    deleteUser(knex, user_id) {
      return knex('users')
        .where({ id: user_id })
        .delete()
    },
  }
  
  module.exports = usersService