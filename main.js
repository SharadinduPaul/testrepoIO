const chatform = document.getElementById("chatform");
const chatcontent = document.getElementById("chatcontent");
const socket = io();

socket.on("msg", (msg) => {
  console.log(msg);
});
socket.on("chatMessage", (msg) => {
  console.log(msg);
  const h3 = document.createElement("h3");
  h3.innerHTML = msg;
  chatcontent.appendChild(h3);
});
chatform.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  //   console.log(msg);
  socket.emit("chatmsg", msg);
  e.target.elements.msg.value = "";
});
