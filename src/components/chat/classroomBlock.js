import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentClassroom } from '../../actions/chat';
import { Link } from 'react-router';

const moment = require('moment');

class ClassroomBlock extends Component {

    handleClick(id, event) {
        //setCurrentClassroom();
        this.props.setCurrentClassroom(id)
    }

    renderRecentMessage() {
        if (this.props.info.recentMessage.length > 0) {
            var msgDate = new Date(this.props.info.recentMessage[0]['createdAt']);
            var formatedDate = moment(this.props.info.recentMessage[0]['createdAt']).from(moment())
            // if (this.props.date < msgDate) {
            //     console.log(msgDate);
            //     formatedDate = `${msgDate.getHours()}:${msgDate.getMinutes()}`;
            // } else {
            //     formatedDate = `${msgDate.getMonth() + 1}/${msgDate.getDate()}/${msgDate.getFullYear().toString().substr(2,3)}`;
            // }
            const firstname = this.props.info.recentMessage[0]['author']['profile']['firstname'];
            const lastname = this.props.info.recentMessage[0]['author']['profile']['lastname'];
            const formatedName = firstname.substr(0,1).toUpperCase() + firstname.substring(1) + ' ' + lastname.substr(0,1).toUpperCase() + lastname.substring(1);
            return (
                <div className="row" style={{padding: '15 0', borderBottom: 1, margin: 0}}>
                    <div className="col-md-7" style={{paddingLeft: 15}}>
                        <h6>{this.props.info.classroomName}</h6>
                        <span id="recent-message"><strong>{formatedName}: </strong>{this.props.info.recentMessage[0]['body']}</span>
                    </div>
                    <div className="col-md-5" style={{textAlign: 'right'}}>
                        <h6>{formatedDate}</h6>
                    </div>
                </div>
            )
        } else {
            console.log(this.props.info);
            return (
                <div className="row" style={{padding: '15 0', borderBottom: 1, margin: 0}}>
                    <div className="col-md-7" style={{paddingLeft: 15}}>
                        <h6>{this.props.info.classroomName}</h6>
                        <span id="recent-message">No messages yet.</span>
                    </div>
                    <div className="col-md-5" style={{textAlign: 'right'}}>
                        <h6></h6>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="class-link-block">
                <Link onClick={this.handleClick.bind(this, this.props.info.classroomName)}  >
                    <div className="classrm-block" style={{borderBottom: '1px solid rgba(0,0,0,.125)', minHeight: 110}}>
                        {this.renderRecentMessage()}
                    </div>
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, { setCurrentClassroom })(ClassroomBlock);
