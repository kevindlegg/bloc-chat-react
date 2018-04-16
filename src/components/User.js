import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show:false
        };

    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setuser(user);
          });
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }   

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    userStatus() {
        if(this.props.user) {
            return(
                <div className="input-group-append">
                    <Button onClick={() => this.handleSignOut()} >Sign Out</Button>
                    <h3 id="display-name">{this.props.user.displayName}</h3>
                </div>
            );
        } else {
            return(
                <div className="input-group-append">
                    <Button onClick={() => this.handleSignIn()} >Sign In</Button>
                    <h3 id="display-name">Guest</h3>
                </div>
            );
        }
    }

    render() {
        return(
            <div className="User-container">
                {this.userStatus()}
            </div>
        )
    }
}

export default User;