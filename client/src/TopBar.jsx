import React from 'react';
import styles from './styles.css';


const TopBar = ({page, totalpage, leftArrowClicked, rightArrowClicked}) => (
  <div className={styles.outline} >
    <div className={styles.moreplacetostay}>
      <p className={styles.header}>More Places to stay</p>
    </div>
    <div className={styles.topBarPageContainer}>
      <div className={styles.topBar}>
        {page} / {totalpage}
      </div>
      <div className={styles.topBarLeftButton}>
        <button className={styles.topBarButton} onClick={()=>leftArrowClicked()}>&lt;</button>
      </div>
      <div className={styles.topBarRightButton}>
        <button className={styles.topBarButton} onClick={()=>rightArrowClicked()}>&gt;</button>
      </div>
    </div>



  </div>
)
export default TopBar;