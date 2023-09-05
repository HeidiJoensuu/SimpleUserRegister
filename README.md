# Simple user register

This project was about to make easy and simple web application for storing and viewing users.

In this project there is only frontend, so there is wannabeBackend-folder that handles and stores website's data into sessionStorage.

Otherwise this application acts like there is a backend. It stores data into localstorage or Redux-store. It gives progress information be giving notifications.

There are two diffeent users:
* *admin*, with password *admin*,
* *Bret*, with password *Bret*.

Bred as an user can only see his/her detail page.
Admin however can see list of all users, see all users details, create new user and remove user.
When new user is created this owner can activate his/her user by updating password in first login.

(This project is not focused on creating perfect css)

## Starting project

First you need to create .env-file into root of this project. Example of .env-file can be found in .env.example

url in the .env file would be good to be link to the JSON api that has following structure:
```
[
    {
    "id": int,
    "name": string,
    "username": string,
    "email": string,
    "address": {
      "street": string,
      "suite": string,
      "city": string,
      "zipcode": string,
      "geo": {        //optional
        "lat": string,
        "lng": string
      }
    },
    "phone": string,
    "website": string,
    "company": {
      "name": string,
      "catchPhrase": string,
      "bs": string
    }
]   
    
```

When .env file is done open this project terminal and run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## Structure
```
.
│   .gitignore
│   package-lock.json
│   package.json
│   README.md                       # This readme file
│   
├───public
│       
└───src
    │   App.js
    │   index.css
    │   index.js
    │   store.js                    # Redux store
    │   styles.js                   # MUI-styles file
    │   
    ├───components
    │       Login.js                # Log in page
    │       NewUserForm.js          # Modal for creating new user
    │       Notification.js         # Snackbar of notifications
    │       UserDetail.js           # Details of selected user
    │       UserList.js             # List of users
    │       
    ├───reducers
    │       usersReducer.js         # Reducer for this webpage
    │       
    ├───services
    │       authService.js          # Handles login and password-related "calls" to backend
    │       usersServive.js         # Handles user(s)-information "calls" to backend
    │       
    ├───utils
    │       config.js               # Configuration file
    │       
    └───wannabeBackend              # Files in this folder replaces functions that
            authController.js       # backend would do
            userController.js
```
