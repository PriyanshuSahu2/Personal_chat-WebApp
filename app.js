var firebaseConfig = {
    apiKey: "AIzaSyASNKkGu_SJii72ImwJPOElMcj1fFoy5FE",
    authDomain: "chatapp-21861.firebaseapp.com",
    databaseURL: "https://chatapp-21861-default-rtdb.firebaseio.com",
    projectId: "chatapp-21861",
    storageBucket: "chatapp-21861.appspot.com",
    messagingSenderId: "301828303420",
    appId: "1:301828303420:web:6adc370ef7c0ca2975b139",
    measurementId: "G-QFCPH1BS5J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const msgScreen = document.getElementById("messages");
const msgForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");

const db = firebase.database();
const msgRef = db.ref("/msgs");

let namee = "";



function init() {
    namee = prompt("please Enter Your Name");
    msgRef.on('child_added', updateMsgs);

}
document.addEventListener('DOMContentLoaded', init);
msgForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
    e.preventDefault();
    const text = msgInput.value;

    if (!text.trim()) return alert('Please type a message'); //no msg submitted
    const msg = {
        name: namee,
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";
}
const updateMsgs = data => {
    const { dataName, text } = data.val(); //get name and text

    //load messages, display on left if not the user's name. Display on right if it is the user.
    const msg = `<li class="${data.val().name == namee ? "msg my": "msg"}"><span class = "msg-span">
      <i class = "name">${data.val().name}: </i>${text}
      </span>
    </li>`

    msgScreen.innerHTML += msg; //add the <li> message to the chat window

    //auto scroll to bottom
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
}