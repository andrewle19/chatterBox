let socket;

// initialiing the WebSocket
function init(url){
    socket = new WebSocket(url);
    console.log('connecting ... ');
}

// Assigns function to on open then invokes it as callback
function registerOpenHandler(handlerFunction){
    socket.onopen = () => {
        console.log('open');
        handlerFunction();
    };
}

//Handles messages as they come in Websocket connection
function registerMessageHandler(handlerFunction){

    // e is an event argument
    socket.onmessage = (e) => {
        console.log('message', e.data);
        let data = JSON.parse(e.data);
        handlerFunction(data);
    };
}

// Send messege to WebServer by convering msg payload into JSON string then
// send the JSON string to the WebSocket server
function sendMessage(payload){
    socket.send(JSON.stringify(payload));
}

export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    sendMessage
};
