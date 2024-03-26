var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/submit_category',upload.single('picture'), function(req, res, next) {
  try{
    pool.query("insert into category (categoryname,picture) values(?,?)",[req.body.categoryname,req.file.filename],function(error,result){
        if(error){
           res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
        }
        else{
          res.status(200).json({status:true,message:'category submitted succesfully... '})
        }
    })
  } 
  catch(e){
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }

});

router.get('/display_all_category',function(req,res,next){

  try{
    pool.query("select * from category ",function(error,result){
        if(error){
           res.status(200).json({status:false,message:'Server Error: Pls contact database administrator...'})
        }
        else{
          res.status(200).json({status:true,message:'Success',data:result})
        }
    })
  } 
  catch(e){
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }

})

router.post('/edit_category_data', function(req, res, next) {
  try{
    pool.query("update category set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid],function(error,result){
        if(error){
           res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
        }
        else{
          res.status(200).json({status:true,message:'category updated succesfully... '})
        }
    })
  } 
  catch(e){
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }

});

router.post('/update_category_picture', upload.single('picture'), function(req, res, next) {
  try{
    pool.query("update category set picture=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){
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

});

router.post('/delete_category_data', function(req, res, next) {
  try{
    pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
        if(error){
           res.status(200).json({status:false,message:'Server Error: Pls contact daatabase administrator...'})
        }
        else{
          res.status(200).json({status:true,message:'category deleted succesfully... '})
        }
    })
  } 
  catch(e){
    res.status(200).json({status:false,message:'server error: pls contact server administrator...'})
  }

});


module.exports = router;
