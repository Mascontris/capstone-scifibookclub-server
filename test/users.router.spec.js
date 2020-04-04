const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers.js");

describe("Users Endpoints", function() {
  let db;

  //   const {
  //     testUsers,
  //     testArticles,
  //     testComments,
  //   } = helpers.makeArticlesFixtures()

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

  describe(`GET /users`, () => {
    context(`Given no users`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/users")
          .expect(200, []);
      });
    });
  });

  describe(`Post /users`, () => {
    context(`Create new user`, () => {
      it(`responds with 201 and a new user object`, () => {
        return supertest(app)
          .post("/users")
          .send({ full_name: "Test User",
                  user_name: "User1", 
                  password: "password" })
          .then(response => {
            const MtTimezone = response.body.created_at;
            response.body.created_at = MtTimezone.toLocaleString("en-US", {
              timeZone: "America/Colorado"
            });
            expect(201, [
              {
                id: 1,
                full_name: "Test User",
                user_name: "User1",
                password: "password",
                created_at: new Date(Date.now()).toTimeString()
              }
            ]);
          });
      });
    });
  });

  describe(`Delete /users/1`, () => {
    context(`Delete user`, () => {
      beforeEach("insert user", () => {
        db.insert({ full_name: "Test User", user_name: "User1", password: "password" })
          .into("users")
          .returning("*")
          .then(() => {});
      });

      it(`responds with 204 and deletes user`, () => {
        return supertest(app)
          .del("/users/1")
          .expect(204);
      });
    });
  });
});
