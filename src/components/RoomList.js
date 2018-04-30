import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms:[],
            newRoom:'',
            editedKey:' ',
            editedRoom:' '
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });

        this.roomsRef.on('child_removed', snapshot => {
            let room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.filter( rm => rm.key !== room.key ) });
            this.setState({newRoom: ' '});
        });

        this.roomsRef.on('child_changed', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            let rooms = this.state.rooms;
            const foundIndex = this.state.rooms.map(rm => rm.key).indexOf(room.key);
            rooms[foundIndex]=room;
            this.setState({ rooms: rooms });    
        });
    }

    handleNewRoomInput(e) {
        this.setState({ newRoom: e.target.value});
    }

    handleNewRoomAdd(e) {
        e.preventDefault();
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

    showButtons(room) {
            return(
            <div id="action-buttons">
                <button className="room-action-button" type="submit" onClick={(e) => this.handleEditButton(e, room)}><i className="material-icons">mode_edit</i></button>
                <button className="room-action-button" type="submit" onClick={(e) => this.handleDeleteRoom(e, room)}><i className="material-icons">delete</i></button>
            </div>
        )
    }

    handleEditButton(e, room) {
        this.setState({ editedKey: room.key,
                        editedRoom: room.name });
    }

    handleEditRoomUpdate(e, room) {
        const updatedRoom = this.state.editedRoom;
        this.roomsRef.child(room.key).update( {name: updatedRoom} );
        this.setState({ editedKey:' ',
                        editedRoom:' '});
    }

    handleEditRoomChange(e) {
        this.setState({ editedRoom: e.target.value});
    }

    handleEditRoomCancel(e) {
        this.setState({ editedKey:' ',
                        editedRoom:' '});
    }
    
    handleDeleteRoom(e, room) {
        this.roomsRef.child(room.key).remove();
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
                    <li id="room-row" key={ index } >
                    { (this.state.editedKey && this.state.editedKey === room.key) ?
                        <div className="input-group mb-3">
                                    <input type="text" className="form-control" name="editedRoom" onChange={(e) => this.handleEditRoomChange(e, room)} value={this.state.editedRoom}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleEditRoomUpdate(e, room)} ><i className="material-icons">done</i></button>
                                        <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleEditRoomCancel(e, room)} ><i className="material-icons">not_interested</i></button>
                                    </div>
                        </div> :
                        <a className={this.isCurrentRoom(room) ? "Room-link-active" : "Room-link"} ><span onClick={() => this.props.setactiveroom(room)} >{ room.name }</span><span>{this.showButtons(room)}</span></a>
                    }
                    </li>
                )}
                
            </ul>
        </div>
        )
    }
}

export default RoomList;