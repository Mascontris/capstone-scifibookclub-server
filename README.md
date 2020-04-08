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
	"cover_url" : "http://www.fakeurl.com",
	"title" : "Star Wars",
	"author" : "Lucas",
	"description" : "In a galaxy far, far away.",
	"average_rating" : "10"
}
```

> _A successful <small>POST</small> 

```JavaScript
{
    "id": 37,
    "cover_url": "http://www.fakeurl.com",
    "title": "Star Wars",
    "author": "Lucas",
    "description": "In a galaxy far, far away.",
    "average_rating": 10,
    "created_at": "2020-04-08T03:22:52.876Z",
    "user_id": 1
}
```

### ▸ `DELETE /users/:user_id/bookshelf/:id`

This endpoint allows a user to remove a book from their bookshelf specified by `id`.

If no book could be found by `id`, the server responds with a status `400`.

## Technology Stack

### Backend
- **Express** for handling API requests
- **Node** for interacting with the file system 
- **Knex.js** for interfacing with the **PostgreSQL** database
- **Postgrator** for database migration
- **Mocha**, **Chai**, **Supertest** for endpoints testing
