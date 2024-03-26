import { useState } from "react";
import { useStyles } from "./BrandCSS";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData } from "../../services/fetchNodeservices";
import Swal from "sweetalert2";
import { Button,Grid,TextField,Avatar } from "@mui/material";

export default function Brand (props){
    var Classes = useStyles()
    const [brand, setBrand] = useState('')
    const [error, setError] = useState({})
    const [picture, setPicture] = useState({file:'icon.png',bytes:''})
     //handlePicture
     //handleError
     //handleReset
     //handleSubmit
     
     const handlePicture = (event) => {
           setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
     }

     const handleError = (label,msg)=> {
        setError((prev)=>({...prev,[label]:msg}))
     }
     
     const handleReset = ()=> {
        setBrand('')
        setPicture({file:'icon.png',bytes:''})
     }

     const handleSubmit = async()=> {
        var submit = true
         if(brand.length==0){
           handleError('brand','Pls input brand name..')
           submit=false
         }

         if(picture.bytes.length==0){
            handleError('picture','Pls choose icon.. ')
            submit=false 
        }
        if(submit){
            var formData = new FormData()
            formData.append('brandname',brand)
            formData.append('picture',picture.bytes)
            var result = await postData('brand/submit_brand',formData)
            if(result.status){
                Swal.fire({
                    icon:"success",
                    title:result.message,
                    timer:1500
                })
            } else {
                Swal.fire({
                    icon:"error",
                    title:result.message,
                    timer:1500
                })
            }
        }
     }
     


    return (
        <div className={Classes.root}>
            <div className={Classes.box}>
            <Grid container spacing={3}>
         <Grid item xs={12}>
       <TitleComponent title="Add New Brand" logo="medbazar.jpg" listicon="medlist.png"  page="/admindashboard/displayallbrand" />
         </Grid>
         <Grid item xs={12}>
            <TextField value={brand} onFocus={()=> handleError('brand',null)} error={error.brand} helperText={error.brand} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth/>
         </Grid>
         <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
               Upload
               <input onClick={()=> handleError('picture',null)} onChange={handlePicture} type="file" hidden accept='images/*' multiple />
            </Button>
            {error.picture?<span style={{color:'red', fontSize:12, marginLeft:'4%'}}>{error.picture}</span>:<></>}
           

         </Grid>
         <Grid item xs={6} style={{display:'flex', justifyContent:'center' }}>
         <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
         </Grid>
         <Grid item xs={6}>
             <Button onClick={handleSubmit} variant="contained" fullWidth>
                Submit
             </Button>
         </Grid>
         <Grid item xs={6}>
             <Button onClick={handleReset} variant="contained" fullWidth>
                Reset
             </Button>
         </Grid>


       </Grid>
            </div>

        </div>
    )
}