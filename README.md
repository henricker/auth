## Login and authenticate system

- This project is a login and authenticate application. I made with purpose to learn how this systems worked.

- Tecnologies:
    - Database: mysql,
    - ORM: Sequelize (migrations and mysql)
    - Express
    - Json web token (JWT)
    - Bcrypt

### Register user route (POST)
- To create one user
- Access: https://localhost:port/store 
- See the exemple bellow:

```json

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

### Login (POST)
- Return information users and one token to authenticate in task route.
- Access: [https://localhost:port/login]
- See the exemple bellow:

```json
    
    //request
    {
        "email":"henriquevieira@alu.ufc.br",
        "password": "123456"
    }

    /*
        Case Sucessfully

        Returns the user and an authentication token, in which this token will be used to validate that the user is authenticated on other routes
        response:
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

    /*
        Case email dont exists
        response:
    */

   {
        "error": "User not found"
   }

   /*
        Case password dont matches
        response:
   */
  {
        "error": "Password incorrect"
  }

```

### Route task (GET):
- This is a generic route where the user must be authenticated in order to enter. Otherwise, access is denied
- Acess: https://localhost:port/task
- See the exemple bellow:

```json
    //Case the user is authenticated 
    //create req.userId to the route access the user informations

    {
        "ok": true
    }

    //Case dont exists

    {
        "error":"token not provided"
    }

    //Case the token dont contains "Bearer token..."
    
    {
        "erro": "token malformatted"
    }



```
