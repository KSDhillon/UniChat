import React, { Component } from 'react';
import Header from './template/header';
import Footer from './template/footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header logo="UniChat" />

                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
