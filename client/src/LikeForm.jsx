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
    if(user.likes[i].placeid === clickedplace.placeid){
      listOBJ.push(user.likes[i]);
      list.push(user.likes[i].listname);
      if(unlist.indexOf(user.likes[i].listname) >= 0){
        const index = unlist.indexOf(user.likes[i].listname);
        unlist.splice(index,1);
      }
    }else if(list.indexOf(user.likes[i].listname) < 0 && unlist.indexOf(user.likes[i].listname) < 0) {
        unlist.push(user.likes[i].listname);
    }
  }
  for(let i=0;i<unlist.length;i++){
    let temp={
      likeid: '',
      listname: unlist[i],
      placeid: ''
    }
    listOBJ.push(temp);
  }
  listOBJ.sort((a,b) => {
    return a.listname.localeCompare(b.listname) ;
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
