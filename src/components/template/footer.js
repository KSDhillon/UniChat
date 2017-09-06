import React, { Component } from 'react';

class HeaderTemplate extends Component {

    render() {
        return (
            <div className="navbar navbar-default navbar-fixed-bottom">
                <div className="container">
                    <p className="navbar-text pull-left">© 2017 - UniChat</p>
                </div>
            </div>
        );
    }
}

export default HeaderTemplate;
