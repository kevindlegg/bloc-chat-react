import React, { Component } from 'react';

    class MessageList extends Component {
        constructor(props) {
            super(props)

            this.state = {

            }
        }

    render() {
        return(
            <div className="Message-list">
                <h3 className="List-title">{this.props.activeroom.name}</h3>
            </div>
        )
    }

}


export default MessageList;