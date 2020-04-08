# SciFi Bookclub (Server)

This is the backend code for SciFi Bookclub, access to Google Book's API SciFi books.

- [Link to Live App](https://capstone-scifibookclub-client.mascontris.now.sh/)
- [Link to Client Repo](https://github.com/Mascontris/capstone-scifibookclub-client)

## API Documentation

### Users Endpoints

### ▸ `GET /users`

Returns an array of registered users.

**Sample query**

```URL
/users
```

```Request Body```
{
	"full_name" : "TestName",
	"password" : "Password!1",
	"user_name" : "TestUsername"
  },
  
**Example response**

```JSON
[
  {
      "id": 1,
      "user_name": "User1",
      "created_at": "2020-03-25T18:52:01.653Z"
    },
    {
      "id": 2,
      "user_name": "User2",
      "created_at": "2020-03-28T21:06:41.967Z"
    },
]
```

- **`id`**`- string` - uuid of an household post
- **`user_name`**`- string` - user_name submitted by registration form
- **`created_at`**`- string` - timestamp in ISO format denoting when the user was created

### ▸ `POST /users`

A new user is registered via registration form.

**Example request**

```JavaScript
{
	"full_name" : "TestName",
	"password" : "Password!1",
	"user_name" : "TestUsername2"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 67,
    "user_name": "TestUsername2",
    "created_at": "2020-04-08T03:11:51.435Z"
}
```

### ▸ `DELETE /users`

This endpoint allows a user to be removed, specified by `id`.

If no user could be found by `id`, the server responds with a status `400`.

### Bookshelf Endpoints

### ▸ `GET /users/:user_id/bookshelf`

Returns an array of books added by user.

**Sample query**

```URL
/users/1/bookshelf
```
**Example response**

```JSON
{
  "id": 1,
  "cover_url": "http://books.google.com/books/content?id=jw7TCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
  "title": "Darth Maul",
  "author": "Michael Reaves",
  "description": "In the prequel to Star Wars: The Phantom Menace, Darth Sidious discovers that one of his Neimoidian allies has betrayed him and sends his apprentice, Darth Maul, to kill him, and the fate of the Republic lies in the hands of Darsha Assant, a young Jedi Padawan, and Lorn Pavan, an opportunistic information broker. Reprint.",
  "average_rating": null,
  "created_at": "2020-04-02T22:46:29.388Z",
  "user_id": 1
    },
```

- **`id`**`- string` - uuid of an book post
- **`cover_url`**`- string` - url for the book cover
- **`title`**` - string` - book title
- **`author`**` - string` - book author
- **`description`**` - string` - book's description
- **`average_rating`**` - string` - book's average rating on Google Books
- **`created_at`**`- string` - timestamp in ISO format denoting when the book was added
- **`user_id`**` - string` - user_id of user who added book

### ▸ `POST /users/:user_id/bookshelf`

A book is added from the Google Books API

**Example request**

```JavaScript
{
 "name" : "kid5",
 "dob" : "12/13/2015",
 "houehold_id" : "4"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 34,
    "name": "kid5",
    "dob": "12/13/2015, 12:00:00 AM",
    "household_id": 4,
    "created_at": "2/10/2020, 12:32:19 AM"
}
```

### ▸ `DELETE /kids`

This endpoint allows a user to remove a child, specified by `kid_id`.

If no household could be found by `kid_id`, the server responds with a status `400`.

### Actions Endpoints

### ▸ `GET /actions`

Returns an array of actions created by users.

**Sample query**

```URL
/actions
```
**Example response**

```JSON
{
  "id": 61,
  "description": "Test description of action",
  "kid_id": 1,
  "polarity": true,
  "created_at": "2020-02-10T08:02:54.165Z"
}
```

- **`id`**`- string` - uuid of an household post
- **`description`**`- string` - description of action performed by child.
- **`kid_id`**`- string` - id associated with child that performed action 

### ▸ `POST /actions`

A new action is created via add action form.

**Example request**

```JavaScript
{
 "description" : "Played with brother without fighting.",
  "kid_id" : "1"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 61,
    "description": "Test description of action",
    "kid_id": 1,
    "polarity": true,
    "created_at": "2020-02-10T08:02:54.165Z"
}
```

### ▸ `DELETE /actions`

This endpoint allows a user to remove an action, specified by `action_id`.

If no action could be found by `action_id`, the server responds with a status `400`.

## Technology Stack

### Backend
- **Express** for handling API requests
- **Node** for interacting with the file system 
- **Knex.js** for interfacing with the **PostgreSQL** database
- **Postgrator** for database migration
- **Mocha**, **Chai**, **Supertest** for endpoints testing
