const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1/usersDB",{useNewUrlParser:true})


const userSchema = new mongoose.Schema({
       email:String,
       password:String
});

const User = mongoose.model("User",userSchema);



app.get("/",function(req,res){
    res.render("home")
});

app.get("/login",function(req,res){
       res.render("login")
});

app.get("/register",function(req,res){
     res.render("register")
});


app.post("/register",function(req,res){

   const newUser = new User({
          email : req.body.username,
          password : req.body.password
   });

   newUser.save(function(err){
      if(err){
         console.log(err);
      }else{
         res.render("secrets")
      }
   })

})

app.post("/login",function(req,res){
    
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},function(err,foundUser){
           
          if(err){
             console.log(err);
          }else{
              if(foundUser){
                   if(foundUser.password === password){
                        res.render("secrets")
                   }
              }
          }



    })


})


app.listen(3000,function(){
     console.log("Server is listening at PORT 3000...");
})
