import React, {Component}       from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect }              from 'react-redux';

class EnsureLoggedOutContainer extends Component {

    render() {
        if (this.props.isLoggedIn || this.props.guest) {
            return <Redirect to={window.basePath + "/checkout"} />
        } 
        return this.props.children;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.isLoggedIn,
        guest: state.guest
    }
}

export default withRouter( connect(mapStateToProps)(EnsureLoggedOutContainer) );