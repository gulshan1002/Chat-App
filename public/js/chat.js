const socket = io();
socket.on("countUpdate",(count)=>
{
    console.log("Count has been updated successfully!",count);
});
document.getElementById("increment").addEventListener("click", ()=>
{
    console.log("clicked!");
    socket.emit("increment");
});