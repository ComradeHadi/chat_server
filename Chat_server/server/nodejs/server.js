var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(8890);


io.on('connection', function (socket) {


    console.log("new client connected");

    var redisClient = redis.createClient();
    redisClient.subscribe('userTyping');
    redisClient.subscribe('message');


    redisClient.on("message", function (channel, message) {

        var packet = JSON.parse(message);

        console.log("mew message");
        socket.emit(channel, message);
    });


    redisClient.on("userTyping", function (channel, req) {


        console.log("some one is typing ");

        var packet = JSON.parse(req);

//    console.log(packet.typing_user_name+" is typing ...");

        socket.emit(channel, req);
    });


    redisClient.on("send_", function (channel, message) {
        //console.log("mew message  --->  "+ message.msg + " ---> to---->"+message.to);

        var packet = JSON.parse(message);

        console.log("send mew message");
        socket.emit(channel, message);
    });

    socket.on('disconnect', function () {
        redisClient.quit();
    });


});

