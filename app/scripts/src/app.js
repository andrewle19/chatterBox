import socket from './ws-client';
import {UserStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';


let userStore = new UserStore('x-chatterbox/u');
let username = userStore.get();
// check if user store contained a user
if(!username){
    username = promptForUsername();
    userStore.set(username);
}

class ChatApp {
    constructor() {
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        // console.log('Hello ES6');
        this.chatList = new ChatList(LIST_SELECTOR, username);

        // opens socket
        socket.init('ws://localhost:3001');

        socket.registerOpenHandler(() =>{
            // create new message
            // let message = new ChatMessage({message: 'pow!'});
            // // turn message into JSON
            // socket.sendMessage(message.serialize()

            this.chatForm.init((data) => {
                let message = new ChatMessage({message:data});
                console.log('chat form',data);
                // turn message into JSON
                socket.sendMessage(message.serialize());
            });
            this.chatList.init();
        });

        socket.registerMessageHandler((data) => {
            console.log(data);
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
        });
    }
}

class ChatMessage {
    constructor({
        message: m,
        user: u= username,
        timestamp: t=(new Date()).getTime()
    }){
        this.message = m;
        this.user = u;
        this.timestamp = t;
    }

    serialize() {
        return {
            user: this.user,
            message: this.message,
            timestamp: this.timestamp
        };
    }
}


// new ChatApp();
export default ChatApp;
