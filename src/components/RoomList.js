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
        <div className="Room-list">
            <h1 className="App-title">Bloc Chat</h1>
            <div class="input-group mb-3">
                <input type="text" className="form-control" placeholder="New room name" />
                <div className="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Add room</button>
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