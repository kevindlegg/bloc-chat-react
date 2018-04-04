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

    handleNewRoomAdd(newRoom) {
        if(newRoom) {
            console.log('Testing new room');
        }

    }
 
    render() {
        return(
        <div className="Room-list">
            <h1 className="App-title">Bloc Chat</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="New room name" name="newRoom" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={this.handleNewRoomAdd(this.newRoomnewRoom)} >Add room</button>
                </div>
            </div>
            <ul className="Rooms-nav">
                { this.state.rooms.map( (room, index) =>
                    <li className="Room-link" key={ index }><a href="#">{ room.name }</a></li>
                )}
            </ul>
        </div>
        )
    }
}

export default RoomList;