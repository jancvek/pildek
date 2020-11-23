const express = require('express');
const path = require('path');
const app = express();

console.log("Express server started...");
console.log("Listening on port 4000...");

app.use(express.static(path.join(__dirname,'build','index.html')));
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});
app.get('/api/test', function(req,res){
    console.log("/api/test");

    res.json({dela: 'dela'});
});
app.listen(4000)