import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms:[],
            newRoom:''
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
        const roomExists = this.state.rooms.find(rooms => rooms.name === newRoom);
        if(newRoom && !roomExists) {
            this.roomsRef.push({
                name: newRoom
            });
        } else {
            alert('Already exists!!!!')
        };
        this.setState({ newRoom: ' '});
    }

    isCurrentRoom(room) {
            return room === this.props.activeroom ? true : false;
    }

    render() {
        return(
        <div className="Room-list">
            <h1 className="App-title">Bloc Chat</h1>
            <form>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="New room name" name="newRoom" value={ this.state.newRoom } onChange={(e) => this.handleNewRoomInput(e)  }/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleNewRoomAdd(e)} >Add room</button>
                    </div>
                </div>
            </form>
            <ul className="Rooms-nav">
                { this.state.rooms.map( (room, index) =>
                    <li key={ index } onClick={() => this.props.setactiveroom(room)} ><a className={this.isCurrentRoom(room) ? "Room-link-active" : "Room-link"} href="#">{ room.name }</a></li>
                )}
            </ul>
        </div>
        )
    }
}

export default RoomList;