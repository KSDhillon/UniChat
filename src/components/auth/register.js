import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { registerUser, resetError } from '../../actions/auth';

const form = reduxForm({
    form: 'register',
    validate
});

const renderField = field => (
        <div>
            <input className="form-control form-control-lg" placeholder={field.placeholder} {...field.input}/>
            {field.touched && field.error && <div className="error">{field.error}</div>}
        </div>
);

function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'Please enter a first name';
    }

    if (!formProps.lastname) {
        errors.lastname = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    return errors;
}

class Register extends Component {

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

    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="container">
                <div className="row" style={{paddingTop: '20%'}}>
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-block">
                                <legend>Sign Up</legend>
                                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                    {this.renderAlert()}
                                    <div className="form-group">
                                        <Field name="firstname" placeholder="First Name" component={renderField} type="text" />
                                    </div>
                                    <div className="form-group">
                                        <Field name="lastname" placeholder="Last Name" component={renderField} type="text" />
                                    </div>
                                    <div className="form-group">
                                        <Field name="email" placeholder="Email" component={renderField} type="text" />
                                    </div>
                                    <div className="form-group">
                                        <Field name="password" placeholder="Password" component={renderField} type="password" />
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p id="under-card">Haven't created an account? <Link to="login">Login!</Link></p>
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

export default connect(mapStateToProps, { registerUser, resetError })(form(Register));
