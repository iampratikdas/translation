const express= require("express")
const router=express.Router()
const controller=require("../controller/controller")
const fs = require('fs');
router.get('/',controller.apphome)

router.get('/about',controller.appabout)
 router.post('/views',controller.appview)
  module.exports=router;