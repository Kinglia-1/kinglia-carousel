# API Documentation

## Table of Contents

1. [GET List of Nearby Places](#get-list-of-nearby-places)
1. [GET User Likes](#get-user-likes)
1. [POST Liked Places List](#post-liked-places-list)
1. [PATCH Liked Places List](#patch-liked-places-list)
1. [DELETE Liked Place from List](#delete-liked-place-from-list)

## GET List of Nearby Places

* **Endpoint:** `places/:zip`

* **Path Parameter(s):** `zip` (zip code)

* **Success Status Code:** `200`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "zipcode": "Number"
  }
```

* **Returns:** JSON Object
```
  [
    {
      "placeid": "Number",
      "title": "String",
      "pictureurl": "String",
      "zipcode": "Number",
      "roomtype": "String",
      "numberbeds": "Number",
      "rating": "Number",
      "numberreviews": "Number",
      "hostplus": "Boolean",
      "superhost": "Boolean",
      "price": "Number",
      "placeurl": "String"
    },
    ...
  ]
```

## GET User Likes

* **Endpoint:** `users/:userid`

* **Path Parameter(s):** `userid`

* **Success Status Code:** `200`

* **Failure Status Code:** `400`

* **Returns:** JSON Object
```
  {
    "userid": "Number",
    "likes": [
      {
        "likeid": "Number",
        "listname": "String",
        "placeid": "Number"
      },
      ...
    ]
  }
```

## POST Liked Places List

* **Endpoint:** `users/lists`

* **Success Status Code:** `201`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "userid": "Number",
    "listname": "String",
    "placeid": "Number"
  }
```

## PATCH Liked Places List

* **Endpoint:** `users/lists`

* **Success Status Code:** `204`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "listid": "Number",
    "placeid": "Number"
  }
```

## DELETE Liked Place from List

* **Endpoint:** `users/lists`

* **Success Status Code:** `204`

* **Failure Status Code:** `400`

* **Request Body:** JSON Object
```
  {
    "likeid": "Number"
  }
```