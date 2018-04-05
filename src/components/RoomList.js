import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms: [ ],
            newRoom: ' '
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

    handleNewRoomInput(e) {
        this.setState({ newRoom: e.target.value});
    }

    handleNewRoomAdd(e) {
        const newRoom = this.state.newRoom;
        if(newRoom) {
            this.roomsRef.push({
                name: newRoom
            });
            this.setState({ newRoom: ' '});
        }
    }

    handleActiveRoom(room) {
        this.setState({activeRoom:room});
    }

    render() {
        return(
        <div className="Room-list">
            <h1 className="App-title">Bloc Chat</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="New room name" name="newRoom" value={ this.state.newRoom } onChange={(e) => this.handleNewRoomInput(e)  }/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleNewRoomAdd(e)} >Add room</button>
                </div>
            </div>
            <ul className="Rooms-nav">
                { this.state.rooms.map( (room, index) =>
                    <li className="Room-link" key={ index } onClick={() => this.handleActiveRoom(room)}><a href="#">{ room.name }</a></li>
                )}
            </ul>
        </div>
        )
    }
}

export default RoomList;