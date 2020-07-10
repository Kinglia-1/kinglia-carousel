-- cqlsh -u 'my_username' -p 'my_password' -f /mydir/myfile.cql

create keyspace if not exists carousel
  with replication = {
    'class': 'SimpleStrategy', 'replication_factor': 1
  };

use carousel;

create table places (
  placeId uuid PRIMARY KEY,
  title varchar NOT NULL,
  pictureUrl varchar NOT NULL,
  zipCode varchar NOT NULL,
  roomType varchar NOT NULL,
  numberBeds smallint NOT NULL,
  rating decimal NOT NULL,
  numberReviews int NOT NULL,
  hostPlus boolean NOT NULL,
  superHost boolean NOT NULL,
  price decimal NOT NULL,
  placeUrl varchar NOT NULL
);

create table likes (
  likeId uuid,
  listId uuid,
  listName varchar,
  placeId uuid,
  userId uuid,
  PRIMARY KEY (likeId,listName)
);