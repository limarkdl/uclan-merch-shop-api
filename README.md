# UCLAN Merch Shop API

This is the API for the UCLAN Merch Shop built with Node.JS, Express, Mongoose(MongoDB) and JWT Authorization.

## Getting Started

1. Clone this repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the server
4. The server will be running on `http://localhost:3000`

## API Endpoints

- `/users` - GET all users (ADMINS ONLY)
- `/register` - POST registration (username, password, email)
- `/login` - POST login (username, password)

## Expected response

- `/users` - Plain data about users
- `/register` - "User succesfully created" / Error
- `/login` - Your JWT (lasts 1hr) / Error

## Dependencies

- Node.js
- Express
- express-validator
- express-session
- mongoose
- bcryptjs
- jsonwebtoken
- nodemon
- dotenv

## Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request
