## Description

A simple shopping list application made with NestJS

## Running the API

```bash
# start postgresql container
$> docker-compose up -d

$> cd backend

# run migrations for dummy products
$> npx ts-node ./node_modules/typeorm/cli.js migration:run
```

Visit http://localhost:4000/api for the Swagger documentation to test

## Running the UI

```bash
$> cd ui

$ui> yarn install

$ui> yarn start
```

Visit http://localhost:3000 to view the UI
