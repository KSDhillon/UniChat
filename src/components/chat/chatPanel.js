import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatInput from './chatInput';

class ChatPanel extends Component {

    render() {
        return (
            <div className="card auto_height_item" id="chat-panel" style={{minHeight: '400px'}}>
                <div>
                    <div className="tray-banner" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                        <div className="row" style={{padding: '0 15', borderBottom: 1}}>
                            <div className="col-md-8" style={{padding: '15 0 15 15'}}>
                                <h4 style={{marginBottom: 0}}>Classrooms Name</h4>
                            </div>
                        </div>
                    </div>
                    <div className="chat-box">
                        <div className="row" id="msg-board">
                            
                        </div>
                        <div className="row" id="chat-input">
                            <ChatInput />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPanel;
