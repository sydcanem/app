## Description

A simple shopping list application made with NestJS

## Running the API

```bash
$> cd backend

# start postgresql container
$backend> docker-compose up -d

# run migrations for dummy products
$backend> npx ts-node ./node_modules/typeorm/cli.js migration:run

# run the app
$backend> yarn run start
```

Visit http://localhost:4000/api for the Swagger documentation to test

## Running the UI

```bash
$> cd ui

$ui> yarn install

$ui> yarn start
```

Visit http://localhost:3000 to view the UI
