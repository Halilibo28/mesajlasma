function init() {
    var firebaseConfig = {
        apiKey: "AIzaSyBdBja-tHMaTdfl6ej3AkbVrFkY-U1bdrY",
        authDomain: "thecodefather-f30a7.firebaseapp.com",
        databaseURL: "https://thecodefather-f30a7-default-rtdb.firebaseio.com/",
        projectId: "thecodefather-f30a7",
        storageBucket: "thecodefather-f30a7.appspot.com",
        messagingSenderId: "850651955724",
        appId: "1:850651955724:web:7c70a9bea518594cd7a429"
    };
    firebase.initializeApp(firebaseConfig);



    ref = firebase.database().ref("messages");

    firebase.database().ref("messages").on("child_added", (snapshot) => {
        var html = '';
        if (snapshot.val().sender == myName) {
            html += '<li class="message mine">';
            html += '<p class="text">' + snapshot.val().message + '</p>';
            html += '<span class="date">' + tarihCevir(snapshot.val().time) + '</span>';
            html += '</li>';
        }
        else {
            html += '<li class="message">';
            html += '<p class="text">' + snapshot.val().message + '</p>';
            html += '<span class="date">' + tarihCevir(snapshot.val().time) + '</span>';
            html += '<span class="sender">' + snapshot.val().sender + '</span>';
            html += '</li>';
        }
        messages.innerHTML += html;
        messages.scroll({ behavior: "smooth", top: 999999999999999 });
    });
}

function sohbeteBasla() {
    myName = nameInput.value;
    if (myName.length > 0) {
        console.log(myName)
        login.classList.add("hidden");
        init();
    }
}

function tarihCevir(stamp) {
    var dt = new Date(stamp);
    var s = "0" + dt.getHours();
    var d = "0" + dt.getMinutes();
    var format = s.substring(+1) + ":" + d.substring(+1);
    return format;
}

function mesajGonder() {
    var msg = document.getElementById("myInput").value;
    if (msg.length > 0) {
        ref.push().set({
            sender: myName,
            message: msg,
            time: firebase.database.ServerValue.TIMESTAMP
        });
    }
    document.getElementById("myInput").value = "";
}

var login = document.querySelector(".login");
var nameInput = document.getElementById("myName");
var messages = document.getElementById("messages");
messages.innerHTML = "";
var myName = "";
var ref;