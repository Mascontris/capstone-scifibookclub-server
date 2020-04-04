const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const usersService = require("../services/users_service");
const usersRouter = express.Router();
const bodyParser = express.json();

const serializeUser = user => ({
  id: parseInt(user.id),
  user_name: xss(user.user_name),
  created_at: user.date_created
});

//Gets all users
usersRouter
  .route("/users")
  .get((req, res, next) => {
    usersService
      .getAllUsers(req.app.get("db"))
      .then(users => {
        res.json(users.map(serializeUser));
      })
      .catch(next);
  })

  //Insert new user into table
  .post(bodyParser, (req, res, next) => {
    for (const field of ["full_name", "user_name", "password"]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        });
      }
    }

    const { full_name, user_name, password } = req.body;

    usersService.hasUserWithUserName(req.app.get("db"), user_name)
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` });

        return usersService.hashPassword(password).then(hashedPassword => {
          const newUser = {
            full_name,
            user_name,
            password: hashedPassword
          };

          return usersService
            .insertUser(req.app.get("db"), newUser)
            .then(user => {
              logger.info(`User with id ${user.id} created.`);
              res
                .status(201)
                .location(`/Users/${user.id}`)
                .json(serializeUser(user));
            });
        });
      })
      .catch(next);
  });

//Get user by id
usersRouter
  .route("/users/:user_id")
  .all((req, res, next) => {
    const { user_id } = req.params;
    usersService
      .getById(req.app.get("db"), user_id)
      .then(user => {
        if (!user) {
          logger.error(`User with id ${user_id} not found.`);
          return res.status(404).json({
            error: { message: `User Not Found` }
          });
        }
        res.user = user;
        next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeUser(res.user));
  })
  .delete((req, res, next) => {
    const { user_id } = req.params;
    usersService
      .deleteUser(req.app.get("db"), user_id)
      .then(userAffected => {
        logger.info(`User with id ${user_id} deleted.`);
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = usersRouter;
