var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

//submit_subcategory
//diaplay_all_subcateegory
//edit_subcategory_data
//edit_subcategory_picture
//delete_subcategory_data

router.post('/submit_subcategory',upload.single('picture'),function(req,res,next){
    try{
        pool.query("insert into subcategory (categoryid,subcategoryname,picture) values(?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.file.filename],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
            }
            else{
              res.status(200).json({status:true,message:'subcategory submitted succesfully... '})
            }
        })
      } 
      catch(e){
        res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
      }
})

router.get('/display_all_subcategory',function(req,res,next){
  console.log('Route triggered!');
    try{
        pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S ",function(error,result){
            if(error){
              console.log(error)
               res.status(200).json({status:false,message:'Server Error: Pls contact database administrator...'})
            }
            else{
              console.log(result)
              res.status(200).json({status:true,message:'Success',data:result})
            }
        })
      } 
      catch(e){
        console.log(e)
        res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
      }
})

router.post('/edit_subcategory_data',function(req,res,next){
    try{
        pool.query("update subcategory set categoryid=?, subcategoryname=? where subcategoryid=?",
        [req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
            if(error){
              console.log(error)
               res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
            }
            else{
              res.status(200).json({status:true,message:'subcategory updated succesfully... '})
            }
        })
      } 
      catch(e){
        res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
      }
})

router.post('/edit_subcategory_picture',upload.single('picture'),function(req,res,next){
    try{
        pool.query("update subcategory set picture=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
            if(error){
               res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
            }
            else{
              res.status(200).json({status:true,message:'picture updated succesfully... '})
            }
        })
      } 
      catch(e){
        res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
      }
})

router.post("/delete_subcategory_data",function(req,res,next){
    try{
        pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
             }
             else{
               res.status(200).json({status:true,message:'subcategory deleted succesfully... '})
             }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
      }
})

router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
  try
  {
      pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
          if(error)
          {
              res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'}) 
          }
          else
          {
              res.status(200).json({status:true,message:'Success',data:result})
          }
      })
  }
  catch(e)
  {
      res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'}) 
  }
})

module.exports = router