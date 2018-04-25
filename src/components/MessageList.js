import React, { Component } from 'react';
import Moment from 'react-moment';

    class MessageList extends Component {
        constructor(props) {
            super(props)

            this.state = {
                messages:[],
                newMessage:' ',
                editedKey:' ',
                editedMessage:' '
            }

            this.messagesRef = this.props.firebase.database().ref('messages');
        }

        componentDidMount() {
            this.messagesRef.on('child_added', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });    
            });

            this.messagesRef.on('child_removed', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
            this.setState({ messages: this.state.messages.filter( msg => msg.key !== message.key ) });    
            });

            this.messagesRef.on('child_changed', snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
                let messages = this.state.messages;
                const foundIndex = this.state.messages.map(msg => msg.key).indexOf(message.key);
                messages[foundIndex]=message;
                this.setState({ messages: messages });    
            });
        }

        handleNewMessageInput(e) {
            this.setState({ newMessage: e.target.value});
        }
    
        handleNewMessageAdd(e) {
            e.preventDefault(); // prevent default action controls events   
            if(this.state.newMessage) {
                this.messagesRef.push({
                    content: this.state.newMessage,
                    roomID: this.props.activeroom.key,
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    username: (this.props.user ? this.props.user.displayName : "Guest")
                });
            };
            this.setState({ newMessage: ' '});
        }
    
        handleEditButton(e, key, message) {
            this.setState({ editedKey: key,
                            editedMessage: message});
        }

        handleEditMessageUpdate(e, key) {
            const updatedContent = this.state.editedMessage;
            this.messagesRef.child(key).update( {content: updatedContent} );
            this.setState({ editedKey:' ',
                            editedMessage:' '});
        }

        handleEditMessageChange(e) {
            this.setState({ editedMessage: e.target.value});
        }

        handleEditMessageCancel(e) {
            this.setState({ editedKey:' ',
                            editedMessage:' '});
        }
        
        handleDeleteMessage(e, key) {
            this.messagesRef.child(key).remove();
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
                            { (this.state.editedKey && this.state.editedKey === message.key) ? 
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" name="editedMessage" onChange={(e) => this.handleEditMessageChange(e, message.key)} value={this.state.editedMessage}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleEditMessageUpdate(e, message.key, message.content)} ><i className="material-icons">done</i></button>
                                        <button className="btn btn-outline-secondary" type="submit" onClick={(e) => this.handleEditMessageCancel(e, message.key)} ><i className="material-icons">not_interested</i></button>
                                    </div>
                                </div> :
                                <p>
                                {message.content}
                                </p>
                            }
                            { this.showButtons(message)}
						</div>
                        </li>
                    )}
                </ul>)
            }}
        }

        showButtons(message) {
            if (message.username === this.props.user.displayName) {
                return(
                    <p>
                        <button className="message-action-button" type="submit" onClick={(e) => this.handleEditButton(e, message.key, message.content)}><i className="material-icons">mode_edit</i></button>
                        <button className="message-action-button" type="submit" onClick={(e) => this.handleDeleteMessage(e, message.key)}><i className="material-icons">delete</i></button>
                    </p>
                )
            }
        }

        showAddMessage() {
            if(this.props.activeroom.key) {
                return(
                    <form id="message-input">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="New message" name="newMessage" onChange={(e) => this.handleNewMessageInput(e)} value={this.state.newMessage}/>
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
                <div id="list-messages">
                {this.listMessages()}
                </div>
                {this.showAddMessage()}
            </div>
        )
    }

}


export default MessageList;