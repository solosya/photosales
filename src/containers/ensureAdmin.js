import React, {Component}       from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect }              from 'react-redux';

class EnsureAdminContainer extends Component {

    render() {
        if (this.props.isLoggedIn && this.props.admin) {
            return this.props.children;
        } 
        return <Redirect to={window.basePath} />
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.isLoggedIn,
        admin: state.admin,
        guest: state.guest
    }
}

export default withRouter( connect(mapStateToProps)(EnsureAdminContainer) );