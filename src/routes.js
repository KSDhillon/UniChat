import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Header from './components/header'
import NotFoundPage from './components/pages/not-found';

import HomePage from './components/pages/home-page';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';
import Dashboard from './components/dashboard';
import RequireAuth from './components/auth/require-auth';

export default (
    <Route path="/" component={App}>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="" component={Header}>
            <IndexRoute component={HomePage} />
            <Route path="logout" component={Logout} />
            <Route path="forgot-password" component={ForgotPassword} />
            <Route path="reset-password/:resetToken" component={ResetPassword} />
            <Route path="dashboard" component={RequireAuth(Dashboard)} />
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Route>
);
