## Login and authenticate system

- This project is a login and authenticate application. I made with purpose to learn how this systems worked.

- Tecnologies:
    - Database: mysql,
    - ORM: Sequelize (migrations and mysql)
    - Express
    - Json web token (JWT)
    - Bcrypt

### Fist: register user route (POST)
- To create one user, in https://localhost:port/store send one request, show the exemple bellow:

```javascript

    //request
    
    {
        "name": "Henrique Vieira",
        "email": "henriquevieira@alu.ufc.br",
        "password": "123456"
    }

    // response: saved use

    {
        "name": "Henrique Vieira",
        "email": "henriquevieira@alu.ufc.br",
        "updatedAt": "2021-01-13T18:02:48.232Z",
        "createdAt": "2021-01-13T18:02:48.232Z"
    }
    
```

### Second: List all users (GET)
- To list all users, just acess [https://localhost:port/]

```javascript
    
    //request
    {
        "email":"henriquevieira@alu.ufc.br",
        "password": "123456"
    }

    /*
        Case Sucessfully
        
        return user and one token to authorization others routes than needed user authenticate
    */
    {
        
    "user": {
        "id": 6,
        "name": "Henrique Vieira",
        "email": "henriquevieira@alu.ufc.br",
        "createdAt": "2021-01-13T18:02:48.000Z",
        "updatedAt": "2021-01-13T18:02:48.000Z"
        }
    
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjEwNTYyNTg4fQ.tg4PlnqhpSFZuCK0USB1QdN2eTVFvTzoTwwpLZj09ac"
    }

```
