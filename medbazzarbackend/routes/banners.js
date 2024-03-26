var express = require('express')
var router  = express.Router()
var pool = require('./pool')

var upload = require('./multer')

router.post('/submit_banners',upload.any(),function(req,res,next){
     try{

         var files=req.files.map((item)=>{
            return item.filename
         })

          pool.query("insert into banners (brandid,bannertype,picture) values(?,?,?)",[req.body.brandid,req.body.bannertype,files+""],function(error,result){
             if(error){
               console.log(error)
                res.status(200).json({status:false,message:"Server Error:Pls connect Database Administrator"})
             } else {
               console.log(result)
                res.status(200).json({status:true,message:'success',data:result})
             }
          })
     } 
     catch(e){
      console.log(e)
        res.status(200).json({status:false,message:"Server Error:Pls connect Server Administrator"})
     }
})

module.exports=router
