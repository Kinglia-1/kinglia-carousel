# API Documentation

## Table of Contents

1. [GET List of Nearby Places](#get-list-of-nearby-places)
1. [GET User Lists](#get-user-lists)
1. [POST Liked Places List](#post-liked-places-list)
1. [PATCH Liked Places List](#patch-liked-places-list)
1. [DELETE Liked Place from List](#delete-liked-place-from-list)

## GET List of Nearby Places

* **Endpoint:** `api/places`

* **Success Status Code:** `200`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "zipCode": "Number"
  }
```

* **Returns:** JSON Object
```
  [
    {
      "placeId": "Number",
      "title": "String",
      "pictureUrl": "String",
      "zipCode": "Number",
      "roomType": "String",
      "numberBeds": "Number",
      "rating": "Number",
      "numberReviews": "Number",
      "hostPlus": "Boolean",
      "superHost": "Boolean",
      "price": "Number",
      "placeUrl": "String"
    },
    ...
  ]
```

## GET User Lists

* **Endpoint:** `api/users/:userId`

* **Path Parameter(s):** `userId`

* **Success Status Code:** `200`

* **Failure Status Code:** `400`

* **Returns:** JSON Object
```
  [
    {
      "listId": "Number",
      "listName": "String",
      "places": [
        {
          "placeId": "Number"
        },
        ...
      ]
    },
    ...
  ]
```

## POST Liked Places List

* **Endpoint:** `api/users/:userId`

* **Path Parameter(s):** `userId`

* **Success Status Code:** `201`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "userId": "Number",
    "listName": "String",
    "placeId": "Number"
  }
```

## PATCH Liked Places List

* **Endpoint:** `api/users/:userId`

* **Path Parameter(s):** `userId`

* **Success Status Code:** `204`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "listId": "Number",
    "placeId": "Number"
  }
```

## DELETE Liked Place from List

* **Endpoint:** `api/users/:userId`

* **Path Parameter(s):** `userId`

* **Success Status Code:** `204`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "listId": "Number",
    "placeId": "Number"
  }
```