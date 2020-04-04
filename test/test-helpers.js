function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          users,
          bookshelf
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE bookshelf_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
          trx.raw(`SELECT setval('bookshelf_id_seq', 0)`),
        ])
      )
    )
  }

  module.exports = {
      cleanTables,
  }
