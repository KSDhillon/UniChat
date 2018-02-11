const Classroom = require('../models/classroom');
const User = require('../models/user');
const Message = require('../models/message');

exports.getClassrooms = function(req, res, next) {
    //finding all conversations linked to a particular user
    Classroom.find({ participants: req.user._id })
        .select('_id name')
        .exec(function(err, classrooms) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            //getting the most current message for each enrolled classroom
            let messageArr = []; //array to hold recent messages
            classrooms.forEach(function(classroom) {
                Message.find({ 'classroomId': classroom._id })
                .sort('-createdAt')
                .limit(1)
                .populate({
                    path: "author",
                    select: "profile.firstname profile.lastname"
                })
                .exec(function(err, message) {
                    if (err) {
                        res.send({ error: err });
                        return next(err);
                    }
                    //message.unshift({ classroomName: classroom.name, classroomId: classroom._id })
                    let classInfo = {
                        classroomName: classroom.name,
                        classroomId: classroom._id,
                        recentMessage: message,
                    }
                    messageArr.push(classInfo);
                    if (messageArr.length === classrooms.length) {
                        return res.status(200).json({ classrooms: messageArr });
                    }
                });

            });
            if (classrooms.length == 0) {
                return res.status(200).json({ classrooms: [] });
            }
        });
}

exports.getClassroom = function(req, res, next) {
    Message.find({ classroomId: req.params.classroomId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.firstname profile.lastname'
        })
        .exec(function(err, messages) {
            if (err) {
                res.send({ error: err });
                return next(err);
        }

        return res.status(200).json({ classroom: req.params.classroomName, messages: messages });
    });
 }

exports.enrollInClassroom = function(req, res, next) {
    Classroom.findByIdAndUpdate(
        req.params.classroomId,
        {$push: {participants: req.user._id}},
        {safe: true, upsert: true, new : true},
        function(err, classroom) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            return res.status(200).json({ message: 'Class successfully enrolled!' });
        }
    );
}

exports.dropClassroom = function(req, res, next) {
    Classroom.findByIdAndUpdate(
        req.params.classroomId,
        {$pull: {participants: req.user._id}},
        {safe: true, upsert: true, new : true},
        function(err, classroom) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            return res.status(200).json({ message: 'Class successfully dropped!' });
        }
    );
}

exports.newClassroom = function(req, res, next) {

    if(!req.body.classroomName) {
        res.status(422).send({ error: 'Please enter a classroom name.' });
        return next();
    }

    const classroom = new Classroom({
        name: req.body.classroomName,
        participants: [req.user._id]
    });

    classroom.save(function(err, newClassroom) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        res.status(200).json({ success: true });
        return next();

    });
}

exports.sendMessage = function(req, res, next) {
    const reply = new Message({
        classroomId: req.params.classroomId,
        body: req.body.composedMessage,
        author: req.user._id
    });

    reply.save(function(err, sentReply) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        res.status(200).json({ message: 'Message successfully sent!' });
        return(next);
    });
}

// PUT Route to Update Message
exports.updateMessage = function(req, res, next) {
    Classroom.find({
        $and : [
            { '_id': req.params.messageId }, { 'author': req.user._id }
            ]},
            function(err, message) {
                if (err) {
                    res.send({ error: err});
                    return next(err);
                }

                message.body = req.body.composedMessage;

                message.save(function (err, updatedMessage) {
                    if (err) {
                        res.send({ error: err });
                        return next(err);
                    }

                    res.status(200).json({ message: 'Message updated!' });
                    return next();
                });
            });
}
