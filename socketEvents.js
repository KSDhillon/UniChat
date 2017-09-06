module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.on('enter classroom', function(classroom) {
            socket.join(classroom);
        });

        socket.on('leave classroom', function(classroom) {
            socket.leave(classroom);
        });

        socket.on('new message', function(classroom) {
            io.sockets.in(classroom).emit('refresh messages', classroom)
        });

        socket.on('disconnect', function() {
            console.log('user disconnected!');
        });
    });
}
