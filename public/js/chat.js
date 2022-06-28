const socket = io();

socket.on("message",(message)=>
{
    document.querySelector("h2").innerHTML = message;
});

document.querySelector("form").addEventListener("submit", (e)=>
{
    e.preventDefault();
    const message = document.querySelector("input").value;
    socket.emit("sendMessage", message);
});

// socket.on("countUpdate",(count)=>
// {
//     console.log("Count has been updated successfully!",count);
// });
// document.getElementById("increment").addEventListener("click", ()=>
// {
//     console.log("clicked!");
//     socket.emit("increment");
// });