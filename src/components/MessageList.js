import React, { Component } from 'react';

    class MessageList extends Component {
        constructor(props) {
            super(props)

            this.state = {

            }
        }




    render() {
        return(
            <div className="List-container">
                {this.props.activeroom}
            </div>
        )
    }

}


export default MessageList;