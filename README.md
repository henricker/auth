## Login and authenticate system

- This project is a login and authenticate application. I made with purpose to learn how this systems worked.

- Tecnologies:
    - Database: mysql,
    - ORM: Sequelize (migrations and mysql)
    - Express
    - Json web token (JWT)
    - Bcrypt
    - NodeMailer

### Register user route (POST)
- To create one user
- Access: https://localhost:3333/store 
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
- Access: [https://localhost:3333/login]
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
        },
    
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjEwNTYyNTg4fQ.tg4PlnqhpSFZuCK0USB1QdN2eTVFvTzoTwwpLZj09ac"
    }

    /*
        Case email dont exists
        response: BAD REQUEST (400)
    */

   {
        "error": "User not found"
   }

   /*
        Case password dont matches
        response:  BAD REQUEST (400)
   */
  {
        "error": "Password incorrect"
  }

```

### Route task (GET):
- This is a generic route where the user must be authenticated in order to enter. Otherwise, access is denied
- Acess: https://localhost:3333/task
- See the exemple bellow:

```json
    //Case the user is authenticated 
    //create req.userId to the route access the user informations

    {
        "ok": true
    }

    //Case dont exists: Authorization error (401)

    {
        "error":"token not provided"
    }

    //Case the token dont contains "Bearer token..."  Authorization error (401)
    
    {
        "erro": "token malformatted"
    }



```

### Get list of all users (GET)
- Return one list where contains all users in the database
- Access: https://localhost:3333/
- See the exemple bellow: 

```json
    {
        {
        "id": 6,
        "name": "Henrique Vieira",
        "email": "henriquevieira@alu.ufc.br",
        "createdAt": "2021-01-13T18:02:48.000Z",
        "updatedAt": "2021-01-13T18:02:48.000Z"
        },
        {
        "id": 7,
        "name": "any name",
        "email": "email@email.com",
        "createdAt": "2021-01-13T18:02:50.000Z",
        "updatedAt": "2021-01-13T18:02:50.000Z"
        }
    }
```

## Forgot Password route (PUT)
- The user sends his email address, after that the system will create a token and send an email to the address provided containing the credentials to change the password. 
This token will be saved in the database and the time to expire this token (1 hour after creation) as well.

- On this route, I use the NodeMailer module to perform e-mail sending operations

- See the exemple bellow:

```json

//request:
{
    "email": "henriquevieira@alu.ufc.br"
},
//Case sucessfully, this response:
{
    "ok": "Email sended with sucessfully!"
},
//Case email dont exists: BAD REQUEST (400)
{
    "error": "User not found"
}
```

- Email received!
![email](./presentation_images/email.png)

### reset password route (PUT)
- On this route, you will receive the email address and shipping notice in the email, and the new password.

```json
{

//request:
{

    "email": "henriquevieira@alu.ufc.br",
    "token":"9ea9562d5f93c780f1f0c26a010b131fbda68eb1",
    "newPassword": "123newPassword:p"

},

//Case sucessfully: OK
{

    "ok": "Your password were settings with sucessfully"

}

//Case invalid token: BAD REQUEST (400)
{
    "error": "Token invalid"
}

//Case the token expires: BAD REQUEST (400)
{
    "error": "Token expired, generate a new one"
}

```

### Get started
- Clone this repository: 
    - git clone https://github.com/henricker/auth
- Install all dependecies:
    - Open the terminal in this repository
    - type: yarn
- Set the configurations archives in ./src/config
- Create one database called 'auth' in SQL database
- Made it, jus run!:
    - yarn dev
