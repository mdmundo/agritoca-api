# Agritoca

This is a simple service **REST API** to be consumed by the application front end.

## Instructions

- On your requests replace `{{url}}` with the [API URL](https://agritoca-api.herokuapp.com/).

- Also, replace `{{googleTokenId}}` with the value in `id_token` found after a login [here](https://get-google-token.herokuapp.com/).

- **Important:** The client must send the **token** received from [Login User Google](#2-login-user-google) in the Authorization header when making requests to protected resources: `Authorization: Bearer <token>`

## Indices

- [Baskets](#baskets)

  - [Update Baskets](#1-update-baskets)
  - [User Baskets](#2-user-baskets)

- [Producer Products](#producer-products)

  - [Create Producer Product](#1-create-producer-product)
  - [Delete Producer Product](#2-delete-producer-product)
  - [Producer Product Picture](#3-producer-product-picture)
  - [Producer Product by ID](#4-producer-product-by-id)
  - [Search Producer Products](#5-search-producer-products)
  - [Update Producer Product](#6-update-producer-product)
  - [Upload Producer Product Picture](#7-upload-producer-product-picture)

- [Producer Products History](#producer-products-history)

  - [Producer Product History Picture](#1-producer-product-history-picture)
  - [Producer Product History by ID](#2-producer-product-history-by-id)
  - [Restore Producer Product History](#3-restore-producer-product-history)
  - [Search Producer Products History](#4-search-producer-products-history)

- [Producers](#producers)

  - [Create Producer](#1-create-producer)
  - [Delete Producer](#2-delete-producer)
  - [Producer by ID](#3-producer-by-id)
  - [Search Producers](#4-search-producers)
  - [Update Producer](#5-update-producer)

- [Producers History](#producers-history)

  - [Producers History by ID](#1-producers-history-by-id)
  - [Restore Producer History](#2-restore-producer-history)
  - [Search Producers History](#3-search-producers-history)

- [Products](#products)

  - [Create Product](#1-create-product)
  - [Delete Product](#2-delete-product)
  - [Product Picture](#3-product-picture)
  - [Product by ID](#4-product-by-id)
  - [Search Products](#5-search-products)
  - [Update Product](#6-update-product)
  - [Upload Product Picture](#7-upload-product-picture)

- [Products History](#products-history)

  - [Product History Picture](#1-product-history-picture)
  - [Product History by ID](#2-product-history-by-id)
  - [Restore Product History](#3-restore-product-history)
  - [Search Products History](#4-search-products-history)

- [Users](#users)

  - [Delete User](#1-delete-user)
  - [Login User Google](#2-login-user-google)
  - [Search Users](#3-search-users)
  - [Set User Privilege](#4-set-user-privilege)
  - [Unset User Privilege](#5-unset-user-privilege)
  - [User Profile](#6-user-profile)
  - [User by ID](#7-user-by-id)

---

## Baskets

`Baskets` folder contains all basket related APIs. For authentication all of these apis require `JWT` token.

### 1. Update Baskets

Updates all baskets of current user.

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{url}}/baskets
```

**_Body:_**

```js
[
  {
    id: 5,
    name: 'Cesta #5',
    items: [
      {
        ncm: '02032100',
        measure: 'KG',
        description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
        is_organic: false,
        product_id: 1,
        producer_id: 1,
        brand: 'ooarea',
        barcode: '197895997244',
        keywords: 'upset, responsible, splendid',
        id: 1,
        producer_product_id: 1,
        created_at: '2020-10-07T13:14:33.167Z',
        updated_at: '2020-10-07T13:14:33.167Z'
      }
    ]
  },
  {
    id: 6,
    name: 'Cesta #6',
    items: []
  },
  {
    id: 7,
    name: 'Cesta #7',
    items: []
  }
];
```

**_More example Requests/Responses:_**

##### I. Example Request: Update Baskets: Unauthenticated

**_Body:_**

```js
[
  {
    id: 5,
    name: 'Cesta #5',
    items: [
      {
        ncm: '02032100',
        measure: 'KG',
        description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
        is_organic: false,
        product_id: 1,
        producer_id: 1,
        brand: 'ooarea',
        barcode: '197895997244',
        keywords: 'upset, responsible, splendid',
        id: 1,
        producer_product_id: 1,
        created_at: '2020-10-07T13:14:33.167Z',
        updated_at: '2020-10-07T13:14:33.167Z'
      }
    ]
  },
  {
    id: 6,
    name: 'Cesta #6',
    items: []
  },
  {
    id: 7,
    name: 'Cesta #7',
    items: []
  }
];
```

##### I. Example Response: Update Baskets: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Update Baskets: Success

**_Body:_**

```js
[
  {
    id: 5,
    name: 'Cesta #5',
    items: [
      {
        ncm: '02032100',
        measure: 'KG',
        description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
        is_organic: false,
        product_id: 1,
        producer_id: 1,
        brand: 'ooarea',
        barcode: '197895997244',
        keywords: 'upset, responsible, splendid',
        id: 1,
        producer_product_id: 1,
        created_at: '2020-10-07T13:14:33.167Z',
        updated_at: '2020-10-07T13:14:33.167Z'
      }
    ]
  },
  {
    id: 6,
    name: 'Cesta #6',
    items: []
  },
  {
    id: 7,
    name: 'Cesta #7',
    items: []
  }
];
```

**_Status Code:_** 200

<br>

### 2. User Baskets

Fetch all baskets from current user.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/baskets
```

**_More example Requests/Responses:_**

##### I. Example Request: User Baskets: Success

##### I. Example Response: User Baskets: Success

```js
[
  {
    id: '5',
    name: 'Cesta #5',
    items: [
      {
        ncm: '02032100',
        measure: 'KG',
        description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
        is_organic: false,
        product_id: 1,
        producer_id: 1,
        brand: 'ooarea',
        barcode: '197895997244',
        keywords: 'upset, responsible, splendid',
        id: '1',
        producer_product_id: 1,
        created_at: '2020-10-07T13:14:33.167Z',
        updated_at: '2020-10-07T13:14:33.167Z'
      }
    ]
  },
  {
    id: '6',
    name: 'Cesta #6',
    items: []
  },
  {
    id: '7',
    name: 'Cesta #7',
    items: []
  }
];
```

**_Status Code:_** 200

<br>

##### II. Example Request: User Baskets: Unauthenticated

##### II. Example Response: User Baskets: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

## Producer Products

`Producer Products` folder contains all producer products related APIs. For authentication some of these apis require `JWT` token.

### 1. Create Producer Product

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/producerProducts
```

**_Body:_**

```js
{
  "brand": "L'oreal",
  "barcode": "098713241892",
  "keywords": "constant, iresponsible, incognito",
  "product_id": 1,
  "producer_id": 1
}
```

### 2. Delete Producer Product

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/producerProducts/:id
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_More example Requests/Responses:_**

##### I. Example Request: Delete Producer Product: Unauthenticated

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### I. Example Response: Delete Producer Product: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Delete Producer Product: Unauthorized

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### II. Example Response: Delete Producer Product: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### III. Example Request: Delete Producer Product: Error

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

##### III. Example Response: Delete Producer Product: Error

```js
{
    "message": "Error Removing Producer Product"
}
```

**_Status Code:_** 500

<br>

##### IV. Example Request: Delete Producer Product: Success

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Status Code:_** 200

<br>

##### V. Example Request: Delete Producer Product: Invalid

**_Query:_**

| Key | Value   | Description         |
| --- | ------- | ------------------- |
| id  | invalid | Producer Product ID |

##### V. Example Response: Delete Producer Product: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

### 3. Producer Product Picture

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producerProducts/:id/picture
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_More example Requests/Responses:_**

##### I. Example Request: Producer Product Picture: Invalid

**_Query:_**

| Key | Value   | Description         |
| --- | ------- | ------------------- |
| id  | invalid | Producer Product ID |

##### I. Example Response: Producer Product Picture: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Producer Product Picture: Not Found

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

**_Status Code:_** 404

<br>

### 4. Producer Product by ID

Search producer product by `id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producerProducts/:id
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_More example Requests/Responses:_**

##### I. Example Request: Producer Product by ID: Not Found

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

##### I. Example Response: Producer Product by ID: Not Found

```js
{
    "message": "Producer Product not found"
}
```

**_Status Code:_** 404

<br>

##### II. Example Request: Producer Product by ID: Invalid

**_Query:_**

| Key | Value   | Description         |
| --- | ------- | ------------------- |
| id  | invalid | Producer Product ID |

##### II. Example Response: Producer Product by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Producer Product by ID: Success

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### III. Example Response: Producer Product by ID: Success

```js
{
    "ncm": "02032100",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false,
    "id": 1,
    "product_id": 1,
    "producer_id": 1,
    "brand": "ooarea",
    "barcode": "197895997244",
    "keywords": "upset, responsible, splendid",
    "mod": "mbrown@msn.com",
    "created_at": "2020-10-12T19:30:29.458Z",
    "updated_at": "2020-10-12T19:30:29.458Z"
}
```

**_Status Code:_** 200

<br>

### 5. Search Producer Products

Search producer products by `brand`, `keywords`, `producer_id` or `product_id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producerProducts
```

**_Query params:_**

| Key         | Value | Description               |
| ----------- | ----- | ------------------------- |
| brand       | ea    | Producer Product Brand    |
| keywords    | le    | Producer Product Keywords |
| producer_id | 1     | Producer ID               |
| product_id  | 1     | Product ID                |

**_More example Requests/Responses:_**

##### I. Example Request: Search Producer Products: Invalid

**_Query:_**

| Key         | Value   | Description               |
| ----------- | ------- | ------------------------- |
| brand       | ea      | Producer Product Brand    |
| keywords    | le      | Producer Product Keywords |
| producer_id | 1       | Producer ID               |
| product_id  | invalid | Product ID                |

##### I. Example Response: Search Producer Products: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"product_id\" must be a number",
    "validation": {
        "source": "query",
        "keys": [
            "product_id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Search Producer Products: Pagination Params

**_Query:_**

| Key       | Value | Description     |
| --------- | ----- | --------------- |
| sort      | brand | Sort items by   |
| direction | desc  | Sorting order   |
| page      | 3     | Page number     |
| pagesize  | 2     | Items on a page |

##### II. Example Response: Search Producer Products: Pagination Params

```js
[
  {
    ncm: '02032100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    id: 18,
    product_id: 1,
    producer_id: 8,
    brand: 'platinumbear',
    barcode: '505854275106',
    keywords: 'complex, chief, visible',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T19:30:29.458Z',
    updated_at: '2020-10-12T19:30:29.458Z'
  },
  {
    ncm: '02032100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    id: 20,
    product_id: 1,
    producer_id: 10,
    brand: 'opticell',
    barcode: '130194962380',
    keywords: 'lively, delicate, threatening',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T19:30:29.458Z',
    updated_at: '2020-10-12T19:30:29.458Z'
  }
];
```

**_Status Code:_** 200

<br>

##### III. Example Request: Search Producer Products: Empty Page

**_Query:_**

| Key         | Value | Description               |
| ----------- | ----- | ------------------------- |
| brand       | ead   | Producer Product Brand    |
| keywords    | le    | Producer Product Keywords |
| producer_id | 1     | Producer ID               |
| product_id  | 1     | Product ID                |

##### III. Example Response: Search Producer Products: Empty Page

```js
[];
```

**_Status Code:_** 200

<br>

##### IV. Example Request: Search Producer Products: Search Params

**_Query:_**

| Key         | Value | Description               |
| ----------- | ----- | ------------------------- |
| brand       | ea    | Producer Product Brand    |
| keywords    | le    | Producer Product Keywords |
| producer_id | 1     | Producer ID               |
| product_id  | 1     | Product ID                |

##### IV. Example Response: Search Producer Products: Search Params

```js
[
  {
    ncm: '02032100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    id: 1,
    product_id: 1,
    producer_id: 1,
    brand: 'ooarea',
    barcode: '197895997244',
    keywords: 'upset, responsible, splendid',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T19:30:29.458Z',
    updated_at: '2020-10-12T19:30:29.458Z'
  }
];
```

**_Status Code:_** 200

<br>

### 6. Update Producer Product

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{url}}/producerProducts/:id
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

```js
{
  "brand": "L'oreal",
  "barcode": "098713241892",
  "keywords": "constant, iresponsible, incognito",
  "product_id": 1,
  "producer_id": 1
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update Producer Product: Unauthorized

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

```js
{
  "brand": "L'oreal",
  "barcode": "098713241892",
  "keywords": "constant, iresponsible, incognito",
  "product_id": 1,
  "producer_id": 1
}
```

##### I. Example Response: Update Producer Product: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### II. Example Request: Update Producer Product: Error

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

**_Body:_**

```js
{
  "brand": "L'oreal",
  "barcode": "098713241892",
  "keywords": "constant, iresponsible, incognito",
  "product_id": 1,
  "producer_id": 1
}
```

##### II. Example Response: Update Producer Product: Error

```js
{
    "message": "Error Updating Producer Product"
}
```

**_Status Code:_** 500

<br>

##### III. Example Request: Update Producer Product: Unauthenticated

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

```js
{
  "brand": "L'oreal",
  "barcode": "098713241892",
  "keywords": "constant, iresponsible, incognito",
  "product_id": 1,
  "producer_id": 1
}
```

##### III. Example Response: Update Producer Product: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Update Producer Product: Success

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

```js
{
  "brand": "L'oreal",
  "barcode": "098713241892",
  "keywords": "constant, iresponsible, incognito",
  "product_id": 1,
  "producer_id": 1
}
```

##### IV. Example Response: Update Producer Product: Success

```js
{
    "id": 1,
    "product_id": 1,
    "producer_id": 1,
    "brand": "L'oreal",
    "barcode": "098713241892",
    "keywords": "constant, iresponsible, incognito",
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T19:30:29.458Z",
    "updated_at": "2020-10-12T19:43:50.051Z"
}
```

**_Status Code:_** 200

<br>

### 7. Upload Producer Product Picture

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{url}}/producerProducts/:id/picture
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Upload Producer Product Picture: Error

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### I. Example Response: Upload Producer Product Picture: Error

```js
{
    "message": "Error on Uploading Picture"
}
```

**_Status Code:_** 500

<br>

##### II. Example Request: Upload Producer Product Picture: Invalid File

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### II. Example Response: Upload Producer Product Picture: Invalid File

```js
{
    "message": "Can not upload that"
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Upload Producer Product Picture: Success

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

**_Status Code:_** 200

<br>

##### IV. Example Request: Upload Producer Product Picture: Unauthorized

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### IV. Example Response: Upload Producer Product Picture: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### V. Example Request: Upload Producer Product Picture: Unauthenticated

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### V. Example Response: Upload Producer Product Picture: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

## Producer Products History

`Producer Products History` folder contains all producer products history related APIs. For authentication all of these apis require `JWT` token.

### 1. Producer Product History Picture

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producerProductsHistory/:id/picture
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_More example Requests/Responses:_**

##### I. Example Request: Producer Product History Picture: Unauthenticated

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### I. Example Response: Producer Product History Picture: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Producer Product History Picture: Unauthorized

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### II. Example Response: Producer Product History Picture: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### III. Example Request: Producer Product History Picture: Not Found

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

**_Status Code:_** 404

<br>

##### IV. Example Request: Producer Product History Picture: Invalid

**_Query:_**

| Key | Value   | Description         |
| --- | ------- | ------------------- |
| id  | invalid | Producer Product ID |

##### IV. Example Response: Producer Product History Picture: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

### 2. Producer Product History by ID

Search producer product history by `id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producerProductsHistory/:id
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_More example Requests/Responses:_**

##### I. Example Request: Producer Product History by ID: Unauthorized

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### I. Example Response: Producer Product History by ID: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### II. Example Request: Producer Product History by ID: Success

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### II. Example Response: Producer Product History by ID: Success

```js
{
    "id": 1,
    "producer_product_id": 1,
    "product_id": 1,
    "producer_id": 1,
    "brand": "ooarea",
    "barcode": "197895997244",
    "keywords": "upset, responsible, splendid",
    "mod": "teverett@msn.com",
    "created_at": "2020-10-12T20:27:48.665Z",
    "updated_at": "2020-10-12T20:27:48.665Z",
    "deleted_at": null
}
```

**_Status Code:_** 200

<br>

##### III. Example Request: Producer Product History by ID: Invalid

**_Query:_**

| Key | Value   | Description         |
| --- | ------- | ------------------- |
| id  | invalid | Producer Product ID |

##### III. Example Response: Producer Product History by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: Producer Product History by ID: Not Found

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

##### IV. Example Response: Producer Product History by ID: Not Found

```js
{
    "message": "Producer Product not found"
}
```

**_Status Code:_** 404

<br>

##### V. Example Request: Producer Product History by ID: Unauthenticated

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### V. Example Response: Producer Product History by ID: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

### 3. Restore Producer Product History

**_Endpoint:_**

```bash
Method: POST
Type:
URL: {{url}}/producerProductsHistory/:id
```

**_URL variables:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

**_More example Requests/Responses:_**

##### I. Example Request: Restore Producer Product History: Invalid

**_Query:_**

| Key | Value   | Description         |
| --- | ------- | ------------------- |
| id  | invalid | Producer Product ID |

##### I. Example Response: Restore Producer Product History: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Restore Producer Product History: Success

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### II. Example Response: Restore Producer Product History: Success

```js
{
    "id": 1,
    "product_id": 1,
    "producer_id": 1,
    "brand": "ooarea",
    "barcode": "197895997244",
    "keywords": "upset, responsible, splendid",
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T20:27:48.665Z",
    "updated_at": "2020-10-12T21:26:57.666Z"
}
```

**_Status Code:_** 200

<br>

##### III. Example Request: Restore Producer Product History: Unauthorized

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### III. Example Response: Restore Producer Product History: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### IV. Example Request: Restore Producer Product History: Error

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 999   | Producer Product ID |

##### IV. Example Response: Restore Producer Product History: Error

```js
{
    "message": "Error on Restoring Producer Product"
}
```

**_Status Code:_** 500

<br>

##### V. Example Request: Restore Producer Product History: Unauthenticated

**_Query:_**

| Key | Value | Description         |
| --- | ----- | ------------------- |
| id  | 1     | Producer Product ID |

##### V. Example Response: Restore Producer Product History: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

### 4. Search Producer Products History

Search producer products history by `producer_product_id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producerProductsHistory
```

**_Query params:_**

| Key                 | Value | Description         |
| ------------------- | ----- | ------------------- |
| producer_product_id | 1     | Producer Product ID |
| direction           | desc  | Sorting order       |

**_More example Requests/Responses:_**

##### I. Example Request: Search Producer Products History: Unauthenticated

**_Query:_**

| Key                 | Value | Description         |
| ------------------- | ----- | ------------------- |
| producer_product_id | 1     | Producer Product ID |
| direction           | desc  | Sorting order       |

##### I. Example Response: Search Producer Products History: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Search Producer Products History: Unauthorized

**_Query:_**

| Key                 | Value | Description         |
| ------------------- | ----- | ------------------- |
| producer_product_id | 1     | Producer Product ID |
| direction           | desc  | Sorting order       |

##### II. Example Response: Search Producer Products History: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### III. Example Request: Search Producer Products History: Invalid

**_Query:_**

| Key                 | Value   | Description         |
| ------------------- | ------- | ------------------- |
| producer_product_id | invalid | Producer Product ID |

##### III. Example Response: Search Producer Products History: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"producer_product_id\" must be a number",
    "validation": {
        "source": "query",
        "keys": [
            "producer_product_id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: Search Producer Products History: Search Params

**_Query:_**

| Key                 | Value | Description         |
| ------------------- | ----- | ------------------- |
| producer_product_id | 1     | Producer Product ID |

##### IV. Example Response: Search Producer Products History: Search Params

```js
[
  {
    id: 1,
    producer_product_id: 1,
    product_id: 1,
    producer_id: 1,
    brand: 'ooarea',
    barcode: '197895997244',
    keywords: 'upset, responsible, splendid',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.665Z',
    updated_at: '2020-10-12T20:27:48.665Z',
    deleted_at: null
  },
  {
    id: 2,
    producer_product_id: 1,
    product_id: 1,
    producer_id: 1,
    brand: 'ooarea',
    barcode: '197895997244',
    keywords: 'upset, responsible, splendid',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.665Z',
    updated_at: '2020-10-12T20:27:48.665Z',
    deleted_at: null
  }
];
```

**_Status Code:_** 200

<br>

##### V. Example Request: Search Producer Products History: Pagination Params

**_Query:_**

| Key       | Value | Description     |
| --------- | ----- | --------------- |
| sort      | id    | Sort items by   |
| direction | desc  | Sorting order   |
| page      | 0     | Page number     |
| pagesize  | 2     | Items on a page |

##### V. Example Response: Search Producer Products History: Pagination Params

```js
[
  {
    id: 40,
    producer_product_id: 20,
    product_id: 1,
    producer_id: 10,
    brand: 'opticell',
    barcode: '130194962380',
    keywords: 'lively, delicate, threatening',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.665Z',
    updated_at: '2020-10-12T20:27:48.665Z',
    deleted_at: null
  },
  {
    id: 39,
    producer_product_id: 20,
    product_id: 1,
    producer_id: 10,
    brand: 'opticell',
    barcode: '130194962380',
    keywords: 'lively, delicate, threatening',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.665Z',
    updated_at: '2020-10-12T20:27:48.665Z',
    deleted_at: null
  }
];
```

**_Status Code:_** 200

<br>

## Producers

`Producers` folder contains all producer related APIs. For authentication some of these apis require `JWT` token.

### 1. Create Producer

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/producers
```

**_Body:_**

```js
{
    "cpf": "51770485267",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create Producer: Invalid

**_Body:_**

```js
{
    "cpf": "invalid",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii"
}
```

##### I. Example Response: Create Producer: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"cpf\" with value \"invalid\" fails to match the required pattern: /^[0-9]+$/. \"cpf\" length must be 11 characters long",
    "validation": {
        "source": "body",
        "keys": [
            "cpf",
            "cpf"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Create Producer: Error

**_Body:_**

```js
{
    "cpf": "51770485267",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii"
}
```

##### II. Example Response: Create Producer: Error

```js
{
    "message": "Error Creating Producer"
}
```

**_Status Code:_** 500

<br>

##### III. Example Request: Create Producer: Success

**_Body:_**

```js
{
    "cpf": "51770485267",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii"
}
```

##### III. Example Response: Create Producer: Success

```js
{
    "id": 21,
    "cpf": "51770485267",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii",
    "ie": "No ie provided",
    "im": "No im provided",
    "hash": "W89m8w",
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T18:17:19.204Z",
    "updated_at": "2020-10-12T18:17:19.204Z"
}
```

**_Status Code:_** 201

<br>

##### IV. Example Request: Create Producer: Unauthorized

**_Body:_**

```js
{
    "cpf": "51770485267",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii"
}
```

##### IV. Example Response: Create Producer: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### V. Example Request: Create Producer: Unauthenticated

**_Body:_**

```js
{
    "cpf": "51770485267",
    "cnpj": "28949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii"
}
```

##### V. Example Response: Create Producer: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

### 2. Delete Producer

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/producers/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_More example Requests/Responses:_**

##### I. Example Request: Delete Producer: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### I. Example Response: Delete Producer: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Delete Producer: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Producer ID |

##### II. Example Response: Delete Producer: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Delete Producer: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### III. Example Response: Delete Producer: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### IV. Example Request: Delete Producer: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_Status Code:_** 200

<br>

##### V. Example Request: Delete Producer: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Producer ID |

##### V. Example Response: Delete Producer: Not Found

```js
{
    "message": "Error Removing Producer"
}
```

**_Status Code:_** 500

<br>

### 3. Producer by ID

Search producer by `id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producers/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_More example Requests/Responses:_**

##### I. Example Request: Producer by ID: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Producer ID |

##### I. Example Response: Producer by ID: Not Found

```js
{
    "message": "Producer not found"
}
```

**_Status Code:_** 404

<br>

##### II. Example Request: Producer by ID: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Producer ID |

##### II. Example Response: Producer by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Producer by ID: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### III. Example Response: Producer by ID: Success

```js
{
    "id": 1,
    "cpf": "55770485267",
    "cnpj": "58949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii",
    "ie": "44864122407",
    "im": "38848818893",
    "hash": "OJXBx0",
    "mod": "teverett@msn.com",
    "created_at": "2020-10-12T17:11:48.916Z",
    "updated_at": "2020-10-12T17:11:48.916Z"
}
```

**_Status Code:_** 200

<br>

### 4. Search Producers

Search producers by `name` or `hash`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producers
```

**_Query params:_**

| Key  | Value | Description   |
| ---- | ----- | ------------- |
| name | ra    | Producer name |
| hash | 7     | Producer hash |

**_More example Requests/Responses:_**

##### I. Example Request: Search Producers: Search Params

**_Query:_**

| Key  | Value | Description   |
| ---- | ----- | ------------- |
| name | ra    | Producer name |
| hash | 7     | Producer hash |

##### I. Example Response: Search Producers: Search Params

```js
[
  {
    id: 3,
    cpf: '38974781506',
    cnpj: '35464159252107',
    name: 'Strat Security',
    whatsapp: '5595959593088',
    address: '45858473, St. Wkwogsam, Raleigh, North Carolina',
    ie: '17776956765',
    im: '96235711237',
    hash: 'd7QPx4',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T17:11:48.916Z',
    updated_at: '2020-10-12T17:11:48.916Z'
  },
  {
    id: 11,
    cpf: '38893571718',
    cnpj: '79933330101190',
    name: 'Bravura Inc',
    whatsapp: '5595952820251',
    address: '73806699, St. Tczmetye, Durham, North Carolina',
    ie: '39920322917',
    im: '80547195480',
    hash: 'R7qjJE',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T17:11:48.916Z',
    updated_at: '2020-10-12T17:11:48.916Z'
  }
];
```

**_Status Code:_** 200

<br>

##### II. Example Request: Search Producers: Pagination Params

**_Query:_**

| Key       | Value | Description     |
| --------- | ----- | --------------- |
| sort      | hash  | Sort items by   |
| direction | desc  | Sorting order   |
| page      | 0     | Page number     |
| pagesize  | 3     | Items on a page |

##### II. Example Response: Search Producers: Pagination Params

```js
[
  {
    id: 12,
    cpf: '40596387711',
    cnpj: '19262900902370',
    name: 'Bonefete Fun',
    whatsapp: '5595953275899',
    address: '57508398, St. Tzlmnzyd, Lincoln, Nebraska',
    ie: '33929541670',
    im: '02770378666',
    hash: 'z82WxZ',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T17:11:48.916Z',
    updated_at: '2020-10-12T17:11:48.916Z'
  },
  {
    id: 8,
    cpf: '60765009646',
    cnpj: '82976584538295',
    name: 'Sanguine Skincare',
    whatsapp: '5595952768184',
    address: '68932792, St. Fforktfw, Seattle, Washington',
    ie: '59029973536',
    im: '81424199717',
    hash: 'z7peJM',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T17:11:48.916Z',
    updated_at: '2020-10-12T17:11:48.916Z'
  },
  {
    id: 16,
    cpf: '02722506915',
    cnpj: '20223805285527',
    name: 'Quad Goals',
    whatsapp: '5595954817265',
    address: '15282542, St. Pppdrbgm, Minneapolis, Minnesota',
    ie: '60722342250',
    im: '87666412212',
    hash: 'Y8ZYJb',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T17:11:48.916Z',
    updated_at: '2020-10-12T17:11:48.916Z'
  }
];
```

**_Status Code:_** 200

<br>

##### III. Example Request: Search Producers: Invalid

**_Query:_**

| Key  | Value   | Description   |
| ---- | ------- | ------------- |
| name | ra      | Producer name |
| hash | invalid | Producer hash |

##### III. Example Response: Search Producers: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"hash\" length must be less than or equal to 6 characters long",
    "validation": {
        "source": "query",
        "keys": [
            "hash"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: Search Producers: Empty Page

**_Query:_**

| Key  | Value | Description   |
| ---- | ----- | ------------- |
| name | ra    | Producer name |
| hash | 7     | Producer hash |
| page | 1     | Page number   |

##### IV. Example Response: Search Producers: Empty Page

```js
[];
```

**_Status Code:_** 200

<br>

### 5. Update Producer

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{url}}/producers/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_Body:_**

```js
{
    "name": "Marília Fenícia",
    "whatsapp": "5595956389977",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update Producer: Invalid

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_Body:_**

```js
{
    "name": "Marília Fenícia",
    "whatsapp": "invalid",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii"
}
```

##### I. Example Response: Update Producer: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"whatsapp\" with value \"invalid\" fails to match the required pattern: /^[0-9]+$/",
    "validation": {
        "source": "body",
        "keys": [
            "whatsapp"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Update Producer: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_Body:_**

```js
{
    "name": "Marília Fenícia",
    "whatsapp": "5595956389977",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii"
}
```

##### II. Example Response: Update Producer: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### III. Example Request: Update Producer: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_Body:_**

```js
{
    "name": "Marília Fenícia",
    "whatsapp": "5595956389977",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii"
}
```

##### III. Example Response: Update Producer: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Update Producer: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Producer ID |

**_Body:_**

```js
{
    "name": "Marília Fenícia",
    "whatsapp": "5595956389977",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii"
}
```

##### IV. Example Response: Update Producer: Not Found

```js
{
    "message": "Error Updating Producer"
}
```

**_Status Code:_** 500

<br>

##### V. Example Request: Update Producer: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_Body:_**

```js
{
    "name": "Marília Fenícia",
    "whatsapp": "5595956389977",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii"
}
```

##### V. Example Response: Update Producer: Success

```js
{
    "id": 1,
    "cpf": "55770485267",
    "cnpj": "58949864147992",
    "name": "Marília Fenícia",
    "whatsapp": "5595956389977",
    "address": "27179787, St. Hkdlpoii, Honolulu, Hawaii",
    "ie": "44864122407",
    "im": "38848818893",
    "hash": "OJXBx0",
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T17:11:48.916Z",
    "updated_at": "2020-10-12T18:19:48.706Z"
}
```

**_Status Code:_** 200

<br>

## Producers History

`Producers History` folder contains all producers history related APIs. For authentication all of these apis require `JWT` token.

### 1. Producers History by ID

Search producer history by `id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producersHistory/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_More example Requests/Responses:_**

##### I. Example Request: Producers History by ID: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Producer ID |

##### I. Example Response: Producers History by ID: Not Found

```js
{
    "message": "Producer not found"
}
```

**_Status Code:_** 404

<br>

##### II. Example Request: Producers History by ID: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Producer ID |

##### II. Example Response: Producers History by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Producers History by ID: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### III. Example Response: Producers History by ID: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### IV. Example Request: Producers History by ID: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### IV. Example Response: Producers History by ID: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### V. Example Request: Producers History by ID: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### V. Example Response: Producers History by ID: Success

```js
{
    "id": 1,
    "producer_id": 1,
    "cpf": "55770485267",
    "cnpj": "58949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii",
    "ie": "44864122407",
    "im": "38848818893",
    "hash": "OJXBx0",
    "mod": "teverett@msn.com",
    "created_at": "2020-10-12T20:27:48.273Z",
    "updated_at": "2020-10-12T20:27:48.273Z",
    "deleted_at": null
}
```

**_Status Code:_** 200

<br>

### 2. Restore Producer History

**_Endpoint:_**

```bash
Method: POST
Type:
URL: {{url}}/producersHistory/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

**_More example Requests/Responses:_**

##### I. Example Request: Restore Producer History: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### I. Example Response: Restore Producer History: Success

```js
{
    "id": 1,
    "cpf": "55770485267",
    "cnpj": "58949864147992",
    "name": "Eco Focus",
    "whatsapp": "5595956384129",
    "address": "27179787, St. Gkznepnw, Honolulu, Hawaii",
    "ie": "44864122407",
    "im": "38848818893",
    "hash": "OJXBx0",
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T20:27:48.273Z",
    "updated_at": "2020-10-12T21:04:05.525Z"
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Restore Producer History: Error

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Producer ID |

##### II. Example Response: Restore Producer History: Error

```js
{
    "message": "Error on Restoring Producer"
}
```

**_Status Code:_** 500

<br>

##### III. Example Request: Restore Producer History: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### III. Example Response: Restore Producer History: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Restore Producer History: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Producer ID |

##### IV. Example Response: Restore Producer History: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### V. Example Request: Restore Producer History: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Producer ID |

##### V. Example Response: Restore Producer History: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

### 3. Search Producers History

Search producers history by `producer_id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/producersHistory
```

**_Query params:_**

| Key         | Value | Description   |
| ----------- | ----- | ------------- |
| producer_id | 1     | Producer ID   |
| direction   | desc  | Sorting order |

**_More example Requests/Responses:_**

##### I. Example Request: Search Producers History: Pagination Params

**_Query:_**

| Key       | Value | Description     |
| --------- | ----- | --------------- |
| sort      | id    | Sort items by   |
| direction | desc  | Sorting order   |
| page      | 0     | Page number     |
| pagesize  | 2     | Items on a page |

##### I. Example Response: Search Producers History: Pagination Params

```js
[
  {
    id: 60,
    producer_id: 20,
    cpf: '88770452070',
    cnpj: '68893557966613',
    name: 'Lambent Illumination',
    whatsapp: '5595956626327',
    address: '19546512, St. Pvloqgen, Virginia Beach, Virginia',
    ie: '13902142292',
    im: '45809714080',
    hash: 'aJEwxp',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.273Z',
    updated_at: '2020-10-12T20:27:48.273Z',
    deleted_at: null
  },
  {
    id: 59,
    producer_id: 20,
    cpf: '88770452070',
    cnpj: '68893557966613',
    name: 'Lambent Illumination',
    whatsapp: '5595956626327',
    address: '19546512, St. Pvloqgen, Virginia Beach, Virginia',
    ie: '13902142292',
    im: '45809714080',
    hash: 'aJEwxp',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.273Z',
    updated_at: '2020-10-12T20:27:48.273Z',
    deleted_at: null
  }
];
```

**_Status Code:_** 200

<br>

##### II. Example Request: Search Producers History: Invalid

**_Query:_**

| Key         | Value   | Description |
| ----------- | ------- | ----------- |
| producer_id | invalid | Producer ID |

##### II. Example Response: Search Producers History: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"producer_id\" must be a number",
    "validation": {
        "source": "query",
        "keys": [
            "producer_id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Search Producers History: Unauthenticated

**_Query:_**

| Key         | Value | Description   |
| ----------- | ----- | ------------- |
| producer_id | 1     | Producer ID   |
| direction   | desc  | Sorting order |

##### III. Example Response: Search Producers History: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Search Producers History: Unauthorized

**_Query:_**

| Key         | Value | Description   |
| ----------- | ----- | ------------- |
| producer_id | 1     | Producer ID   |
| direction   | desc  | Sorting order |

##### IV. Example Response: Search Producers History: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### V. Example Request: Search Producers History: Search Params

**_Query:_**

| Key         | Value | Description |
| ----------- | ----- | ----------- |
| producer_id | 1     | Producer ID |

##### V. Example Response: Search Producers History: Search Params

```js
[
  {
    id: 1,
    producer_id: 1,
    cpf: '55770485267',
    cnpj: '58949864147992',
    name: 'Eco Focus',
    whatsapp: '5595956384129',
    address: '27179787, St. Gkznepnw, Honolulu, Hawaii',
    ie: '44864122407',
    im: '38848818893',
    hash: 'OJXBx0',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.273Z',
    updated_at: '2020-10-12T20:27:48.273Z',
    deleted_at: null
  },
  {
    id: 2,
    producer_id: 1,
    cpf: '55770485267',
    cnpj: '58949864147992',
    name: 'Eco Focus',
    whatsapp: '5595956384129',
    address: '27179787, St. Gkznepnw, Honolulu, Hawaii',
    ie: '44864122407',
    im: '38848818893',
    hash: 'OJXBx0',
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.273Z',
    updated_at: '2020-10-12T20:27:48.273Z',
    deleted_at: null
  },
  {
    id: 3,
    producer_id: 1,
    cpf: '55770485267',
    cnpj: '58949864147992',
    name: 'Eco Focus',
    whatsapp: '5595956384129',
    address: '27179787, St. Gkznepnw, Honolulu, Hawaii',
    ie: '44864122407',
    im: '38848818893',
    hash: 'OJXBx0',
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.273Z',
    updated_at: '2020-10-12T20:27:48.273Z',
    deleted_at: null
  }
];
```

**_Status Code:_** 200

<br>

## Products

`Products` folder contains all product related APIs. For authentication some of these apis require `JWT` token.

### 1. Create Product

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/products
```

**_Body:_**

```js
{
    "ncm": "00000001",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Create Product: Unauthenticated

**_Body:_**

```js
{
    "ncm": "00000001",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false
}
```

##### I. Example Response: Create Product: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Create Product: Error

**_Body:_**

```js
{
    "ncm": "00000001",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false
}
```

##### II. Example Response: Create Product: Error

```js
{
    "message": "Error Creating Product"
}
```

**_Status Code:_** 500

<br>

##### III. Example Request: Create Product: Unauthorized

**_Body:_**

```js
{
    "ncm": "00000001",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false
}
```

##### III. Example Response: Create Product: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### IV. Example Request: Create Product: Invalid

**_Body:_**

```js
{
    "ncm": "invalid",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false
}
```

##### IV. Example Response: Create Product: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"ncm\" with value \"invalid\" fails to match the required pattern: /^[0-9]+$/",
    "validation": {
        "source": "body",
        "keys": [
            "ncm"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### V. Example Request: Create Product: Success

**_Body:_**

```js
{
    "ncm": "00000001",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false
}
```

##### V. Example Response: Create Product: Success

```js
{
    "id": 21,
    "ncm": "00000001",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false,
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T19:02:56.997Z",
    "updated_at": "2020-10-12T19:02:56.997Z"
}
```

**_Status Code:_** 201

<br>

### 2. Delete Product

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/products/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_More example Requests/Responses:_**

##### I. Example Request: Delete Product: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Product ID  |

##### I. Example Response: Delete Product: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Delete Product: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### II. Example Response: Delete Product: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### III. Example Request: Delete Product: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Status Code:_** 200

<br>

##### IV. Example Request: Delete Product: Error

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### IV. Example Response: Delete Product: Error

```js
{
    "message": "Error Removing Product"
}
```

**_Status Code:_** 500

<br>

##### V. Example Request: Delete Product: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### V. Example Response: Delete Product: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

### 3. Product Picture

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/products/:id/picture
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_More example Requests/Responses:_**

##### I. Example Request: Product Picture: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

**_Status Code:_** 404

<br>

##### II. Example Request: Product Picture: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Product ID  |

##### II. Example Response: Product Picture: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

### 4. Product by ID

Search product by `id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/products/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_More example Requests/Responses:_**

##### I. Example Request: Product by ID: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### I. Example Response: Product by ID: Success

```js
{
    "id": 1,
    "ncm": "02032100",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false,
    "mod": "mbrown@msn.com",
    "created_at": "2020-10-12T18:59:08.963Z",
    "updated_at": "2020-10-12T18:59:08.963Z"
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Product by ID: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Product ID  |

##### II. Example Response: Product by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Product by ID: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

##### III. Example Response: Product by ID: Not Found

```js
{
    "message": "Product not found"
}
```

**_Status Code:_** 404

<br>

### 5. Search Products

Search products by `description` or `ncm`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/products
```

**_Query params:_**

| Key         | Value     | Description         |
| ----------- | --------- | ------------------- |
| description | congelada | Product Description |
| ncm         | 203       | Product NCM         |

**_More example Requests/Responses:_**

##### I. Example Request: Search Products: Search Params

**_Query:_**

| Key         | Value     | Description         |
| ----------- | --------- | ------------------- |
| description | congelada | Product Description |
| ncm         | 203       | Product NCM         |

##### I. Example Response: Search Products: Search Params

```js
[
  {
    id: 1,
    ncm: '02032100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T17:11:48.954Z',
    updated_at: '2020-10-12T17:11:48.954Z'
  },
  {
    id: 3,
    ncm: '02032900',
    measure: 'KG',
    description: 'OUTRAS CARNES DE SUÍNO,CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T17:11:48.954Z',
    updated_at: '2020-10-12T17:11:48.954Z'
  }
];
```

**_Status Code:_** 200

<br>

##### II. Example Request: Search Products: Invalid

**_Query:_**

| Key         | Value     | Description         |
| ----------- | --------- | ------------------- |
| description | congelada | Product Description |
| ncm         | invalid   | Product NCM         |

##### II. Example Response: Search Products: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"ncm\" with value \"invalid\" fails to match the required pattern: /^[0-9]+$/",
    "validation": {
        "source": "query",
        "keys": [
            "ncm"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Search Products: Empty Page

**_Query:_**

| Key         | Value     | Description         |
| ----------- | --------- | ------------------- |
| description | geladeira | Product Description |
| ncm         | 203       | Product NCM         |

##### III. Example Response: Search Products: Empty Page

```js
[];
```

**_Status Code:_** 200

<br>

##### IV. Example Request: Search Products: Pagination Params

**_Query:_**

| Key       | Value       | Description     |
| --------- | ----------- | --------------- |
| sort      | description | Sort items by   |
| direction | asc         | Sorting order   |
| page      | 0           | Page number     |
| pagesize  | 2           | Items on a page |

##### IV. Example Response: Search Products: Pagination Params

```js
[
  {
    id: 4,
    ncm: '02041000',
    measure: 'KG',
    description: 'CARCS.E MEIAS-CARCS D/CORDEIRO,FRESC.,REFR.',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T17:11:48.954Z',
    updated_at: '2020-10-12T17:11:48.954Z'
  },
  {
    id: 8,
    ncm: '02043000',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE CORDEIRO,CONG.',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T17:11:48.954Z',
    updated_at: '2020-10-12T17:11:48.954Z'
  }
];
```

**_Status Code:_** 200

<br>

### 6. Update Product

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: {{url}}/products/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

```js
{
  "ncm": "02032110",
  "measure": "PCT",
  "description": "CARCAÇAS E MEIAS-CARCAÇAS DE SUÍNOS, CONGELADAS",
  "is_organic": true
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Update Product: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

```js
{
  "ncm": "02032110",
  "measure": "PCT",
  "description": "CARCAÇAS E MEIAS-CARCAÇAS DE SUÍNOS, CONGELADAS",
  "is_organic": true
}
```

##### I. Example Response: Update Product: Success

```js
{
    "id": 1,
    "ncm": "02032110",
    "measure": "PCT",
    "description": "CARCAÇAS E MEIAS-CARCAÇAS DE SUÍNOS, CONGELADAS",
    "is_organic": true,
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T18:59:08.963Z",
    "updated_at": "2020-10-12T19:25:08.099Z"
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Update Product: Error

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

**_Body:_**

```js
{
  "ncm": "02032110",
  "measure": "PCT",
  "description": "CARCAÇAS E MEIAS-CARCAÇAS DE SUÍNOS, CONGELADAS",
  "is_organic": true
}
```

##### II. Example Response: Update Product: Error

```js
{
    "message": "Error Updating Product"
}
```

**_Status Code:_** 500

<br>

##### III. Example Request: Update Product: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

```js
{
  "ncm": "02032110",
  "measure": "PCT",
  "description": "CARCAÇAS E MEIAS-CARCAÇAS DE SUÍNOS, CONGELADAS",
  "is_organic": true
}
```

##### III. Example Response: Update Product: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Update Product: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

```js
{
  "ncm": "02032110",
  "measure": "PCT",
  "description": "CARCAÇAS E MEIAS-CARCAÇAS DE SUÍNOS, CONGELADAS",
  "is_organic": true
}
```

##### IV. Example Response: Update Product: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

### 7. Upload Product Picture

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{url}}/products/:id/picture
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

**_More example Requests/Responses:_**

##### I. Example Request: Upload Product Picture: Invalid File

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### I. Example Response: Upload Product Picture: Invalid File

```js
{
    "message": "Can not upload that"
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: Upload Product Picture: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### II. Example Response: Upload Product Picture: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### III. Example Request: Upload Product Picture: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

**_Status Code:_** 200

<br>

##### IV. Example Request: Upload Product Picture: Error

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### IV. Example Response: Upload Product Picture: Error

```js
{
    "message": "Error on Uploading Picture"
}
```

**_Status Code:_** 500

<br>

##### V. Example Request: Upload Product Picture: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_Body:_**

| Key     | Value | Description |
| ------- | ----- | ----------- |
| picture |       |             |

##### V. Example Response: Upload Product Picture: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

## Products History

`Products History` folder contains all products history related APIs. For authentication all of these apis require `JWT` token.

### 1. Product History Picture

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/productsHistory/:id/picture
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_More example Requests/Responses:_**

##### I. Example Request: Product History Picture: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### I. Example Response: Product History Picture: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Product History Picture: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

**_Status Code:_** 404

<br>

##### III. Example Request: Product History Picture: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### III. Example Response: Product History Picture: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### IV. Example Request: Product History Picture: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Product ID  |

##### IV. Example Response: Product History Picture: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

### 2. Product History by ID

Search product history by `id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/productsHistory/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_More example Requests/Responses:_**

##### I. Example Request: Product History by ID: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### I. Example Response: Product History by ID: Success

```js
{
    "id": 1,
    "product_id": 1,
    "ncm": "02032100",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false,
    "mod": "teverett@msn.com",
    "created_at": "2020-10-12T20:27:48.423Z",
    "updated_at": "2020-10-12T20:27:48.423Z",
    "deleted_at": null
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Product History by ID: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### II. Example Response: Product History by ID: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### III. Example Request: Product History by ID: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Product ID  |

##### III. Example Response: Product History by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: Product History by ID: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

##### IV. Example Response: Product History by ID: Not Found

```js
{
    "message": "Product not found"
}
```

**_Status Code:_** 404

<br>

##### V. Example Request: Product History by ID: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### V. Example Response: Product History by ID: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

### 3. Restore Product History

**_Endpoint:_**

```bash
Method: POST
Type:
URL: {{url}}/productsHistory/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

**_More example Requests/Responses:_**

##### I. Example Request: Restore Product History: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### I. Example Response: Restore Product History: Success

```js
{
    "id": 1,
    "ncm": "02032100",
    "measure": "KG",
    "description": "CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS",
    "is_organic": false,
    "mod": "manyymoore@gmail.com",
    "created_at": "2020-10-12T20:27:48.423Z",
    "updated_at": "2020-10-12T21:19:39.353Z"
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: Restore Product History: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | Product ID  |

##### II. Example Response: Restore Product History: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: Restore Product History: Error

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | Product ID  |

##### III. Example Response: Restore Product History: Error

```js
{
    "message": "Error on Restoring Product"
}
```

**_Status Code:_** 500

<br>

##### IV. Example Request: Restore Product History: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### IV. Example Response: Restore Product History: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### V. Example Request: Restore Product History: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 1     | Product ID  |

##### V. Example Response: Restore Product History: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

### 4. Search Products History

Search products history by `product_id`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/productsHistory
```

**_Query params:_**

| Key        | Value | Description   |
| ---------- | ----- | ------------- |
| product_id | 1     | Product ID    |
| direction  | desc  | Sorting order |

**_More example Requests/Responses:_**

##### I. Example Request: Search Products History: Unauthorized

**_Query:_**

| Key        | Value | Description   |
| ---------- | ----- | ------------- |
| product_id | 1     | Product ID    |
| direction  | desc  | Sorting order |

##### I. Example Response: Search Products History: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### II. Example Request: Search Products History: Pagination Params

**_Query:_**

| Key       | Value | Description     |
| --------- | ----- | --------------- |
| sort      | id    | Sort items by   |
| direction | desc  | Sorting order   |
| page      | 0     | Page number     |
| pagesize  | 3     | Items on a page |

##### II. Example Response: Search Products History: Pagination Params

```js
[
  {
    id: 40,
    product_id: 20,
    ncm: '02064100',
    measure: 'KG',
    description: 'FÍGADOS DE SUÍNOS, CONGELADOS',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.423Z',
    updated_at: '2020-10-12T20:27:48.423Z',
    deleted_at: null
  },
  {
    id: 39,
    product_id: 20,
    ncm: '02064100',
    measure: 'KG',
    description: 'FÍGADOS DE SUÍNOS, CONGELADOS',
    is_organic: false,
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.423Z',
    updated_at: '2020-10-12T20:27:48.423Z',
    deleted_at: null
  },
  {
    id: 38,
    product_id: 19,
    ncm: '02063000',
    measure: 'KG',
    description: 'MIUDEZAS DA ESPÉCIE SUÍNA FRESCAS OU REFR.',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.423Z',
    updated_at: '2020-10-12T20:27:48.423Z',
    deleted_at: null
  }
];
```

**_Status Code:_** 200

<br>

##### III. Example Request: Search Products History: Unauthenticated

**_Query:_**

| Key        | Value | Description   |
| ---------- | ----- | ------------- |
| product_id | 1     | Product ID    |
| direction  | desc  | Sorting order |

##### III. Example Response: Search Products History: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Search Products History: Invalid

**_Query:_**

| Key        | Value   | Description |
| ---------- | ------- | ----------- |
| product_id | invalid | Product ID  |

##### IV. Example Response: Search Products History: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"product_id\" must be a number",
    "validation": {
        "source": "query",
        "keys": [
            "product_id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### V. Example Request: Search Products History: Search Params

**_Query:_**

| Key        | Value | Description |
| ---------- | ----- | ----------- |
| product_id | 1     | Product ID  |

##### V. Example Response: Search Products History: Search Params

```js
[
  {
    id: 1,
    product_id: 1,
    ncm: '02032100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    mod: 'teverett@msn.com',
    created_at: '2020-10-12T20:27:48.423Z',
    updated_at: '2020-10-12T20:27:48.423Z',
    deleted_at: null
  },
  {
    id: 2,
    product_id: 1,
    ncm: '02032100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com',
    created_at: '2020-10-12T20:27:48.423Z',
    updated_at: '2020-10-12T20:27:48.423Z',
    deleted_at: null
  }
];
```

**_Status Code:_** 200

<br>

## Users

`Users` folder contains all user related APIs. For authentication all of these apis require `JWT` token.

### 1. Delete User

Delete current user.

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{url}}/me
```

**_More example Requests/Responses:_**

##### I. Example Request: Delete User: Unauthenticated

##### I. Example Response: Delete User: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Delete User: Success

##### II. Example Response: Delete User: Success

```js
{
    "id": 1,
    "name": "Edmundo",
    "email": "manyymoore@gmail.com",
    "picture": "https://s.gravatar.com/avatar/21dbdea01fcce17bbd75a73f51d13aaf?s=96&d=retro",
    "privilege": 2,
    "created_at": "2020-10-09T12:53:55.408Z",
    "updated_at": "2020-10-09T12:53:55.408Z"
}
```

**_Status Code:_** 200

<br>

### 2. Login User Google

This api use `Google OAuth` (_only the **id_token** from Google Login_) to retrieve user data and returns `JWT` token.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{url}}/users
```

**_Body:_**

```js
{
    "token_id": "{{googleTokenId}}"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: Login User (Google): Success

**_Body:_**

```js
{
    "token_id": "{{googleTokenId}}"
}

```

##### I. Example Response: Login User (Google): Success

```js
{
    "user": {
        "id": 22,
        "name": "Edmundo Paulino",
        "email": "manyymoore@gmail.com",
        "picture": "https://lh3.googleusercontent.com/a-/AOh14Gh4dws84ywih5Z24ByoWoa3cHAMFNPrrbCqV6NuwA=s96-c",
        "privilege": 0,
        "created_at": "2020-10-09T13:59:05.571Z",
        "updated_at": "2020-10-09T13:59:05.571Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTYwMjI1MTk0NX0.rrnr4-b2YGtNDsrIlopxE9AoxF19oIuZOQSnzH1UDSA"
}
```

**_Status Code:_** 201

<br>

##### II. Example Request: Login User (Google): Invalid Google Token

**_Body:_**

```js
{
    "token_id": "{{googleTokenId}}"
}

```

##### II. Example Response: Login User (Google): Invalid Google Token

```js
{
    "message": "Error on token validation"
}
```

**_Status Code:_** 400

<br>

### 3. Search Users

Search users by `name` or `email`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/users
```

**_Query params:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| name  | a     | User name   |
| email | e.com | User email  |

**_More example Requests/Responses:_**

##### I. Example Request: Search Users: Search Params

**_Query:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| name  | a     | User name   |
| email | e.com | User email  |

##### I. Example Response: Search Users: Search Params

```js
[
  {
    id: 5,
    name: 'Damas',
    email: 'mbswan@me.com',
    picture:
      'https://s.gravatar.com/avatar/0fe88c8fb067972b303a8dd61f8dc5ce?s=96&d=retro',
    privilege: 0,
    created_at: '2020-10-12T17:11:48.903Z',
    updated_at: '2020-10-12T17:11:48.903Z'
  },
  {
    id: 11,
    name: 'Vieira',
    email: 'greear@live.com',
    picture:
      'https://s.gravatar.com/avatar/23067fff8b777dd7eb7f6fd7536b0704?s=96&d=retro',
    privilege: 0,
    created_at: '2020-10-12T17:11:48.903Z',
    updated_at: '2020-10-12T17:11:48.903Z'
  },
  {
    id: 19,
    name: 'Halliday',
    email: 'parrt@live.com',
    picture:
      'https://s.gravatar.com/avatar/8d9f400fbdf2d2e4bade91f23ceebd8b?s=96&d=retro',
    privilege: 0,
    created_at: '2020-10-12T17:11:48.903Z',
    updated_at: '2020-10-12T17:11:48.903Z'
  }
];
```

**_Status Code:_** 200

<br>

##### II. Example Request: Search Users: Unauthorized

##### II. Example Response: Search Users: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### III. Example Request: Search Users: Unauthenticated

##### III. Example Response: Search Users: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### IV. Example Request: Search Users: Pagination Params

**_Query:_**

| Key       | Value | Description     |
| --------- | ----- | --------------- |
| sort      | id    | Sort items by   |
| direction | asc   | Sorting order   |
| page      | 0     | Page number     |
| pagesize  | 3     | Items on a page |

##### IV. Example Response: Search Users: Pagination Params

```js
[
  {
    id: 1,
    name: 'Edmundo Paulino',
    email: 'manyymoore@gmail.com',
    picture:
      'https://lh3.googleusercontent.com/a-/AOh14Gh4dws84ywih5Z24ByoWoa3cHAMFNPrrbCqV6NuwA=s96-c',
    privilege: 2,
    created_at: '2020-10-12T17:11:48.903Z',
    updated_at: '2020-10-12T17:12:04.695Z'
  },
  {
    id: 2,
    name: 'James',
    email: 'mbrown@msn.com',
    picture:
      'https://s.gravatar.com/avatar/9418cf81ace4c8a471af4172001cc958?s=96&d=retro',
    privilege: 0,
    created_at: '2020-10-12T17:11:48.903Z',
    updated_at: '2020-10-12T17:42:31.415Z'
  },
  {
    id: 3,
    name: 'Stewart',
    email: 'heckerman@aol.com',
    picture: null,
    privilege: 0,
    created_at: '2020-10-12T17:11:48.903Z',
    updated_at: '2020-10-12T17:11:48.903Z'
  }
];
```

**_Status Code:_** 200

<br>

##### V. Example Request: Search Users: Empty Page

**_Query:_**

| Key  | Value | Description |
| ---- | ----- | ----------- |
| page | 1     | Page number |

##### V. Example Response: Search Users: Empty Page

```js
[];
```

**_Status Code:_** 200

<br>

### 4. Set User Privilege

Set the user privilege to `admin` or `mod`.

**_Endpoint:_**

```bash
Method: PATCH
Type:
URL: {{url}}/users/:id/set/:privilege
```

**_URL variables:_**

| Key       | Value | Description    |
| --------- | ----- | -------------- |
| id        | 2     | User ID        |
| privilege | mod   | User privilege |

**_More example Requests/Responses:_**

##### I. Example Request: Set User Privilege: Unauthenticated

**_Query:_**

| Key       | Value | Description    |
| --------- | ----- | -------------- |
| id        | 2     | User ID        |
| privilege | mod   | User privilege |

##### I. Example Response: Set User Privilege: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: Set User Privilege: Success

**_Query:_**

| Key       | Value | Description    |
| --------- | ----- | -------------- |
| id        | 2     | User ID        |
| privilege | mod   | User privilege |

**_Status Code:_** 200

<br>

##### III. Example Request: Set User Privilege: Invalid

**_Query:_**

| Key       | Value   | Description    |
| --------- | ------- | -------------- |
| id        | 2       | User ID        |
| privilege | invalid | User privilege |

##### III. Example Response: Set User Privilege: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"privilege\" with value \"invalid\" fails to match the required pattern: /^(mod|admin)$/",
    "validation": {
        "source": "params",
        "keys": [
            "privilege"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: Set User Privilege: Unauthorized

**_Query:_**

| Key       | Value | Description    |
| --------- | ----- | -------------- |
| id        | 2     | User ID        |
| privilege | mod   | User privilege |

##### IV. Example Response: Set User Privilege: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

### 5. Unset User Privilege

Set the user privilege to regular user.

**_Endpoint:_**

```bash
Method: PATCH
Type:
URL: {{url}}/users/:id/unset
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

**_More example Requests/Responses:_**

##### I. Example Request: Unset User Privilege: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

##### I. Example Response: Unset User Privilege: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### II. Example Request: Unset User Privilege: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

**_Status Code:_** 200

<br>

##### III. Example Request: Unset User Privilege: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | User ID     |

##### III. Example Response: Unset User Privilege: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: Unset User Privilege: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

##### IV. Example Response: Unset User Privilege: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

### 6. User Profile

Fetch user profile.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/me
```

**_More example Requests/Responses:_**

##### I. Example Request: User Profile: Unauthenticated

##### I. Example Response: User Profile: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: User Profile: Success

##### II. Example Response: User Profile: Success

```js
{
    "id": 1,
    "name": "Edmundo Paulino",
    "email": "manyymoore@gmail.com",
    "picture": "https://lh3.googleusercontent.com/a-/AOh14Gh4dws84ywih5Z24ByoWoa3cHAMFNPrrbCqV6NuwA=s96-c",
    "privilege": 2,
    "created_at": "2020-10-12T17:11:48.903Z",
    "updated_at": "2020-10-12T17:12:04.695Z"
}
```

**_Status Code:_** 200

<br>

### 7. User by ID

Search users by `ID`.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{url}}/users/:id
```

**_URL variables:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

**_More example Requests/Responses:_**

##### I. Example Request: User by ID: Not Found

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 999   | User ID     |

##### I. Example Response: User by ID: Not Found

```js
{
    "message": "User not found"
}
```

**_Status Code:_** 404

<br>

##### II. Example Request: User by ID: Unauthenticated

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

##### II. Example Response: User by ID: Unauthenticated

```js
{
    "message": "Please Authenticate"
}
```

**_Status Code:_** 401

<br>

##### III. Example Request: User by ID: Invalid

**_Query:_**

| Key | Value   | Description |
| --- | ------- | ----------- |
| id  | invalid | User ID     |

##### III. Example Response: User by ID: Invalid

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "\"id\" must be a number",
    "validation": {
        "source": "params",
        "keys": [
            "id"
        ]
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: User by ID: Unauthorized

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

##### IV. Example Response: User by ID: Unauthorized

```js
{
    "message": "Not enough privilege"
}
```

**_Status Code:_** 403

<br>

##### V. Example Request: User by ID: Success

**_Query:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| id  | 2     | User ID     |

##### V. Example Response: User by ID: Success

```js
{
    "id": 2,
    "name": "James",
    "email": "mbrown@msn.com",
    "picture": "https://s.gravatar.com/avatar/9418cf81ace4c8a471af4172001cc958?s=96&d=retro",
    "privilege": 1,
    "created_at": "2020-10-12T17:11:48.903Z",
    "updated_at": "2020-10-12T17:11:48.903Z"
}
```

**_Status Code:_** 200

<br>

---

[Back to top](#agritoca)
