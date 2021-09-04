require('dotenv').config() //.env helps to secure the Api Key


const express = require('express') //express framework is used 


var app = express()

const port = process.env.PORT;

var bodyParser = require('body-parser') //it will help it collect from body of the selected form 
const router = require("./router");
// .................................................
app.set("views","views");
app.engine('html', require('ejs').renderFile); //HTML is rendered in ejs , template engine 
app.set('view engine', 'html');



app.set('view engine','ejs')

 app.use(express.static('views'))
// .................using web pages........
app.engine('html',require('ejs').renderFile);
app.engine('about',require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json()) //input data will be convert to JSON format
app.use("/",router)



///.......listening server.........
app.listen(port, ()=>{
  console.log(`The application started successfully on port ${port}`);
});


