const express = require("express");
const app = express();
const {response} = require("express");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
const request = require("request");

const client = require("@mailchimp/mailchimp_marketing");

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;

  client.setConfig({
   apiKey: "5aa73a00789bcfafd9f00a54aef38b24-us12",
   server: "us12"
 });

 const run = async () => {
 const response = await client.lists.batchListMembers("354b36f89f", {
   members: [{
     email_address: email,
     status:"subscribed",
     merge_fields:{
       FNAME:firstName,
       LNAME:lastName
     }
   }],
 });
 console.log(response);
   res.send("<h1>Successfull !!! 👍</h1>");
};
run().catch(e => res.sendFile(__dirname+"/failure.html"))
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});


//api key
//5aa73a00789bcfafd9f00a54aef38b24-us12

//list // IDEA:
// 354b36f89f
