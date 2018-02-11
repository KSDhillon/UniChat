import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassroomBlock from './classroomBlock'
import { getClassrooms } from '../../actions/chat';

class ClassroomPanel extends Component {

    componentWillMount() {
        this.props.getClassrooms();
    }

    renderInbox() {
        var date = new Date();
        date.setHours(0,0,0,0)
        if (this.props.classrooms && this.props.classrooms.length > 0) {
            let classList = this.props.classrooms.map((classroom, i) => {
                return ( <ClassroomBlock info={classroom} date={date}/> );
            });
            return classList
        }
       return <div>You do not have any active classrooms.</div>;
    }

    render() {
        return (
            <div className="card auto_height_item" style={{minHeight: '400px', borderRadius: 0}}>
                <div className="tray-banner" style={{borderBottom: '1px solid rgba(0,0,0,.125)'}}>
                    <div className="row" style={{padding: '0 15', borderBottom: 1}}>
                        <div className="col-md-8" style={{padding: '15 0 15 15'}}>
                            <h4 style={{marginBottom: 0}}>Classrooms</h4>
                        </div>
                        <div className="col-md-4" style={{fontSize: 38, padding: '9 15 9 0'}}>
                            <a className="fa fa-plus-square float-right text-success"></a>
                        </div>
                    </div>
                </div>
                <div className="tray">
                    {this.renderInbox()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        classrooms: state.chat.classroomList,
    };
}

export default connect(mapStateToProps, { getClassrooms })(ClassroomPanel);
