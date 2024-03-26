import { useState, useEffect } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material";
import { useStyles } from "./SubcategoryCSS";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData,getData } from "../../services/fetchNodeservices";
import Swal from "sweetalert2";
//handlePicture
//handleError
//handleReset
//handleSubmit


export default function Subcategory (props){
    var Classes = useStyles()
    const [subcategory,setSubcategory]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [categoryList,setCategoryList]=useState([])

    const fetchAllCategory=async()=>{

        var result=await getData('category/display_all_category')
        if(result.status){
           setCategoryList(result.data)
        }
   
       }
       useEffect(function(){
         fetchAllCategory()
       },[])

    const fillAllCategory=()=>{
        return(
            categoryList.map((item)=>{
                return(
                    <MenuItem value={item.categoryid} >
                        {item.categoryname}
                    </MenuItem>
                )
            })
        )
    }
    
    const handlePicture = (event) => {
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleError = (label,msg) =>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    const handleReset = ()=>{
        setCategoryId('')
        setSubcategory('')
        setPicture({file:'icon.png',bytes:''})
    }
    const handleSubmit = async()=>{
        var submit=true
        if(categoryId.length===0){
          handleError('categoryId','Pls input category id')
          submit=false
        }
        if(Subcategory.length===0){
            handleError('Subcategory','Pls input Subcategory name..')
            submit = false
        }
        if(picture.bytes.length===0){
            handleError('picture','Pls choose icon..')
            submit = false
        }
        if(submit){
            var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subcategory)
            formData.append('picture',picture.bytes)

            var result = await postData('subcategory/submit_subcategory',formData)
            if(result.status){
                Swal.fire({
                    icon:"success",
                    title:result.message,
                    timer:1200
                })
            } else {
                Swal.fire({
                    icon:"error",
                    title:result.message
                })
            }
        }
    }
    return (
        <div className={Classes.root}>
          <div className={Classes.box}>
          <Grid container spacing={3}>
         <Grid item xs={12}>
       <TitleComponent title="Add New Subcategory" logo="medbazar.jpg" listicon="medlist.png" page="/admindashboard/displayallsubcategory" />
         </Grid>
         <Grid item xs={12}>
            
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                   label="Category"
                   value={categoryId}
                   onChange={(event)=>{setCategoryId(event.target.value)}}
                >{fillAllCategory()}</Select>
            </FormControl>
         </Grid>
         <Grid item xs={12}>
            <TextField value={subcategory} onFocus={() => handleError('subcategory',null)} error={error.subcategory} helperText={error.subcategory} onChange={(event)=>setSubcategory(event.target.value)} label="Subategory Name" fullWidth/>
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
        </div>
    )
}