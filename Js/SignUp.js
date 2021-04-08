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


// let email = document.getElementById("Emailinput").value;
// let password = document.getElementById("password-input").value;
// let confirmpassword = document.getElementById("confirm-password-input").value;
document.getElementById("login-btn").addEventListener("click", create);
document.getElementById("signinBtn").addEventListener("click", function() {
    window.location = "login.html";
});

function create(email, password, confirmpassword, firstname, lastname) {
    firstname = document.getElementById("FirstName").value;
    lastname = document.getElementById("LastName").value;
    email = document.getElementById("Emailinput").value;
    password = document.getElementById("password-input").value;
    confirmpassword = document.getElementById("confirm-password-input").value;
    if (password == confirmpassword) {


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = firebase.auth().currentUser;

                const details = {
                    name: firstname + " " + lastname,
                    email: email,

                };
                firebase.database().ref("users").child(user.uid).set(details)
                return user.updateProfile({
                    displayName: firstname + " " + lastname
                })

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });

    } else {
        alert("password is not same");
    }

}
var id = null;

function myMove() {
    var elem = document.querySelector(".signin");
    console.log(elem)
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.left = pos + 'px';

        }
    }
}