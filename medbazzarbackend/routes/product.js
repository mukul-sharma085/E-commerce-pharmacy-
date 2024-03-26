var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

//submit_product
//display_all_product
//edit_product_data
//edit_product_picture
//delete_product


router.post('/submit_product',upload.single('picture') ,function (req, res,next){
    try{
        pool.query("insert into products (categoryid,subcategoryid,brandid,productname,description,picture) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.file.filename],function(error,result){

            if(error)
            { console.log(error)
                res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'})
            }
            else
            {
                res.status(200).json({status:true,message:'Product Submitted Succesfully.....'})
            }
        })
    }
    catch(e)
    {    console.log(e)
        res.status(200).json({status:false,message:'Server Error: Pls Contact To Server Administrator.....'})
    }
})

router.get("/display_all_product",function(req,res,next){
    try{
        pool.query("select P.*,(select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid = P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid = P.brandid) as brandname  from products P",function(error,result){
          
            if (error)
            {
                res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
    }
})

router.post('/edit_product_data',function(req,res,next){
    try{ 
        pool.query("update products set categoryid=?,subcategoryid=?,brandid=?,productname=?,description=? where productid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.productid],function(error,result){

       if(error)
            {console.log(error)
                res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator'})
            }
            else
            {
                res.status(200).json({status:true,message:'Product Updated Succesfully...'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error: Pls Contact to Server Administrator'})
    }
})

router.post("/edit_product_picture",upload.single('picture'),function(req,res,next){

    try{
        pool.query("update products set picture=? where productid=?",[req.file.filename,req.body.productid],function(error,result){
        if(error)
        {
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
        else
        {
          res.status(200).json({status:true,message:'Picture Updated Successfully.....'})
        }
      } )
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
    }

})

router.post("/delete_product",function(req,res,next){
       try{
        pool.query("delete from products where productid=? ",[req.body.productid],function(error,result){
            if(error)
            {
              res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
            }
            else
            {
              res.status(200).json({status:true,message:'Subcategory Deleted Successfully.....'})
            }
          } )
        }
        catch(e)
        {
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
})

router.post('/fetch_all_products_by_brandid',function(req,res,next){
    try{
      pool.query('select * from products where brandid=?',[req.body.brandid],function(error,result){
        if(error)
            { console.log(error)
              res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
            }
            else
            { console.log(result)
              res.status(200).json({status:true,message:'Success',data:result})
            }
          } )
        }
        catch(e)
        { console.log(e)
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
})

module.exports = router