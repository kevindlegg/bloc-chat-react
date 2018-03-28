import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
        <div id="App-nav">
          <header className="App-header">
            <h1 className="App-title">Bloc Chat</h1>
          </header>
          <main>
            <RoomList firebase={firebase} />
          </main>
        </div>
        <div id="App-messages">
          
        </div>
      </div>
    );
  }
}

export default App;
