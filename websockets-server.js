var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;

// server is established and bounded to specefic port
var ws = new WebSocketServer({
    port: port
});

var messages = []; // store old msgs in array
var currentTopic; // store the current topic
console.log('websockets server started');

ws.on('connection', function(socket){
    console.log('client connection established');

    // on connect if there is a curent topic display it to new connection
    if(currentTopic){
        socket.send(currentTopic);
    }


    // as soon as a connection is made to the socket it sends all old messages
    messages.forEach(function (msg){
        socket.send(msg);
    });



    // when a client is connected use socket to relay any messages
    socket.on('message', function(data){
        console.log('message received ' + data);

        ws.clients.forEach(function (clientSocket){
        // look at the data if the string contains \topic then we want to change the topic
        // else if user enters history,it will send the history of chat chronilogically
        // else we just push data into msg array and relay the message to other clients
            if(data.substring(0,6) == '\\topic'){
                clientSocket.send('*** Topic has changed to' + data.substring(6));
                currentTopic = '*** Topic is' + data.substring(6);
            }else{
                clientSocket.send(data);
            }
        });
        // ocket.send(data);
        // add the data to message array
        if(data.substring(0,6) != '\\topic'){
            messages.push(data); // push msg to array
        }
    });
});
