# Getting Started with this React + Express project

## Setting up environment variables

Configure .env files like so:

1. create .env file in 'client' folder paste this:

REACT_APP_API_URL=http://localhost:3001

2. create .env file in 'server' folder and paste this:

PORT=3001
MONGO_PUBLIC_KEY=ivridjxo
MONGO_PRIVATE_KEY=bea027bc-dbeb-4f00-9226-2faee4e52106
MONGODB_URI=mongodb+srv://test1:test1@cluster20750.5xzkuod.mongodb.net/Cluster20750?retryWrites=true&w=majority&appName=Cluster20750
COOKIE_KEY=4f00-9226-2faee4e52qw3cc4f00-9226

## Running both apps as monorepo

Simply type one command from folder to install all dependencies and run both servers

### `cd client && npm i && cd ../server && npm i && cd ../ && npm i && npm start`

After that you can start both apps concurrently by typing the command in root folder:

### `npm start`

## React App

React app is in 'client' folder.
Inside 'client' folder, install dependencies first:

### `npm install`

Dev environment can be run with:

### `npm start`

Production environment can be run with:

### `npm run build`

This command will create 'build' folder and serve the react application on port 3000, just like in dev enviroment.
The reason for port 3000 is because Express app is made to receive only requests from that port.

## Express App

Express app is in 'server' folder.
Inside 'server' folder, install dependencies first:

### `npm install`

Dev environment can be run with:

### `npm run dev`

Production environment can be run with:

### `npm run build`

to build the project, and:

### `npm start`

to serve the Express app

Tests can be run inside 'server' folder with:

### `npm test`
