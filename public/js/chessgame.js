const socket = io();
socket.emit("literal") 
// socket.on -  recive from backend
socket.on("literal 2ish", function(){
    console.log("recived literal 2is");
})