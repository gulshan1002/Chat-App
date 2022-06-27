const express = require("express");
const app = express();
app.get("/", function(req, res)
{
    res.send("Hello World!");
});
app.listen(3000, function(err)
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

