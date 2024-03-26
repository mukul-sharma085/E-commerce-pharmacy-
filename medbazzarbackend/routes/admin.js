var express = require('express')
var router = express.Router();
var pool = require('./pool');


router.post('/check_admin_login', function(req, res, next) {
    pool.query('select * from admins where emailid = ? and password=?',[req.body.emailid,req.body.password], function(error,result ){
        if(error)
        { console.log(error)
            res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'})
        }
        else
        {   console.log(result)
            if(result.length===1){
                res.status(200).json({status:true,message:'Success',data:result[0]})
            }
            else {
                res.status(200).json({status:false,message:'Invalid Username or Password'})
            }
        } 
    })
});


module.exports = router
