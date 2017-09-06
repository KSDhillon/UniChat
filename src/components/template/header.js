import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'react-cookie'

class HeaderTemplate extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            const user = cookie.load('user');
            const formatedName = user.firstname.substr(0,1).toUpperCase() + user.firstname.substring(1) + ' ' + user.lastname.substr(0,1).toUpperCase();
            return [
                <li className="nav-item" key={`${1}header`}>
                    <Link className="nav-link" style={{marginTop: 2}} to="dashboard">Dashboard</Link>
                </li>,
                <li className="nav-item dropdown" key={`${2}header`}>
                    <a href="" className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <img src="http://placehold.it/30x30" style={{paddingBottom: 2}} className="rounded-circle" /> {formatedName} <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item"><a href="#"><i className="fa fa-cog"></i> Account</a></li>
                        <li className="divider" style={{margin:'5px 0px 5px 0px'}}></li>
                        <li className="dropdown-item"><Link to="logout"><i className="fa fa-sign-out"></i> Sign-out</Link></li>
                    </ul>
                </li>,
            ];
        } else {
            return [
                // Unauthenticated navigation
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="login">Login</Link>
                </li>,
                <li className="nav-item" key={3}>
                    <Link className="nav-link" to="register">Register</Link>
                </li>,
            ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/" style={{fontSize: 27}} >{this.props.logo}</Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="navbar-nav navbar-right ml-auto">
                            {this.renderLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    };
}

export default connect(mapStateToProps)(HeaderTemplate);
