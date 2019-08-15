import React, {Component}       from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect }              from 'react-redux';

class EnsureLoggedInContainer extends Component {

    render() {
        if (this.props.isLoggedIn || this.props.guest) {
            return this.props.children;
        } 
        return <Redirect to={window.basePath + "/login"} />
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.isLoggedIn,
        guest: state.guest
    }
}

export default withRouter( connect(mapStateToProps)(EnsureLoggedInContainer) );