const express = require('express')

let app = express();

app.listen(63342, function() {
    console.log('running');
});
app.get("/" , (req, res) => {
    res.sendFile(__dirname+"/1.html")
})
