const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));


const secret="tasksecret";


// REGISTER

app.post("/register",(req,res)=>{

let {name,email,password}=req.body;


bcrypt.hash(password,10,(err,hash)=>{

db.query(
"INSERT INTO users(name,email,password) VALUES(?,?,?)",
[name,email,hash],

(err,result)=>{

if(err)
return res.send(err);


res.json({
message:"User Registered"
});

});


});


});




// LOGIN

app.post("/login",(req,res)=>{

let {email,password}=req.body;


db.query(
"SELECT * FROM users WHERE email=?",
[email],

(err,result)=>{


if(result.length==0)
return res.json({
message:"User not found"
});


bcrypt.compare(password,result[0].password,

(err,match)=>{


if(match){

let token=jwt.sign(
{id:result[0].id},
secret
);


res.json({
message:"Login success",
token:token
});


}

else{

res.json({
message:"Wrong password"
});

}


});


});


});




// GET TASKS

app.get("/tasks",(req,res)=>{


db.query(
"SELECT * FROM tasks",
(err,result)=>{

res.json(result);

});


});




// ADD TASK

app.post("/tasks",(req,res)=>{


let {title,status}=req.body;


db.query(

"INSERT INTO tasks(title,status) VALUES(?,?)",

[title,status],

(err,result)=>{


res.json({
message:"Task Added"
});


});


});




// UPDATE TASK

app.put("/tasks/:id",(req,res)=>{


let id=req.params.id;

let {title,status}=req.body;


db.query(

"UPDATE tasks SET title=?,status=? WHERE id=?",

[title,status,id],

()=>{

res.json({
message:"Updated"
});

});


});





// DELETE TASK

app.delete("/tasks/:id",(req,res)=>{


db.query(

"DELETE FROM tasks WHERE id=?",

[req.params.id],

()=>{

res.json({
message:"Deleted"
});


});


});



app.listen(3000,()=>{

console.log("Server running on port 3000");

});
