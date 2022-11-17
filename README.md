# Storefront Backend Project



## Project Summary
***
We will be developing a Node JS application that will connect to a Postgres (SQL) database, and I will construct the database, tables, and columns to meet the project's needs. The database will be used to store user information like as names, email addresses, passwords, and so on, so that they may log in to the application using JWT. I designed a RESTful API for the frontend developer to use. In addition, I wrote tests, encrypted user information, and provided tokens for inclusion into the frontend.
***

## Technologies and tools
- Typescript 
- db-migrate 
- PostgreSQL 
- Jasmine
- Eslint
- Express JS
- Prettier
***

## Prerequisites installation
Your machine must have the following installed on it:
- [Node/NPM](https://nodejs.org/en/download/) (v16 or higher)
*** 

## Setup

### 1. Install Dependencies
After Cloning the project, head inside the project folder and run
```
npm install
```

### 2.  DB Creation and Migrations
```
cp .env.example .env
```
Now, replace .env with your credentials 
```
# dev | test | prod
NODE_ENV=dev

DB_HOST=localhost
DB_NAME=store_dev
DB_TEST_NAME =store_test
DB_TEST_NAME=store_test
DB_USERNAME= Your DB name
DB_PASSWORD= Your DB password
JWT_KEY= Your JWT key
SALT_PASS= Your salt 
SALT_ROUNDS= Your salt rouns
```
and then run
``` 
npm run migrate:up
```

### 3. Starting the project
```
npm start
```
By now you should be able to go to entry point `http://localhost:3000` 

### 4. Running the tests
```
npm test
```
To test that everything is working as expected.
***
## Endpoints
- [REQUIREMENTS.md](REQUIREMENTS.md)

## Database Schema
- [REQUIREMENTS.md](REQUIREMENTS.md)
