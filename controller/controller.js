var redis = require("redis") // redis server is used to store the cache , so this server must be initiated
const redis_port = process.env.SECRET_REDIS;//secret port number is given in env files
const client = redis.createClient(redis_port)
var { Translate } = require('@google-cloud/translate').v2;
require('events').EventEmitter.prototype._maxListeners = 100; //event listener limited to 100 so that
//app must not crash in any way. It will help from crashing the server

exports.apphome = function (req, res) {
  const trans = " ";
  res.render('home', { lang: trans });
  console.log("it is  working")
  
  client.on("error", (err) => { //if client is not connected it will not allow to continue
    console.log(err);
  })
  client.on("connect", () => {
    console.log("connection established");//once client is connected it will allow to continue
  })

}
exports.appabout = function (req, res) {

  res.render('about');
  console.log("it is a  working") //this renders the about page

}
// ................................................................................................
exports.appview = function (req, res) {
  async function quickStart() {

    const translate = new Translate(
      {

        keyFilename: process.env.FILE_NAME, //secret file number is given in env files
        project_id: process.env.ID_NAME, //secret id numberis given in env files
        private_key_id: process.env.SECRET //secret api key is given in env files
      
      });

    var trans = req.body.lang;//from home .ejs form name lang is collected from body
    var transb = req.body.language; //from home .ejs option tag name language is collected from body
    const text = `${trans}`;
    const textb = `${transb}`;
  
    console.log(`Text: ${text}`);
    console.log("text:", textb);
    const [translation] = await translate.translate(text,transb);//this helps to translate after the value of data collected
    console.log(`Translation: ${translation}`);

    
    client.setex('lang', 40, JSON.stringify(translation)); //cache is created where key is 'lang' , 40 is the expiration time
    //and the translated data is converted into string

 
  client.get('lang',  function (err, redis_data) {

      if (err) {
        throw err;
      }
     if (redis_data) {
       
        res.render('home', { lang: translation });//if the cache is stored previuosly then it will show output with better way to the client
      }
      else  {
        client.setex('lang', 40, JSON.stringify(translation)); //if the data is not stored as cache initially then it will store now on key 'lang'
       
        res.render('home', { lang: translation });
             }

    }
    
    );

  }

  quickStart();

}


