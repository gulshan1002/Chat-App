const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));
app.set('view engine', 'ejs');

io.on("connection", ()=>
{
    console.log("New websocket Connection!");
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

