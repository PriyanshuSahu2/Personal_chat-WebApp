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
const userf = document.getElementById("chatlists");

const db = firebase.database();
const msgRef = db.ref("/msgs");
let namee = "";
var currentUserKey = "";
var chatKey = '';
var namess;
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

        document.getElementById("Hello").innerHTML = user.displayName;

        var email = user.email;

        db.ref("/users").on('value', function(users) {
            users.forEach(data => {
                if (data.val().email == user.email) {
                    currentUserKey = data.key
                }
            });
        });
        //is signed in

    } else {

        window.location = "login.html";
    }



});


window.addEventListener("DOMContentLoaded", updatelist);

// document.getElementById("refresh").addEventListener("click", updatelist)


function StartChat(friendKey, friendName) {


    var friendList = {
        friendID: friendKey,
        userId: currentUserKey
    }
    var flag = false;
    db.ref('friend_list').on('value', function(friends) {
        friends.forEach(data => {
            var user = data.val()

            if ((user.friendID === friendList.friendID && user.userId === friendList.userId) || ((user.friendID === friendList.userId && user.userId === friendList.friendID))) {
                flag = true
                chatKey = data.key;
            }
        })
        if (flag == false) {
            chatKey = db.ref('friend_list').push(friendList, function(error) {
                if (error) alert(error);
                else {

                }
            }).getKey();
        }
    })
    if (chatKey != "") {
        updateMsgs(chatKey)
    }

}

function updatelist() {
    var user = firebase.auth()
    var i = 0;
    db.ref("/users").on('value', function(users) {
        users.forEach(data => {
            if (data.val().email != user.currentUser.email) {
                // userf.innerHTML += `<li><Button id = user-"${data.val().name}" class = "userlist" onclick = "StartChat('${data.key}','${data.val().name}')">"${data.val().name}"</Button></li>`
                if (user.PhotoUrl == null) {

                    userf.innerHTML += `<div class="userslist" style="z-index: 75; transition: none 0s ease 0s; height: 72px; transform: translateY(${i*72}px);">
                    <div tabindex="-1" aria-selected="false" role="row">
                        <div class="_2Z4DV _1V5O7">
                            <div class="friendpic">
                                <div class="_y4n1" style="height: 49px; width: 49px;">
                                    <img src="./images/chatBK.jpg" alt="" class="_Ypng">
                                </div>
                            </div>
                            <div class="msginfo">
                                <div role="gridcell" aria-colindex="2" class="friendname">
                                    <div class="_3nzy">
                                        <span class="_4nzy">
                                            <span class="namefinal">
                                                ${data.val().name}
                                            </span>

                                        </span>
                                    </div>
                                    <div id="lastmsgtime">18:45</div>




                                </div>
                                <div class="lastmsgcontainer">
                                    <div class="_2lmsc">
                                        <span class="lastmsgspan">
                                        <span dir ="ltr" id= "lastmsg">Hello Konichiwa mina</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> `
                    i++;
                } else {

                    userf.innerHTML += `<li> <div class="userlist"><img src="'${user.PhotoUrl}'"> <button type="submit" onclick = "StartChat('${data.key}','${data.val().name}')">"${data.val().name}"</button></div> </li> `
                }
                StartChat("some");
            }

        });
    })
}

// msgForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
    e.preventDefault();
    const text = msgInput.value;

    if (!text.trim()) return alert('Please type a message'); //no msg submitted
    const msg = {
        userID: currentUserKey,
        name: document.getElementById("Hello").innerHTML,
        text: text
    };

    db.ref("chatMessages").child(chatKey).push(msg);
    msgInput.value = "";
}

function updateMsgs(

) {

    db.ref("/chatMessages").child(chatKey).on('value', function(msgs) {
        var messageDisplay = '';
        msgs.forEach(data => {
            var chat = data.val();
            if (chat.userID != currentUserKey) {
                messageDisplay += `<li class="${ "msg"}"><span class = "msg-span">${chat.text}`
            } else {
                messageDisplay += `<li class="${ "my"}"><span class = "msg-span">${chat.text}`

            }

        })
        document.getElementById('messages').innerHTML = messageDisplay;
        document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
    });

}

// document.getElementById("logout").addEventListener("click", e => {
//     e.preventDefault();
//     var user = firebase.auth()
//     if (user) {
//         user.signOut();
//     }

// })