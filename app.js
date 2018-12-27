var express = require('express');
var app = express();
//required to connect to sql
var mysql = require('mysql');
//required to grab email from html form and insert to db
var bodyParser = require('body-parser');


//Setting engine to use embedded javascript like showing the count of users
app.set("view engine", "ejs");
//Body parsing initialization 
app.use(bodyParser.urlencoded({extended: true}));
//allows us to use our htmlcss files
app.use(express.static(__dirname + "/public"));

//setting up connection to our database
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'jonniboi',
    database : 'joinus'
});

//Set homepage and find and respond with count of users 
app.get("/", function(req, res){
    //find count from db
    var q = 'select count(*) as count from users';
    connection.query(q, function(error, results){
        if (error) throw error;
        var count = results[0].count;
        //display result on home which is the html file
        res.render('home', {number: count});
    });
    
});

//just jokes here 
app.get("/randomnumber", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.get("/joke", function(req, res){
    res.send("What the first thing the elfs learned at Santa School? The Elfabeth");
});

app.listen(8080, function(){
    console.log("Server working on 8080");
});

//parsing the email address and inserting it into our DB
app.post("/register", function(req, res){
    
    //here is bodyparser in action
    var person = { email: req.body.email};
    
    //using mysql package to insert it into the actual mysql
    connection.query('insert into users set ?', person, function(error, results){
    if (error) throw error;
    res.redirect("/");
    });
});

