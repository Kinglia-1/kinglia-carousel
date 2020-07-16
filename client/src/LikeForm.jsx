import React, { useEffect, useState, useRef }  from 'react';
import ListForm from './ListForm.jsx';
import SingleList from './SingleList.jsx';
import styles from './styles.css';

const LikeForm = ({
  user,
  listbuttonRender,
  createNewList,
  cancelCreateListButton,
  submitCreateListbutton,
  exitLikeFormClicked,
  likeListOnChange,
  clickedplace,
  listLikeToggle,
  enablesubmitbutton,
  modelOpen,
  outsideModalClick
  }) => {
  let list = [];
  let listOBJ = [];
  let unlist = [];

  for(let i=0;i<user.likes.length;i++){
    //if place is the same as place clicked
    // REFACTORED -- name is placeid here; _id is now placeid
    if(user.likes[i].placeid === clickedplace.placeid){
      // insert item into listOBJ.
      listOBJ.push(user.likes[i])
      // insert list into list array
      // REFACTORED -- list is now listName
      list.push(user.likes[i].listname)
      // REFACTORED -- list is now listName
      if(unlist.indexOf(user.likes[i].listname) >= 0){
        // REFACTORED -- list is now listName
        const index = unlist.indexOf(user.likes[i].listname);
        unlist.splice(index,1);
      }
    // REFACTORED -- list is now listName
    }else if(list.indexOf(user.likes[i].listname) < 0 && unlist.indexOf(user.likes[i].listname) < 0){
        //input it in unlist array
        // REFACTORED -- list is now listName
        unlist.push(user.likes[i].listname);
    }
  }
  for(let i=0;i<unlist.length;i++){
    //create new object for the list that odes not contain place = place clicked
    let temp={
      // REFACTORED -- this is now likeid
      likeid: '',
      // REFACTORED -- this is now placeid
      placeid: '',
      // REFACTORED -- this is now listName
      listname: unlist[i],
      // REFACTORED -- killing concept of t/f
      // like: false
    }
    //input into listOBJ.
    listOBJ.push(temp);
  }
  listOBJ.sort((a,b) => {
    return a.list.localeCompare(b.list) ;
  })

  const modelOpenfunction = () =>{
    if(modelOpen  === true){
      document.body.style.overflow = "hidden";
      return styles.likeformwrapperopen;
    }else{
      document.body.style.overflow = "scroll";
      return styles.likeformwrapperclose;
    }
  }



  return (
    <div className={modelOpenfunction()} id="myModal">
      <div className={styles.popupfirst} onClick={(e)=>outsideModalClick(e)}>
        <div className={styles.popupsecond}>
          <div className = {styles.popupthird} id="modal" >
            <div className={styles.popupx} onClick={()=>exitLikeFormClicked()}>X</div>
            <div className={styles.popupsavetoalist}>
              <h1 className={styles.popupsavetoalisth1}>Save to a list</h1>
            </div>
            <div className={styles.scrollerforlikelist}>
              <div>
                <ListForm
                  listButtonRender={listbuttonRender}
                  createNewList={createNewList}
                  cancelCreateListButton={cancelCreateListButton}
                  submitCreateListbutton={submitCreateListbutton}
                  likeListOnChange = {likeListOnChange}
                  enablesubmitbutton = {enablesubmitbutton}/>
              </div>
              <div>
                {listOBJ.map((singleList, index) => (
                  <SingleList
                    key={index}
                    singleList = {singleList}
                    listLikeToggle = {listLikeToggle}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default LikeForm;
