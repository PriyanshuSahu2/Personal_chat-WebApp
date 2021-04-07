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
firebase.initializeApp(firebaseConfig);

document.getElementById("submitBtn").addEventListener('click', loginwith);


function loginwith() {

    var email = document.getElementById("loginField").value;
    var password = document.getElementById("passwordField").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            alert("signIn");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    // [END auth_signup_password]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            window.location = "index.html";
        } else {
            alert("absent")
        }
    });
}