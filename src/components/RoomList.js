import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms: [ ]
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) });    
        });
    }
 
    render() {
        return(
        <div>
            <div id="App-nav">
                <header className="App-header">
                    <h1 className="App-title">Bloc Chat
                    <button id="app-header-add-button">New room</button>
                    </h1> 
                </header>
                    <nav className="Rooms-nav">
                        <ul>
                            { this.state.rooms.map( (room, index) =>
                                <li className="Room-link" key={ index }><a href="#">{ room.name }</a></li>
                            )}
                        </ul>
                    </nav>
            </div>
            <div id="App-main">
                <main>
                  <form id="new-room-form">
                    <h1>Create new room</h1>
                    <p>Enter a room name</p>
                    <input id="new-room" name="newRoom" type="text" />
                    <button id="new-room-cancel">Cancel</button>
                    <button id="new-room-create">Create room</button>
                  </form>
                </main>
            </div>
        </div>
        )
    }
}

export default RoomList;