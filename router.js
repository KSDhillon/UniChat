const AuthenticationController = require('./controllers/AuthenticationController');
const ChatController = require('./controllers/ChatController');
const express = require('express');
const passportService = require('./config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    // Initializing route groups
    const apiRoutes = express.Router();
    const authRoutes = express.Router();
    const chatRoutes = express.Router();


    // Set auth routes as subgroup/middleware to apiRoutes



    //=========================//
    // Auth Routes             //
    //=========================//

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);
    authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);

    //=========================//
    // Chat Routes             //
    //=========================//

    // Set chat routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/chat', chatRoutes);

    chatRoutes.get('/', requireAuth, ChatController.getClassrooms);
    chatRoutes.get('/:classroomId', requireAuth, ChatController.getClassroom);

    chatRoutes.post('/message/:classroomId', requireAuth, ChatController.sendMessage);
    chatRoutes.post('/enroll/:classroomId', requireAuth, ChatController.enrollInClassroom);
    chatRoutes.post('/new/', requireAuth, ChatController.newClassroom);

    chatRoutes.put('/message/:messageId', requireAuth, ChatController.updateMessage);

    chatRoutes.delete('/:classroomId', requireAuth, ChatController.dropClassroom);


    // Set url for API group routes
    app.use('/api', apiRoutes);

    apiRoutes.get('/protected', requireAuth, (req, res) => {
        res.send({ content: 'The protected test route is functional!' });
    });
};
