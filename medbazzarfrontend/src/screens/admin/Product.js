import { useState, useEffect } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material";
import { productStyles } from "./ProductCSS";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData,getData } from "../../services/fetchNodeservices";
import Swal from "sweetalert2";
//handlePicture
//handleError
//handleReset
//handleSubmit

export default function Product (){
    
    var Classes = productStyles()

    const [ categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [subcategoryId,setSubcategoryId]=useState('')
    const [subcategoryList,setSubcategoryList]=useState([])
    const [picture,setPicture]=useState({file:'icon.png',bytes:''})
    const [product,setProduct ]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState({})

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const fetchAllSubcategory =async(cid)=>{
        var result = await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status){
            setSubcategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllSubcategory()},[])
    
    const fillAllSubcategory=()=>{
        return subcategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }
    const fetchAllBrand=async()=>{
        var result=await getData('brand/display_all_brand')
        if(result.status){
            // console.log(result.data)
            {setBrandList(result.data)}
        }
    }
    useEffect(function(){fetchAllBrand()},[])
    const fillAllBrand =()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid} >{item.brandname}</MenuItem>
        })
    }
    
    const fetchAllCategory = async()=>{
        var result =await getData('category/display_all_category')
        if(result.status){
            setCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllCategory()} ,[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid} >{item.categoryname}</MenuItem>
        })
    }
    
    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategory(event.target.value)
    }
    const handleSubmit =async()=>{
        var submit=true
        if(categoryId.length===0){
            handleError('categoryId','Pls choose Category')
            submit=false
        }
        if(subcategoryId.length===0){
            handleError('subcategoryId','Pls choose Subcategory')
            submit=false
        }
        if(brandId.length===0){
            handleError('branndId','Pls choose Brand')
            submit=false
        }
        if(product.length===0){
            handleError('product','Pls input Product name')
            submit=false
        }
        if(description.length===0){
            handleError('description','Pls Input Product Description')
            submit=false
        }
        if(picture.bytes===0){
            handleError('picture','Pls choose Icon')
            submit=false
        }
        if(submit){
            var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subcategoryId)
            formData.append('brandid',brandId)
            formData.append('productname',product)
            formData.append('description',description)
            formData.append('picture',picture.bytes)
            var result =await postData('product/submit_product',formData)
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
                    timer:1400
                })
            }

        }

        //handleReset()
    }

    const handleReset = ()=>{
        setCategoryId('')
        setBrandId('')
        setSubcategoryId('')
        setProduct('')
        setDescription('')
        setPicture({file:'icon.png'})
    }

    return(
        <div className={Classes.root}>
            <div className={Classes.box} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TitleComponent title="Add New Product" logo="medbazar.jpg" listicon="medlist.png" page="/admindashboard/displayallproduct" />
                </Grid>
                <Grid item xs={4}>
                   <FormControl fullWidth >
                     <InputLabel>Category</InputLabel>
                     <Select 
                     label="Category"
                     value={categoryId}
                     onChange={handleCategoryChange}
                     error={error.categoryId}
                     onFocus={()=>handleError('categoryId',null)}
                     >
                        {fillAllCategory()}
                     </Select>
                     {error.categoryId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
                   </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Subcategory</InputLabel>
                    <Select
                     label="Subcategory"
                     value={subcategoryId}
                     onChange={(event)=>setSubcategoryId(event.target.value)}
                     error={error.subcategoryId}
                     onFocus={()=>handleError("subcategoryId",null)}
                    >
                        {fillAllSubcategory()}
                    </Select>
                    {error.subcategoryId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}}> {error.subcategoryId}</span>:<></>}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl  fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                        label="brand"
                        value={brandId}
                        onChange={(event)=>setBrandId(event.target.value)}
                        error={error.brandId}
                        onFocus={()=>handleError('brandId',null)}>
                            {fillAllBrand()} 
                        </Select>
                        {error.brandId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField value={product} onFocus={()=>handleError("product",null)} error={error.product} helperText={error.product} onChange={(event)=>setProduct(event.target.value)} label="Product Name" fullWidth  />
                </Grid>
                <Grid item xs={12}>
                   <TextField onFocus={()=>handleError("description",null)} value={description} error={error.description} helperText={error.description} onChange={(event)=>setDescription(event.target.value)} label="Product Description" fullWidth  />
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