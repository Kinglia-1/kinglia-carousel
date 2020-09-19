import React from 'react';

import Place from './Place.jsx';
import styles from './styles.css';

const Carousel = ({ places, heartClicked, likes }) => (
  <div className={styles.row}>
    <div className={styles.row__inner}>
      <ul className={styles.listul} id="scroller">
        {places.map((place, index) => (
          <Place
            key={index}
            place={place}
            heartClicked={heartClicked}
            likes={likes}
          />
        ))}
      </ul>
    </div>
  </div>
);

export default Carousel;
