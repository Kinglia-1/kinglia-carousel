-- need to install first and get credentials

createdb -h localhost -p -U root carousel;

-- add pk, fk, cascades (?)
-- constraints

-- set search_patht to myschme, public; public is default

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
  username VARCHAR(50) NOT NULL UNIQUE,
  user_created_at --not done
);

CREATE TABLE user_lists (
  listId serial PRIMARY KEY,
  listName VARCHAR(50) NOT NULL,
  list_created_at --not done
  userId INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE list_likes (
  likeId serial PRIMARY KEY,
  listId INTEGER NOT NULL REFERENCES user_lists ON DELETE CASCADE,
  placeId INTEGER NOT NULL REFERENCES places ON DELETE CASCADE,
  like_created_at CURRENT_TIMESTAMP
);