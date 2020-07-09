# API Documentation

## Table of Contents

1. [GET User List](#get-user-list)
1. [POST User Liked Place](#post-user-liked-place)
1. [Patch User Liked Place](#patch-user-liked-place)
1. [Get Place List](#get-place-list)
1. [Delete Place](#delete-place)

## GET User List

Endpoint:
```
/api/users
```

Success Status Code: 200

Failure Status Code: 400

Returns:
> Returns JSON Object as per below
```
  {
    name: String,
    likeplace: [
      {
        name: String,
        list: String,
        like: Boolean
      }
    ]
  }
```


## POST User Liked Place

Endpoint:
```
/api/users
```

Success Status Code: 202

Failure Status Code: 400

Request Body:
> Expects JSON Object as per below

```
  {
    _id: String,
    likeplace: String,
    list: String,
    like: Boolean
  }
```

## PATCH User Liked Place

Endpoint:
```
/api/users/:placeId
```

Path Parameters: `placeId` placeId

Success Status Code: 202

Failure Status Code: 400

Request Body:
> Expects JSON Object as per below

```
  {
    like: Boolean
  }
```

## GET Place List

Endpoint:
```
/api/places
```

Success Status Code: 200

Failure Status Code: 400

Returns:
> Returns JSON Object as per below
```
  {
    picture: String,
    type: String,
    bed: String,
    rating: Number,
    totalReview: Number,
    hostplus: Boolean,
    superhost: Boolean,
    title: String,
    price: Number,
    src: String
  }
```

## DELETE Place

Endpoint:
```
/api/places/:placeId
```

Path Parameters: `placeId` placeId

Success Status Code: 200

Failure Status Code: 400
