import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import TopBar from './TopBar.jsx';
import LikeForm from './LikeForm.jsx';
import styles from './styles.css';

class App extends React.Component {
  constructor(props) {
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
      modelOpen: false,
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

    this.address = 'http://kinglia-lb-1556610415.us-west-1.elb.amazonaws.com'; // http://localhost:3003 or proxy address
    this.userIndex = 1;
    this.zip = 94110;
  }

  componentDidMount() {
    axios.get(`${this.address}/places/${this.zip}`)
      .then((res) => {
        const totalplaces = [...res.data].slice(0, 12);
        const fourplaces = [...totalplaces].slice(0, 4);
        this.setState({
          places: totalplaces,
          totalplaces: totalplaces
        });
      })
      .then(() => axios.get(`${this.address}/users/${this.userIndex}`))
      .then((res) => {
        const currentUser = res.data;
        this.setState({
          isLoaded: true,
          user: currentUser,
        });
      });
  }

  // heart clicked
  heartClicked(place) {
    this.setState({
      saveToAListRender: 'true',
      clickedplace: place,
      modelOpen: true,
    });
  }

  outsideModalClick(e) {
    const modalId = document.getElementById('modal');
    const isClickInside = modalId.contains(e.target);
    if (!isClickInside) {
      this.exitLikeFormClicked();
    }
  }

  // List form button interrupt
  exitLikeFormClicked() {
    this.setState({
      saveToAListRender: 'false',
      clickedplace: {},
      modelOpen: false,
    });
  }

  createNewList() {
    this.setState({
      listbuttonRender: 'form',
    });
  }

  likeListOnChange(e) {
    e.preventDefault();
    this.setState({
      likelistinput: e.target.value,
      enablesubmitbutton: true,
    });
  }

  cancelCreateListButton() {
    this.setState({
      listbuttonRender: 'default',
    });
  }

  submitCreateListbutton(e) {
    const obj = {
      "userid": this.state.user.userid,
      "listname": this.state.likelistinput,
      "placeid": this.state.clickedplace.placeid
    };

    axios.post(`${this.address}/users/lists`, obj)
      .then(() => {
        this.setState({
          likelistinput: '',
          listbuttonRender: 'default',
        });
      })
      .catch(() => {
        console.log(e);
      })
      .then(() => axios.get(`${this.address}/users/${this.userIndex}`))
      .then((res) => {
        const currentUser = res.data;
        this.setState({
          user: currentUser,
        });
      })
      .catch(() => {
        console.log(e);
      });
    e.preventDefault();
  }

  listLikeToggle(e, singleList) {
    if (singleList.likeid) {
      axios.delete(`${this.address}/users/lists`, { data: { likeid: singleList.likeid } })
        .then((res) => {
          console.log(res.status);
        })
        .catch(() => {
          console.log(e);
        })
        .then(() => axios.get(`${this.address}/users/${this.userIndex}`))
        .then((res) => {
          const currentUser = res.data;
          this.setState({
            user: currentUser,
          });
        })
        .catch(() => {
          console.log(e);
        });
      e.preventDefault();
    } else if (!singleList.likeid) {
      const obj = {
        "userid": this.state.user.userid,
        "placeid": this.state.clickedplace.placeid,
        "listname": singleList.listname
      };
      axios.patch(`${this.address}/users/lists`, obj)
        .then((res) => {
          console.log(res.status);
        })
        .catch(() => {
          console.log(e);
        })
        .then(() => axios.get(`${this.address}/users/${this.userIndex}`))
        .then((res) => {
          const currentUser = res.data;
          this.setState({
            user: currentUser,
          });
        })
        .catch(() => {
          console.log(e);
        });
      e.preventDefault();
    }
  }

  // end of List form button interrupt; topbar onclick
  leftArrowClicked() {
    const scroller = document.getElementById('scroller');
    if (this.state.page === 2) {
      scroller.scrollLeft = 0;
      this.setState({
        page: 1,
      });
    } else if (this.state.page === 3) {
      scroller.scrollLeft = 1120;
      this.setState({
        page: 2,
      });
    } else if (this.state.page === 1) {
      scroller.scrollLeft = 2240;
      this.setState({
        page: 3,
      });
    }
  }

  rightArrowClicked() {
    const scroller = document.getElementById('scroller');
    if (this.state.page === 1) {
      scroller.scrollLeft = 1120;
      this.setState({
        page: 2,
      });
    } else if (this.state.page === 2) {
      scroller.scrollLeft = 2240;
      this.setState({
        page: 3,
      });
    } else if (this.state.page === 3) {
      scroller.scrollLeft = 0;
      this.setState({
        page: 1,
      });
    }
  }

  render() {
    const { error, isLoaded, places } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } if (!isLoaded) {
      return <div>loading...</div>;
    }
    return (
      <div className={styles.carouselwrap}>
        <LikeForm
          user={this.state.user}
          listbuttonRender={this.state.listbuttonRender}
          clickedplace={this.state.clickedplace}
          enablesubmitbutton={this.state.enablesubmitbutton}
          modelOpen={this.state.modelOpen}
          createNewList={this.createNewList}
          cancelCreateListButton={this.cancelCreateListButton}
          submitCreateListbutton={this.submitCreateListbutton}
          exitLikeFormClicked={this.exitLikeFormClicked}
          likeListOnChange={this.likeListOnChange}
          listLikeToggle={this.listLikeToggle}
          outsideModalClick={this.outsideModalClick}
        />
        <div className={styles.wrapper}>
          <TopBar
            page={this.state.page}
            totalpage={3}
            leftArrowClicked={this.leftArrowClicked}
            rightArrowClicked={this.rightArrowClicked}
          />
          <Carousel
            places={this.state.places}
            heartClicked={this.heartClicked}
            likes={this.state.user.likes}
          />
        </div>
      </div>
    );
  }
}

export default App;
