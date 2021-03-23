## Description

Backend REST API for a shopping list made with NestJS

## Usage

In swagger, create products via `POST /products` endpoint.  
Create a cart via `POST /cart`.   
Add cart products via `PUT /cart` endpoint passing in the `productId` and `quantity` in the body

Data transfer objects are specified in Swagger

## Entities

Product - Entity that contains details of each product  
https://github.com/sydcanem/dv-code-test/blob/main/backend/src/products/entities/product.entity.ts

CartProduct - Entity contains the product id, quantity and cart id where it is added  
https://github.com/sydcanem/dv-code-test/blob/main/backend/src/cart/entities/cart.entity.ts

Cart - Represents the cart and has one-to-many relationship with CartProduct  
https://github.com/sydcanem/dv-code-test/blob/main/backend/src/cart/entities/cart.entity.ts

## Installation

```bash
$ yarn install
```
### Base API

```bash
http://localhost:4000
```

### Swagger

```bash
http://localhost:4000/api
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```


