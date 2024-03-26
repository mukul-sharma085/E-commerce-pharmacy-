import  {useState} from "react"
import { Button,Grid,TextField, Avatar } from "@mui/material"
import {useStyles} from "./CategoriesCSS"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData } from "../../services/fetchNodeservices"
import Swal from "sweetalert2"


export default function Categories (props){
  var Classes=useStyles()
  const [category, setCategory]= useState('')
  const [error, setError]= useState({})
  const [picture,setPicture]= useState({file:'icon.png',bytes:''})
  
  const handlePicture = (event) => {
     
         setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0] })
  } 
  
   const handleError = (label,msg) => {
       setError((prev)=>({...prev,[label]:msg}))
   } 

   const handleReset = () => {

       setCategory('')
       setPicture({file:'icon.png',bytes:''})

   }
    
   const handleSubmit = async() => {
      var submit = true
       if(category.length==0){
        handleError('category','Pls input category name...')
       submit = false
      }
       if(picture.bytes.length==0){
         handleError('picture','Pls choose icon...')
        submit = false
      }
      if(submit){
         var formData = new FormData();

  // Append regular form fields to FormData
  formData.append('categoryname', category);

  // Append the file to FormData
  formData.append('picture', picture.bytes);

       var result = await postData('category/submit_category',formData)
       if(result.status){
          
         Swal.fire({
            icon: "success",
            title: result.message,
            timer: 1200
          });


       } else {
           
         Swal.fire({
            icon: "error",
            title: result.message,
            
          });

       }
      }
   }

 return (<div className={Classes.root}>
    <div className={Classes.box}>
      <Grid container spacing={3}>
         <Grid item xs={12}>
       <TitleComponent title="Add New Category" logo="medbazar.jpg" listicon="medlist.png" page="/admindashboard/displayallcategory" />
         </Grid>
         <Grid item xs={12}>
            <TextField value={category} onFocus={() => handleError('category',null)} error={error.category} helperText={error.category} onChange={(event)=>setCategory(event.target.value)} label="Category Name" fullWidth/>
         </Grid>
         <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
               Upload
               <input onClick={() => handleError('picture',null)} onChange={handlePicture} type="file" hidden accept='images/*' multiple />
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

 </div>)

}