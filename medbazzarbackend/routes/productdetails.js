var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

//submit_productdetails
//edit_productdetail_data
//edit_productdetail_picture
//display_all_productdetails with get mehod
//delete_productdetails

router.post('/submit_productdetails',upload.any(),function(req,res,next){
    try{
        
       var files=req.files.map((item)=>{
        return item.filename
       })

         pool.query('insert into productdetails (categoryid, subcategoryid, brandid, productid, productsubname, description, weight, weighttype, type, packaging, qty, price, offerprice, offertype, picture,concernid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productsubname, req.body.description, req.body.weight, req.body.weighttype, req.body.type, req.body.packaging, req.body.qty, req.body.price, req.body.offerprice, req.body.offertype, files+"",req.body.concernid],function(error,result){
            if(error){
              console.log(error)
               res.status(200).json({status:false,message:'Server Error:Pls connect Database Administrator'})
            } else
            { console.log(result)
               res.status(200).json({status:true,message:'Productdetail Submitted Successfully...',data:result})
       
            }
           
           })
       
       
         }
         catch(e)
         {  console.log(e)
           console.log('Error:',e)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
         }
})

router.get("/display_all_productdetails",function(req,res,next){
    try{
          pool.query('select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid ) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid = P.subcategoryid) as subcategoryname ,(select B.brandname from brand B where B.brandid = P.brandid) as brandname, (select Pro.productname from products Pro where Pro.productid = P.productid ) as productname,(select Con.concernname from concern Con where Con.concernid = P.concernid ) as concernname from productdetails P',function(error,result){
            if (error)
            {   console.log(error)
                res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
            }
            else
            {console.log(result)
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {    console.log(e)
        res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
    }
          
    
    
})

router.post('/delete_productdetails',function(req,res,next){
    try{
           pool.query('delete from productdetails where productdetailid=?',[req.body.productdetailid],function(error,result){
            if(error){
               res.status(200).json({status:false,message:'Server error:Pls contact database Administrator'})
            } else {
               res.status(200).json({status:true,data:result,message:'record deleted successfully'})
            }
           })
    }
    catch(e){
             res.status(200).json({status:false,message:'Server Error:Pls connect server Admin'})
    }
})

router.post('/edit_productdetail_picture',upload.single('picture'),function(req,res,next){
    try{ 
         pool.query('update productdetails set picture=? where productdetailid=?',[req.file.filename,req.body.productdetailid],function(error,result){
        if(error){
               res.status(200).json({status:false,message:'server error:Pls connect database administrator'})
        } else{
             res.status(200).json({data:result,status:true,message:'picture updated successfully'})
        }
    })
         
    }
    catch(e){
          res.status(200).json({status:false,message:"pls contact server admin"})
    }
})

router.post('/edit_productdetail_data',function(req,res,next){
      try{
             pool.query('update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=?, productsubname=?, description=?, weight=?, weighttype=?, type=?, packaging=?, qty=?, price=?, offerprice=?, offertype=?, concernid=? where productdetailid=? ', [
              req.body.categoryid,
              req.body.subcategoryid,
              req.body.brandid,
              req.body.productid,
              req.body.productsubname,
              req.body.description,
              req.body.weight,
              req.body.weighttype,
              req.body.type,
              req.body.packaging,
              req.body.qty,
              req.body.price,
              req.body.offerprice,
              req.body.offertype,
              req.body.concernid,
              req.body.productdetailid
          ],function(error,result){
                   if(error){
                    console.log('BADA ERROR H YAR',error)
                     res.status(200).json({status:false,message:'Pls contact database administrator'})
                   } else {
                     res.status(200).json({status:true,data:result,message:'Product detail updated successfully'})
                   }
             })
      } 
      catch(e){
        res.status(200).json({status:false,message:'Pls contact server admin'})
      }
})

module.exports=router