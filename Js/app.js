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
const userf = document.getElementById("users")

const db = firebase.database();
const msgRef = db.ref("/msgs");
let namee = "";
var currentUserKey = "";
var chatKey = '';
var namess;
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

        document.getElementById("Hello").innerHTML = user.displayName;
        console.log(currentUserKey)
        var email = user.email;
        alert("Active User " + email + ": " + user.displayName);
        db.ref("/users").on('value', function(users) {
            users.forEach(data => {
                if (data.val().email == user.email) {
                    currentUserKey = data.key
                    console.log(currentUserKey)
                }
            });
        });
        //is signed in

    } else {

        window.location = "login.html";
    }



});




document.getElementById("refresh").addEventListener("click", updatelist)


function StartChat(friendKey, friendName) {

    console.log(friendKey + ":" + friendName)
    var friendList = {
        friendID: friendKey,
        userId: currentUserKey
    }
    var flag = false;
    db.ref('friend_list').on('value', function(friends) {
        friends.forEach(data => {
            var user = data.val()
            console.log(user.friendID + " " + friendList.friendID + " " + user.userId)
            if ((user.friendID === friendList.friendID && user.userId === friendList.userId) || ((user.friendID === friendList.userId && user.userId === friendList.friendID))) {
                console.log(flag)
                chatKey = data.key;
                console.log(chatKey)
                flag = true
                db.ref("/chatMessages").child(chatKey).on('child_added', updateMsgs);


            }
        })
        if (flag == false) {
            db.ref('friend_list').push(friendList, function(error) {
                if (error) alert(error);

            })
        }
    })


}

function updatelist() {
    var user = firebase.auth()

    db.ref("/users").on('value', function(users) {
        users.forEach(data => {
            if (data.val().email != user.currentUser.email) {
                userf.innerHTML += `<li><Button id = user-"${data.val().name}" onclick = "StartChat('${data.key}','${data.val().name}')">"${data.val().name}"</Button></li>`
                console.log(user.innerHTML)
            }

        });
    })
}



msgForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
    e.preventDefault();
    const text = msgInput.value;

    if (!text.trim()) return alert('Please type a message'); //no msg submitted
    const msg = {
        name: document.getElementById("Hello").innerHTML,
        text: text
    };

    db.ref("chatMessages").child(chatKey).push(msg);
    msgInput.value = "";
}
const updateMsgs = data => {
    const { dataName, text } = data.val(); //get name and texts
    console.log(data.val().name + "==" + document.getElementById("Hello").innerHTML)
        //load messages, display on left if not the user's name. Display on right if it is the user.
    const msg = `<li class="${data.val().name == document.getElementById("Hello").innerHTML  ? "msg my": "msg"}"><span class = "msg-span">
      <i class = "name">${data.val().name}: </i>${text}
      </span>
    </li>`
    msgScreen.innerHTML += msg; //add the <li> message to the chat window
    //auto scroll to bottom
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
}
document.getElementById("logout").addEventListener("click", e => {
    e.preventDefault();
    var user = firebase.auth()
    if (user) {
        user.signOut();
    }

})