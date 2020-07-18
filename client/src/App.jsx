import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import TopBar from './TopBar.jsx';
import LikeForm from './LikeForm.jsx';
import styles from './styles.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      places: [],
      totalplaces: [],
      user: {},
      error: null,
      isLoaded: false,
      page: 1,
      listbuttonRender: 'default',
      saveToAListRender: 'false',
      likelistinput: '',
      clickedplace: {},
      enablesubmitbutton: false,
      modelOpen: false
    };

    this.createNewList = this.createNewList.bind(this);
    this.cancelCreateListButton = this.cancelCreateListButton.bind(this);
    this.submitCreateListbutton = this.submitCreateListbutton.bind(this);
    this.leftArrowClicked = this.leftArrowClicked.bind(this);
    this.rightArrowClicked = this.rightArrowClicked.bind(this);
    this.heartClicked = this.heartClicked.bind(this);
    this.exitLikeFormClicked = this.exitLikeFormClicked.bind(this);
    this.likeListOnChange = this.likeListOnChange.bind(this);
    this.listLikeToggle = this.listLikeToggle.bind(this);
    this.outsideModalClick = this.outsideModalClick.bind(this);

    this.address = 'http://localhost:3003'; // formerly 54.215.84.53
    this.userIndex = 1;
    // GK -- Added this
    this.zip = 94110;
  }

  //heart clicked
  heartClicked(place){
    this.setState({
      saveToAListRender: 'true',
      clickedplace: place,
      modelOpen: true
    })
  }

  outsideModalClick(e){
    let modalId = document.getElementById('modal');
    var isClickInside = modalId.contains(e.target);
    if (!isClickInside) {
      this.exitLikeFormClicked();
    }
  }

  //List form button interrupt
  exitLikeFormClicked(){
    this.setState({
      saveToAListRender: 'false',
      clickedplace: {},
      modelOpen: false
    })
  }

  createNewList(){
    this.setState({
      listbuttonRender: 'form'
    })
  }

  likeListOnChange(e){
    e.preventDefault();
    this.setState({
      likelistinput: e.target.value,
      enablesubmitbutton: true
    })
  }

  cancelCreateListButton(){
    this.setState({
      listbuttonRender: 'default'
    })
  }

  submitCreateListbutton(e){
    let obj = {
      // REFACTORED -- userid from _.id
      "userid": this.state.user.userid,
      // REFACTORED -- list to listname for key
      "listname": this.state.likelistinput,
      // REFACTORED -- placeid from _id
      "placeid": this.state.clickedplace.placeid,
      // REFACTORED -- killing this concept of true / false
      // "like": true
    }

    // axios.post(this.serverUserAdd,obj)
    axios.post(`${this.address}/users/lists`, obj)
    .then((res)=>{
      this.setState({
        likelistinput: '',
        listbuttonRender: 'default'
      })
    })
    .catch((e)=>{
      console.log(e);
    })
    // REFACTORED -- not going to pull ALL users' data (changed this.serverUserAdd)
    .then( ()=> axios.get(`${this.address}/users/${this.userIndex}`))
    .then((res) => {
      // REFACTORED -- line below won't be necessary any longer
      // const currentUser = res.data[this.userIndex];
      const currentUser = res.data;
      this.setState({
        user: currentUser
      })
    })
    .catch((e)=>{
      console.log(e);
    })
    e.preventDefault();
  }

  listLikeToggle(e, singleList){

    // if it HAS a likeid
    if(singleList.likeid){
      axios.delete(`${this.address}/users/lists`, {data: {likeid: singleList.likeid}})
      .then((res)=>{
        console.log(res.status);
      })    .catch((e)=>{
        console.log(e);
      })
      // REFACTORED -- not going to pull data for ALL users
      .then( ()=> axios.get(`${this.address}/users/${this.userIndex}`))
      .then((res) => {
        // REFACTORED
        const currentUser = res.data;
        this.setState({
          user: currentUser
        })
      })
      .catch((e)=>{
        console.log(e);
      })
      e.preventDefault();
    }else if(!singleList.likeid){
      let obj = {
        "userid": this.state.user.userid,
        "placeid": this.state.clickedplace.placeid,
        "listname": singleList.listname
      }
      console.log('obj: '+ obj.userid);
      axios.patch(`${this.address}/users/lists`, obj)
      .then((res)=>{
        console.log(res.status);
      })    .catch((e)=>{
        console.log(e);
      })
      // REFACTORED -- no longer pulling ALL users' data
      .then( ()=> axios.get(`${this.address}/users/${this.userIndex}`))
      .then((res) => {
        // REFACTORED
        const currentUser = res.data;
        this.setState({
          user: currentUser
        })
      })
      .catch((e)=>{
        console.log(e);
      })
      e.preventDefault();
    }
  }




  //end of List form button interrupt

  //topbar onclick
  leftArrowClicked(){
    const scroller = document.getElementById('scroller');
    if(this.state.page === 2){
      scroller.scrollLeft = 0;
      this.setState({
        page: 1
      })
    }else if(this.state.page === 3){
      scroller.scrollLeft = 1120;
      this.setState({
        page: 2
      })
    }else if(this.state.page === 1){
      scroller.scrollLeft = 2240;
      this.setState({
        page: 3
      })
    }
  }

  rightArrowClicked(){
    const scroller = document.getElementById('scroller');
    if(this.state.page === 1){
      scroller.scrollLeft = 1120;
      this.setState({
        page: 2
      })
    }else if(this.state.page === 2){
      scroller.scrollLeft = 2240;
      this.setState({
        page: 3
      })
    }else if(this.state.page === 3){
      scroller.scrollLeft = 0;
      this.setState({
        page: 1
      })
    }
  }


  componentDidMount(){
    // REFACTORED -- pulling by zipcode now
    // axios.get(this.serverPlaceAdd)
    axios.get(`${this.address}/places/${this.zip}`)
    .then((res)=>{
      //suppose to do some filtring here?
      const totalplaces = [...res.data].slice(0,12);
      const fourplaces = [...totalplaces].slice(0,4);
      this.setState({
        places: totalplaces,
        totalplaces: totalplaces
      })
    })
    // REFACTORED -- no longer pulling ALL users' data
    .then( ()=> axios.get(`${this.address}/users/${this.userIndex}`))
    .then((res) => {
      //taking 1st sample as example
      // REFACTORED
      const currentUser = res.data;
      this.setState({
        isLoaded:true,
        user: currentUser
      })
    })
  }

  render() {
    const {error, isLoaded, places} = this.state;
    if(error) {
      return <div>Error: {error.message}</div>
    }else if(!isLoaded){
      return <div>loading...</div>;
    }else {
      return (
        <div className={styles.carouselwrap}>
            <LikeForm
            user={this.state.user}
            listbuttonRender={this.state.listbuttonRender}
            clickedplace = {this.state.clickedplace}
            enablesubmitbutton = {this.state.enablesubmitbutton}
            modelOpen = {this.state.modelOpen}
            createNewList={this.createNewList}
            cancelCreateListButton = {this.cancelCreateListButton}
            submitCreateListbutton = {this.submitCreateListbutton}
            exitLikeFormClicked = {this.exitLikeFormClicked}
            likeListOnChange = {this.likeListOnChange}
            listLikeToggle = {this.listLikeToggle}
            outsideModalClick = {this.outsideModalClick}
            />
          <div className={styles.wrapper}>
            <TopBar
              page={this.state.page}
              totalpage={3}
              leftArrowClicked={this.leftArrowClicked}
              rightArrowClicked={this.rightArrowClicked}/>
            <Carousel
              places={this.state.places}
              heartClicked = {this.heartClicked}
              // REFACTOR  changeed likeplace to likes
              likes={this.state.user.likes} />
          </div>
        </div>

      )
    }

  }
}

export default App;