import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser, resetError } from '../../actions/auth';

const form = reduxForm({
    form: 'login'
});

class Login extends Component {

    static contextTypes = {
        router: React.PropTypes.object,
    }

    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    componentWillMount() {
        if (this.props.authenticated) {
            this.context.router.push('/dashboard');
        } else {
            this.props.resetError()
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.authenticated) {
            this.context.router.push('/dashboard');
        }
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger" role="alert" style={{marginBottom: '10px'}}>
                    <strong>Error!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {


        const { handleSubmit } = this.props;

        return (
            <div className="container">
                <div className="row" style={{paddingTop: '20%'}}>
                    <div className="col-md-4 offset-md-4">
                        <div className="card">
                            <div className="card-block">
                                <legend>Log In</legend>
                                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} id="loginForm">
                                    {this.renderAlert()}
                                    <div className="form-group input-group">
                                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                        <Field name="email" className="form-control form-control-lg" component="input" placeholder="email" type="text" />
                                    </div>
                                    <div className="form-group input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                        <Field name="password" className="form-control form-control-lg" component="input" placeholder="password" type="password" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                                        <button type="button" className="btn btn-primary btn-lg btn-block">Login With Facebook</button>
                                    </div>
                                    <hr style={{margin: '10px 0px 5px 0px'}} />
                                    <div className="form-group text-center" style={{marginBottom: 0}} >
                                        <Link to="forgot-password">Forgot Password</Link>&nbsp;|&nbsp;<a href="#">Support</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p id="under-card">Haven't created an account? <Link to="register">Sign Up!</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { loginUser, resetError })(form(Login));
