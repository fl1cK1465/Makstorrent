const express = require('express')

const app = express();

app.listen(5000, function() {
    console.log('running');
});
app.get("/" , (req, res) => {
    res.sendFile(__dirname+"/1.html")
})
