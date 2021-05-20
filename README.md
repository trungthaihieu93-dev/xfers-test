# xfers-backend-challenge

This is an API server containing RESTful APIs following the requirements.

## Prerequisites

Install [Node.js](https://nodejs.org).

Check the environment variables by type these commands:

> node -v

> npm -v

Run a MySQL instance (through Docker or installation), environment should follow the **.env** file. 

## Run Server

At source folder, run this command:

> npm install --save

Create a dotenv file following the format of **.env** file

> HOST=localhost
> PORT=7000
> DB_HOST=localhost
> DB_PORT=3306
> DB_USER=root
> DB_PASSWORD=mysql
> DB_NAME=test

After installing packages, run this command:

> npm start

The development server should be available at [Server](http://localhost:7000/).

## Test Instructions

Run this command:

> npm test

Import the JSON config for postman by using the file **postman.json**


