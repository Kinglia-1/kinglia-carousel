create keyspace if not exists carousel
  with replication = {
    'class': 'SimpleStrategy', 'replication_factor': 1
  };

use carousel;

create table places (
  placeId int,
  title varchar,
  pictureUrl varchar,
  zipCode varchar,
  roomType varchar,
  numberBeds smallint,
  rating decimal,
  numberReviews int,
  hostPlus boolean,
  superHost boolean,
  price decimal,
  placeUrl varchar,
  streetAddress varchar NOT NULL,
  phoneNumber varchar NOT NULL,
  descr varchar,
  internalNotes varchar,
  hostNotes varchar,
  userName varchar NOT NULL,
  firstName varchar NOT NULL,
  lastName varchar NOT NULL,
  email varchar NOT NULL,
  PRIMARY KEY (zipCode, placeId)
);

create table likes (
  likeId uuid,
  listId int NOT NULL,
  listName varchar NOT NULL,
  placeId int NOT NULL,
  userId int NOT NULL,
  userName varchar NOT NULL,
  firstName varchar,
  lastName varchar,
  email varchar,
  PRIMARY KEY (listId, likeId)
);