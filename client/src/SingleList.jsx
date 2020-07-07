import React from 'react';
import styles from './styles.css';


const SingleList = ({singleList, listLikeToggle}) => {
  let likeRender= () =>{
    if(singleList.like === true){
      return styles.heartYesLikeinlist
    }else{
      return styles.heartNoLikeinlist
    }
  }

  return(
    <div>
      <div className={styles.inbetweenlistdiv}>
        <div className={styles.inbetweenlist}></div>
      </div>
      <div className={styles.containerlikelist}>
        <div>{singleList.list}</div>
        <div>
          <div onClick={(e)=>listLikeToggle(e,singleList)}>
            <div className={styles.heartInList}>
              <svg className={likeRender()} viewBox="0 0 32 29.6">
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default SingleList;