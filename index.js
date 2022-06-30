const Filter = require("bad-words");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const {generateMessage} = require("./utils/messages");
const {addUser,removeUser,getUser,getUserInRoom} = require("./utils/users");

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
    // socket.emit("message",generateMessage("Welcome!"));
    // socket.broadcast.emit("message",generateMessage("A new User has Joined!"));

    socket.on("join",({username,room})=>
    {
        socket.join(room);
        socket.emit("message",generateMessage("Welcome!"));
        socket.broadcast.to(room).emit("message",generateMessage(`${username} has joined!`));

        // socket.emit(), io.emit(), socket.broadcast.emit()
        // io.to.emit(), socket.broadcast.emit()
    });
    socket.on("sendMessage", (data,callback)=>
    {
        const filter = new Filter();
        if(filter.isProfane(data))
        {
            return callback("Profanity is not allowed!");
        }
        io.to("1234").emit("message", generateMessage(data));
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
            io.emit("message", generateMessage("A user has left the chat!"));
    });

    socket.on("sendLocation",(location, callback)=>
    {
        io.emit("locationMessage",generateMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback("Location shared Successfully!");
    });
});

app.get("/", function(req, res)
{
    res.render("index");
});
app.get("/chat",function(req,res)
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

