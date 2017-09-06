import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassroomPanel from './chat/classroomPanel';
import ChatPanel from './chat/chatPanel';


class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-2 offset-lg-2 col-xs-5" style={{paddingRight: 0}}>
                    <ClassroomPanel />
                </div>
                <div className="col-lg-6 col-xs-7" style={{paddingLeft: 0}}>
                    <ChatPanel />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(Dashboard);
