const express = require('express');
const path = require('path');
const app = express();

var sqlite3 = require('sqlite3').verbose();

// CONNECT TO SQL
let db = new sqlite3.Database('pildek.db', (err) => {
    if(err){
        console.log('Failed to connected to pildek.db.');
        return console.error(err.message);
    }
    console.log('Connected to pildek.db.');
})

console.log("Express server started...");
console.log("Listening on port 4000...");

// ONLY IN PRODUCTION
// routing to index.html
app.use(express.static(path.join(__dirname,'build','index.html')));

// routing to static files
app.use(express.static(path.join(__dirname,'build')));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});

// INPUT PARAMS:
// table - mandatory
// name - optional
app.get('/api/getData', function(req,res){
    console.log("/api/getData");

    // table is mandatory prop
    if(!req.query.table ){
        console.log("Missing input parameter: table!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    // name is optional
    if(req.query.name){

        let sql = "SELECT * FROM "+req.query.table+" WHERE name='"+req.query.name+"' ORDER BY category";

        db.get(sql,(err, row) => {
          if(err){
            // TODO:
            throw err;
          }
          
  
          if(!row){
            console.log("No data to get data from db! Query: "+sql+ " result: " +row);

            res.status(204).send(); // 204 No Content
            return;
          }
  
          if(req.query.table == "data"){
            res.status(200).json({"id": row.id, "name": row.name, "is_checked": row.is_checked});
          }else if(req.query.table == "store"){
            res.status(200).json({"id": row.id, "name": row.name});
          }else{
            res.status(500).send(); // 500 Internal server error
            return;
          }       
        })
      }else{
        let sql = "SELECT * FROM "+req.query.table+" ORDER BY category";
        db.all(sql, [], (err, rows) => {
          if(err){
            throw err;
          }
    
          var array = [];
    
          rows.forEach((row) => {
            console.log(row.name);

            if(req.query.table == "data"){
                array.push({"id":row.id, "name": row.name, "is_checked": row.is_checked});
            }
            else if(req.query.table == "store"){
                array.push({"id":row.id, "name": row.name});
            }
            else{
                res.status(500).send(); // 500 Internal server error
                return;
            }
            
          });
        
          res.status(200).json(array);
          return;
        })
    }


});

// INPUT PARAMS:
// id - mandatory
// check - mandatory
app.get('/api/setData', function(req,res){
    console.log("/api/setData");

    // id is mandatory
    if(!req.query.id)
    {
        console.log("Missing input parameter: id!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    // check is mandatory
    if(!req.query.check ){
        console.log("Missing input parameter: check!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    let sql = "UPDATE data SET is_checked = "+req.query.check+" WHERE id = '"+req.query.id+"'";

    db.run(sql,(err,row) => {
      if(err){
        //TODO:
        throw err;
      }
      res.status(200).json({status: 'OK'});
      return;
    })
});

// INPUT PARAMS:
// table - mandatory
// name - mandatory
// category - mandatory
app.get('/api/addData', function(req,res){
    console.log("/api/addData");

    // table is mandatory
    if(!req.query.table)
    {
        console.log("Missing input parameter: table!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    // name is mandatory
    if(!req.query.name)
    {
        console.log("Missing input parameter: name!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    // category is mandatory
    if(!req.query.category)
    {
        console.log("Missing input parameter: category!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    let sql = "INSERT INTO "+req.query.table+" (name,category) VALUES ('"+req.query.name+"','"+req.query.category+"')";

    db.run(sql,function (err) {
      if(err){
        // TODO:
        throw err;
      }

      res.status(200).json({status: 'OK', id: this.lastID});
      return;
    })
});

// INPUT PARAMS:
// table - mandatory
// id - mandatory
app.get('/api/deleteData', function(req,res){
    console.log("/api/deleteData");

    // table is mandatory
    if(!req.query.table)
    {
        console.log("Missing input parameter: table!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    // id is mandatory
    if(!req.query.id)
    {
        console.log("Missing input parameter: id!");

        res.status(400).send(); // 400 Bad Request
        return;
    }

    let sql = "DELETE FROM "+req.query.table+" WHERE id = '"+req.query.id+"'";

    db.run(sql,function (err) {
      if(err){
        // TODO:
        throw err;
      }

      res.status(200).json({status: 'OK'});
      return;
    })
});

app.listen(4000)