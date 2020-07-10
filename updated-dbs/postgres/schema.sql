CREATE DATABASE kinglia;

DROP SCHEMA IF EXISTS carousel CASCADE;

CREATE SCHEMA carousel;

  CREATE TABLE places (
    placeId serial PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    pictureUrl VARCHAR(2083) NOT NULL,
    zipCode VARCHAR(10) NOT NULL,
    roomType VARCHAR(50) NOT NULL,
    numberBeds SMALLINT NOT NULL,
    rating numeric(1,2) NOT NULL,
    numberReviews INTEGER NOT NULL,
    hostPlus BOOLEAN NOT NULL,
    superHost BOOLEAN NOT NULL,
    price numeric(1,2) NOT NULL,
    placeUrl VARCHAR(2083) NOT NULL
  );

  CREATE TABLE users (
    userId serial PRIMARY KEY,
  );

  CREATE TABLE user_lists (
    listId serial PRIMARY KEY,
    listName VARCHAR(50) NOT NULL,
    userId INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
  );

  CREATE TABLE list_likes (
    likeId serial PRIMARY KEY,
    listId INTEGER NOT NULL REFERENCES user_lists ON DELETE CASCADE,
    placeId INTEGER NOT NULL REFERENCES places ON DELETE CASCADE
  );