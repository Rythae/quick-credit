

# Quick Credit #

[![Build Status](https://travis-ci.com/Rythae/quick-credit.svg?branch=develop)](https://travis-ci.org/Rythae/quick-credit)
[![Coverage Status](https://coveralls.io/repos/github/Rythae/quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/Rythae/quick-credit?branch=develop)


Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## **Getting Started** ##

## **Clone the Repo.** ##
Run npm install to install all necessary packages.

### **Prerequisites** ###
The following tools will be needed to run this application successfully:

### Node v8.11.3 or above ###
### Npm v5.6 or above ###

### ENDPOINTS ###

- POST /api/v1/auth/signup - Sign up a user

- POST /api/v1/auth/signin - Sign in a user

- GET /api/v1/loans - Get all Loans

- POST /api/v1/loans - Create a loan request

- GET /api/v1/users/{userId}/loans - Get a user's loans

- GET /api/v1/loans?status=approved&repaid=true - Get all repaid loans

- GET /api/v1/loans?status=approved&repaid=false - Get all current loans

- GET /api/v1/loans/{loanId}/repayments - Get all repayments for a loan

- POST /api/v1/loans/{loanId}/repayments - Post a repayment for a loan

- PATCH /api/v1/loans/{loanId} - Approve a loan request

- PATCH /api/v1/loans/{loanId} - Reject a loan request

- GET /api/v1/loans/{loanId} - Get a single loan

- PATCH /api/v1/users/{email}/verify - Verify a user


#### Installing ####

### On your Local Machine ###

- Pull the develop branch off this repository
- Run npm install to install all dependencies
- Run npm start to start the app
- App runs on port 5000
- Access endpoints on localhost:5000

### On Heroku ###
- Pull the [develop](https://github.com/Rythae/quick-credit) branch off this repository
- Run npm install to install all dependencies
- Access endpoints on https://my-quick-credit.herokuapp.com

### Running the tests ###

- npm run test

### Built With ###

- [Node.js](https://nodejs.org/en/) - Runtime-Enviroment

### Authors ###

- Rythae Emili

#### Acknowledgments ####

- The Andela Team

