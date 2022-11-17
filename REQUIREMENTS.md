# Database and API Requirements
***
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.
***
## API endpoints 
***
### 1- User
#### 1.1 Index
- token ```Required```
- HTTP ```GET```
- endpoint ```/user```

#### 1.2 Show 
- HTTP ```GET```
- Endpoint ```/user/:id```
- Query ```user id```

#### 1.3 Create 
- HTTP ```POST```
- Endpoint ```/user```

#### 1.4 Update 
- HTTP ```PATCH```
- Endpoint ```/user/:id```
- Need request body

#### 1.5 Delete
- HTTP ```DELETE```
- Endpoint ```/user/:id```
- Query ```user id```
#### 1.6 Authenticate
- HTTP ```POST```
- Endpoint ```/authenticate```
- Query ```email``` and ``password``
***
### 2- Product

#### 2.1 Index
- HTTP ```GET```
- endpoint ```/products```

#### 2.2 Show
- HTTP ```GET```
- Endpoint ```/products/:id```
- Query ```products id```

#### 2.3 Create
- HTTP ```POST```
- Endpoint ```/products```

#### 2.4 Update
- HTTP ```PATCH```
- Endpoint ```/products/:id```
- Need request body

#### 2.5 Delete
- HTTP ```DELETE```
- Endpoint ```/products/:id```
- Query ```product id```
***
### 3- Order

#### 3.1 Index
- HTTP ```GET```
- endpoint ```/order```

#### 3.2 Show
- HTTP ```GET```
- Endpoint ```/order/:id```
- Query ```order id```

#### 3.3 Create
- HTTP ```POST```
- Endpoint ```/order```

#### 3.4 Update
- HTTP ```PATCH```
- Endpoint ```/order/:id```
- Need request body

#### 3.5 Delete
- HTTP ```DELETE```
- Endpoint ```/order/:id```
- Query ```product id```
***
## Database Schema

### 1- User Schema
```
CREATE TABLE "users" (
  "id" SERIAL,
  "firstname" VARCHAR(255) NOT NULL,
  "lastname" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY("id")
);
```

### 2- Order Schema
```
create table  orders (
    id serial primary key,
    quantity integer not null,
    status varchar(70) not null,
    user_id bigint references users(id) not null
);
```

### 3- Product Schema

```
create table product(
    id serial primary key,
    name varchar(255) not null,
    price integer not null,
    description varchar(255)
);
```

***
## Data Shapes

### 1- User 
```
 User {
  id: number,
  firstname: string,
  lastname: string,
  password: string,
  email: string,
  created_at: string,
}
```

### 2- Order
```
 Order {
  id?: number;
  quantity: number;
  order_id: number;
  status: string;
}
```

### 3- Product 

```
 Product {
  id?: number;
  name: string;
  price: number;
  description?: string;
}
```