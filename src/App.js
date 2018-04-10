import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBMntbxUT8W3tAO8beTrcgaBg3Xu8XwadQ",
    authDomain: "bloc-chat-37f37.firebaseapp.com",
    databaseURL: "https://bloc-chat-37f37.firebaseio.com",
    projectId: "bloc-chat-37f37",
    storageBucket: "bloc-chat-37f37.appspot.com",
    messagingSenderId: "774613959137"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeRoom:[]
    };
    
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({activeRoom:room});
  }

  render() {
    return (
      <div className="row">
      <div className="col-sm-3">
          <RoomList firebase={firebase} setactiveroom={this.setActiveRoom} activeroom={this.state.activeRoom} />
      </div>
      <div className="col-sm-9">
          <MessageList firebase={firebase} activeroom={this.state.activeRoom} />
      </div>
      </div>
    );
  }
}

export default App;
