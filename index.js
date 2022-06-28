const Filter = require("bad-words");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let count=0;

io.on("connection", (socket)=>
{
    console.log("New websocket Connection!");
    socket.emit("message","Welcome!");
    socket.broadcast.emit("message","A new User has Joined!");
    socket.on("sendMessage", (data,callback)=>
    {
        const filter = new Filter();
        if(filter.isProfane(data))
        {
            return callback("Profanity is not allowed!");
        }
        io.emit("message", data);
        callback("Message Delivered!");
    });

    // socket.emit("countUpdate",count);
    // socket.on("increment",()=>
    // {
    //     count++;
    //     //socket.emit("countUpdate",count);
    //     io.emit("countUpdate",count);
    // });
    socket.on("disconnect",()=>
    {
            io.emit("message", "A user has left the chat!");
    });

    socket.on("sendLocation",(location, callback)=>
    {
        io.emit("locationMessage",`https://google.com/maps?q=${location.latitude},${location.longitude}`);
        callback("Location shared Successfully!");
    });
});

app.get("/", function(req, res)
{
    res.render("chat");
});



server.listen(3000, function(err)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is listening on port: 3000");
    }
});

