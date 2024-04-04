const express = require("express");
let app = express();
let port = 8080 ;
let path = require("path");
const mysql = require("mysql2");
app.set("view engine" , "ejs");
app.set("views" , (path.join(__dirname , "/views")))
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}))
// establish connection with databse
const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hiddenbrain',
    password:"Nikhil@221314"
});
app.listen(port , ()=>{
    console.log("connection establosh with the port 8080");
})
app.get("/" , (req,res)=>{
    res.render("main.ejs");
})
app.post("/new/user" , (req,res)=>{
    let{username , password} = req.body;
    let data = [username , password];
    let q = "INSERT INTO user(username,password) VALUES (?,?)";
    connection.query(q , data , (err , result)=>{
        if(err) throw err ;
        res.render("login.ejs");
    })
});