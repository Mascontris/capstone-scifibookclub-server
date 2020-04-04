const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers.js");

describe("Bookshelf Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /users/1/bookshelf`, () => {
    context(`Given no books`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/users/1/bookshelf")
          .expect(200, []);
      });
    });
  });

  describe(`Post /users/1/bookshelf`, () => {
    context(`Add a book to user's bookshelf`, () => {
      beforeEach("Create user", done => {
        db.insert({
          full_name: "Test User",
          user_name: "User1",
          password: "password"
        })
          .into("users")
          .returning("*")
          .then(() => {
            done();
          });
      });

      it(`responds with 201 and a new book object`, () => {
        return supertest(app)
          .post("/users/1/bookshelf")
          .send({
            cover_url: "http://www.testurl.com",
            title: "Test Title",
            author: "test author",
            description: "This is a test description",
            average_rating: "1"
          })
          .then(response => {
            const MtTimezone = response.body.created_at;
            response.body.created_at = MtTimezone.toLocaleString("en-US", {
              timeZone: "America/Colorado"
            });
            expect(201, [
              {
                id: 1,
                cover_url: "http://www.testurl.com",
                title: "Test Title",
                author: "test author",
                description: "This is a test description",
                average_rating: 1,
                user_id: 1
              }
            ]);
          });
      });
    });
  });

  describe(`Delete /users/1/bookshelf/1`, () => {
    context(`Delete book from user's bookshelf`, () => {
      beforeEach("insert user", (done) => {
        db.insert({
          full_name: "Test User",
          user_name: "User1",
          password: "password"
        })
          .into("users")
          .returning("*")
          .then(response => {
            db.insert({
              cover_url: "http://www.testurl.com",
              title: "Test Title",
              author: "test author",
              description: "This is a test description",
              average_rating: 1,
              user_id: 1
            })
              .into("bookshelf")
              .returning("*")
              .then(() => {
                done();
              });
          });
      });

      it(`responds with 204`, () => {
        return supertest(app)
          .del("/users/1/bookshelf/1")
          .expect(204);
      });
    });
  });
});
