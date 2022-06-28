const socket = io();

socket.on("message",(message)=>
{
    // document.querySelector("h2").innerHTML = message;
    console.log(message);
});

document.querySelector("form").addEventListener("submit", (e)=>
{
    e.preventDefault();
    const message = document.querySelector("input").value;
    socket.emit("sendMessage", message,(acknowledgement)=>
    {
        //console.log("The message was delievered!");
        console.log(acknowledgement);
    });
});
document.querySelector("#sendLocation").addEventListener("click",(e)=>
{
    if(!navigator.geolocation)
    {
        return alert('Geolocation is not supported by yur browser!');
    }
    navigator.geolocation.getCurrentPosition((position)=>
    {
        console.log(position);
        socket.emit("sendLocation",{latitude:position.coords.latitude,longitude:position.coords.longitude},(acknowledgement)=>
        {
            console.log(acknowledgement);
        });
    });
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