const messageForm = document.querySelector("form");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");
const sendLocationButton = document.querySelector("#sendLocation");
const messages = document.querySelector("#messages");

const socket = io();

const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML; 

socket.on("message",(message)=>
{
    //document.querySelector("h1").innerHTML = message;
    console.log(message.text);
    const html = Mustache.render(messageTemplate,{message:message.text,createdAt:moment(message.createdAt).format('h:mm a')});
    messages.insertAdjacentHTML("beforeend",html);
});
socket.on("locationMessage",(url)=>
{
    const html = Mustache.render(locationTemplate,{location:url.text,createdAt:moment(url.createdAt).format('h:mm a')});
    messages.insertAdjacentHTML("beforeend",html);
});

messageForm.addEventListener("submit", (e)=>
{
    e.preventDefault();
    messageFormButton.setAttribute("disabled","disabled");
    const message = messageFormInput.value;
    socket.emit("sendMessage", message,(acknowledgement)=>
    {
        messageFormButton.removeAttribute("disabled");
        messageFormInput.value="";
        messageFormInput.focus();
        //console.log("The message was delievered!");
        console.log(acknowledgement);
    });
});
sendLocationButton.addEventListener("click",(e)=>
{
    sendLocationButton.setAttribute("disabled","disabled");
    if(!navigator.geolocation)
    {
        return alert('Geolocation is not supported by yur browser!');
    }
    navigator.geolocation.getCurrentPosition((position)=>
    {
        console.log(position);
        socket.emit("sendLocation",{latitude:position.coords.latitude,longitude:position.coords.longitude},(acknowledgement)=>
        {
            sendLocationButton.removeAttribute("disabled");
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