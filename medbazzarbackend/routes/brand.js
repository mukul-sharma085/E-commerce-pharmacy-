var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

//submit
//edit brannd data
//edit brand picture
//delete brand
//display brand

router.post('/submit_brand',upload.single('picture'),function(req,res,next){
    try{
      pool.query("insert into brand (brandname,picture) values(?,?)",
      [req.body.brandname,req.file.filename],function(error,result){
        if(error){
          res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})

        } else {
            res.status(200).json({status:true,message:"Brand submitted successfully"})
        }
      })
    } 
    catch(e){
        res.status(200).json({status:false,message:"server error: pls contact administrator"})
    }
})

router.get('/display_all_brand',function(req,res,next){
  try{
     pool.query("select * from brand where brandid!=0",function(error,result){
      if(error){
        res.status(200).json({status:false,message:'Server Error: Pls contact database administrator...'})
      } else{
        res.status(200).json({status:true,message:'Success',data:result})
      }
     })
  }
  catch(e){
      res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }
})

router.post('/edit_brand_data',function(req,res,next){
  try{
    pool.query("update brand set brandname=? where brandid=?",[req.body.brandname,req.body.brandid],function(error,result){
      if(error){
        res.status(200).json({status:false,message:"Server Error:Pls contact database Administrator."})
      } else {
        res.status(200).json({status:true,message:"Brand updated successfully"})
      }
    })

  } 
  catch(e)
  {
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }
})

router.post('/edit_brand_picture',upload.single('picture'),function(req,res,next){
  try{
     pool.query("update brand set picture=? where brandid=?",[req.file.filename,req.body.brandid],function(error,result){
      if(error){
        res.status(200).json({status:false,message:'server error: pls contact database administrator...'})
      } else {
        res.status(200).json({status:true,message:'picture updated successfully..'})
      }
     })
  } 
  catch(e){
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }
})

router.post('/delete_brand_data',function(req,res,next){
  try{
    pool.query("delete from brand where brandid=?",[req.body.brandid],function(error,resullt){
      if(error){
        res.status(200).json({status:false,message:'server error: pls contact database administrator...'})
      } else {
        res.status(200).json({status:true,message:'Record deleted successfully...'})
      }
    })
  } 
  catch(e){
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }
})

module.exports=router