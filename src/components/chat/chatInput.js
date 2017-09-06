import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const form = reduxForm({
    form: 'login'
});

class ChatInput extends Component {

    render() {
        return (
            <div className="input-group">
              <input type="text" className="form-control form-control-lg" style={{borderRadius: 0}} />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" style={{borderRadius: 0}}>Send</button>
              </span>
            </div>
        );
    }
}

export default form(ChatInput);
