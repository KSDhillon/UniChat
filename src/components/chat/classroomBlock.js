import React, { Component } from 'react';
import { connect } from 'react-redux';

class ClassroomBlock extends Component {

    render() {
        return (
            <div className="class-link-block">
                <a href="#" className="class-link">
                    <div className="classrm-block" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                        <div className="row" style={{padding: '15 0', borderBottom: 1, margin: 0}}>
                            <div className="col-md-8" style={{paddingLeft: 15}}>
                                <h6>Classrooms Name</h6>
                                <span id="recent-message"><strong>user</strong> classroom message</span>
                            </div>
                            <div className="col-md-4" style={{textAlign: 'right'}}>
                                <h6>12:30 am</h6>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default ClassroomBlock;
