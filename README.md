# UCLan Merch Shop API
# Author

Ivan Kostin, Year 3

- `ID: 21078541`

# Description

This API is for a UCLan merch shop and is built with Node.js, MongoDB, Express, Mongoose, JsonWebToken, and DotEnv. It includes endpoints for User, Role, Product, Order, and Offer entities, with different permissions for each. The structure includes controllers, middleware, models, routes, and app.js.

# Source links

`https://github.com/limarkdl/uclan-merch-shop-api`

# Dependencies

- `Node.js`
- `MongoDB`
- `Express`
- `Mongoose`
- `JsonWebToken`
- `DotEnv`
- `ESLint`
- `Nodemon`
- `Bcrypt`
- `Cors`

# Endpoints

- **User** (DONE!)
    - **`POST /users/registration`**: Registers a new user.
    - **`POST /users/login`**: Logs in a user.
    - **`GET /users/me`**: Retrieves data of the current user.
    - **`PUT /users/me`**: Updates data of the current user.
    - **`DELETE /users/me`**: Deletes the current user.
- **Role** (DONE!)
    - **`POST /roles`**: Creates a new role (only for ADMIN).
    - **`GET /roles`**: Retrieves all roles (only for ADMIN).
    - **`PUT /roles/:id`**: Updates a role by ID (only for ADMIN).
    - **`DELETE /roles/:id`**: Deletes a role by ID (only for ADMIN).
- **Product** (PENDING...)
    - **`POST /products`**: Creates a new product (for authorized sellers and ADMIN).
    - **`GET /products`**: Retrieves all products.
    - **`GET /products/:id`**: Retrieves a product by ID.
    - **`PUT /products/:id`**: Updates a product by ID (for authorized sellers and ADMIN).
    - **`DELETE /products/:id`**: Deletes a product by ID (only for ADMIN).
- **Order** (PENDING...)
    - **`POST /orders`**: Creates a new order (for authorized USER).
    - **`GET /orders`**: Retrieves all orders (only for ADMIN).
    - **`GET /orders/:id`**: Retrieves an order by ID (for authorized USER and ADMIN).
    - **`PUT /orders/:id`**: Updates an order by ID (only for ADMIN).
    - **`DELETE /orders/:id`**: Deletes an order by ID (only for ADMIN).
- **Offer** (PENDING...)
    - **`POST /offers`**: Creates a new offer (for authorized sellers and ADMIN).
    - **`GET /offers`**: Retrieves all offers.
    - **`GET /offers/:id`**: Retrieves an offer by ID.
    - **`PUT /offers/:id`**: Updates an offer by ID (for authorized sellers and ADMIN).
    - **`DELETE /offers/:id`**: Deletes an offer by ID (only for ADMIN).

## Entities

- **User**
    - `id: Int32`
    - `username: String`
    - `password (hashed): String`
    - `email: String`
    - `roles: Array`
        - `0: String`
        - `…`
- **Role**
    - `value: String`
- **Product**
    - `id: Int32`
    - `name: String`
    - `description: String`
    - `price: Int32`
    - `img: String`
    - `inStock: Boolean`
- **Order**
    - `id: Int32`
    - `user_id: Int32`
    - `products: Array[]`
        - `product: Product`
        - `…`
    - `time_created: TimeStamp`
    - `summary: Double`
- **Offer**
    - `id: Int32`
    - `name: String`
    - `description: String`
    - `time_created: TimeStamp`
    - `time_until_valid: TimeStamp`

## Structure

- project-root
    - src
        - controllers
            - userController.js
            - roleController.js
            - productController.js
            - orderController.js
            - offerController.js
        - middleware
            - authentication.js
            - authorization.js
        - models
            - User.js
            - Role.js
            - Product.js
            - Order.js
            - Offer.js
        - routes
            - userRoutes.js
            - roleRoutes.js
            - productRoutes.js
            - orderRoutes.js
            - offerRoutes.js
        - app.js
    - package.json
