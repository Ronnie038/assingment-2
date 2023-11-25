# level-2 Assignment-2

A brief description of what this project does and who it's for

## 🔗 [Live link ](https://assignment-2-pink-six.vercel.app/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Ronnie038/assingment-2.git
```

Go to the project directory

```bash
  cd assingment-2
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`PORT`

`NODE_ENV`

`BCRYPT_SALT_ROUND`

## API Reference

#### Get all user

```http
  GET /api/users
```

#### Get Single user

```http
  GET /api/users/${userId}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `userId`  | `number` | **Required**. userId of item to fetch |

#### Create user

```http
  POST /api/users
```

| body          | Type          | Description               |
| :------------ | :------------ | :------------------------ |
| `user Object` | `json object` | **Required**. User fields |

```bash
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
```

#### Create order

```http
  POST /api/users/1/orders
```

| Parameter      | body           | Type          | Description                 |
| :------------- | :------------- | :------------ | :-------------------------- |
| users/1/orders | `order Object` | `json object` | **Required**. orders fields |

```bash
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
```

#### GET orders

```http
  GET /api/users/1/orders
```

| Parameter      | body    | Type   | Description   |
| :------------- | :------ | :----- | :------------ |
| users/1/orders | `-----` | `----` | **Required**. |

#### GET Total sum of Orders

```http
  GET /api/users/1/orders/total-price
```

| Parameter                  | body    | Type   | Description   |
| :------------------------- | :------ | :----- | :------------ |
| users/1/orders/total-price | `-----` | `----` | **Required**. |
