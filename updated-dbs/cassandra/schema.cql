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
  PRIMARY KEY (zipCode, placeId)
);

create table likes (
  likeId uuid,
  listId int,
  listName varchar,
  placeId int,
  userId int,
  PRIMARY KEY (listId, likeId)
);