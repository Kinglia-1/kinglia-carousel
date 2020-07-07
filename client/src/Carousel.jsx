import React from 'react';
import Place from './Place.jsx';
import styles from './styles.css';
// import ScrollView from './ScrollView.jsx';
// import ScrollElement from './ScrollElement.jsx';

const Carousel = ({places, heartClicked, likeplace}) => (
  <div className={styles.row}>
      <div className={styles.row__inner}>
        <ul className={styles.listul} id="scroller">
          {places.map( (place,index) => (
                <Place
                  key={index}
                  place={place}
                  heartClicked = {heartClicked}
                  likeplace = {likeplace}/>
          ))}
        </ul>
      </div>
  </div>
);

export default Carousel;