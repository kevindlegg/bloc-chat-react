import React, { Component } from 'react';
import Moment from 'react-moment';

    class MessageList extends Component {
        constructor(props) {
            super(props)

            this.state = {
                messages:[],
                newMessage:' '
            }

            this.messagesRef = this.props.firebase.database().ref('messages');
        }

        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });    
            });
        }

        handleNewMessageInput(e) {
            this.setState({ newMessage: e.target.value});
        }
    
        handleNewMessageAdd(e) {
            if(this.state.newMessage) {
                this.messagesRef.push({
                    content: this.state.newMessage,
                    roomID: this.props.activeroom.key,
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    username: this.props.user.displayName
                });
            };
            this.setState({ newMessage: ' '});
        }
    
        listMessages() {
            if(this.props.activeroom.key) {
                const msgs = this.state.messages.filter( (msgs, index) => msgs.roomID === this.props.activeroom.key);
            if(msgs.length > 0) {
                return (
                <ul className="Messages-nav">
                    { msgs.map( (message, index) =>
                        <li key={ index } >
                        <div className="rightside-left-chat">
							<span id="message-author">{message.username}</span>
                            <span id="message-time"><Moment format="lll">{message.sentAt}</Moment></span>
							<p>{message.content}</p>
						</div>
                        </li>
                    )}
                </ul>)
            }}
        }

        showAddMessage() {
            if(this.props.activeroom.key) {
                return(
                    <form id="message-input">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="New message" name="newMessage" onChange={(e) => this.handleNewMessageInput(e)} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleNewMessageAdd(e)} >Send</button>
                            </div>
                        </div>
                    </form>
                )
            }
        }

    render() {
        return(
            <div className="wrap">
                <h3 className="List-title">{this.props.activeroom.name}</h3>
                {this.listMessages()}
                {this.showAddMessage()}
            </div>
        )
    }

}


export default MessageList;