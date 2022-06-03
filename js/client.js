const socket = io();
let messageArea = document.querySelector(".message-container");

let textarea = document.getElementById("textarea");
let name;
do {
  name = prompt("Please enter a username :");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //Send it to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  //creating Element
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  //Creating Markup
  let markup = `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`;
  
  //Inserting markup in DOM
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Recieving message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

//Scrolling To Bottom
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
function appendUser(name) {
  //creating Element
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("new-user");

  //Creating Markup
  let markup = `${name} joined the chat`;
  //Inserting markup in DOM
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);

  scrollToBottom();
}

//When new user joines
//Sending user info
socket.emit("new-user", name);
//Recieving user info
socket.on("new-user",(name)=>{
    appendUser(name)
});
