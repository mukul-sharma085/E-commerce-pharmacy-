var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

//submit_concern
//displayallconcern
//editconcerndata
//editconcernpicture
//deleteconcern



router.post('/submit_concern',upload.single('picture'),function(req,res,next){
    try{
          pool.query('insert into concern (concernname,picture) values(?,?)',[req.body.concernname,req.file.filename],function(error,result){
               if(error){
                res.status(200).json({status:false,message:'Pls contact Database Admin'})
               } else {
                res.status(200).json({status:true,message:'success'})
               }
          })
    }
    catch(e){
            res.status(200).json({status:false,message:'Pls contact server admin'})
    }
})

router.get('/display_all_concern',function(req,res){
    try{
      pool.query("select * from concern",function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {  console.log(result)
          res.status(200).json({status:true,message:'Success',data:result})
  
       }
      
      })
  
   }
    catch(e)
    {
      console.log('Error:',e)
        res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
      
  })

  router.post('/edit_concern_data',function(req, res, next) {
    try{
      pool.query("update concern set concernname=? where concernid=?",[req.body.concernname,req.body.concernid],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Concern Updated successfully'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });

  router.post('/edit_concern_picture',upload.single('picture'), function(req, res, next) {
    try{
      pool.query("update concern set picture=? where concernid=?",[req.file.filename,req.body.concernid],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Picture Updated Successfully...'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });

  router.post('/delete_concern_data', function(req, res, next) {
    try{
      pool.query("delete from concern where concernid=?",[req.body.concernid],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
          res.status(200).json({status:true,message:'Concern Deleted Successfully...'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });
  
module.exports=router