import { useState, useEffect } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material";
import { productDetailStyles } from "./ProductDetailsCSS";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData,getData } from "../../services/fetchNodeservices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useMemo } from "react";

//handlePicture
//handleError
//handleReset
//handleSubmit
//fetchAllSubCategory
//fillAllSubcategory
//fetchAllBrands
//fillAllBrands
//fetchAllCategory
//fillAllCategory
//fetchAllProducts
//fillAllProducts
//fetchAllConcern
//fillAllConcern
//handleCategoryChange
//handleBrandChange



export default function ProductDetails(){
   
    var Classes = productDetailStyles()

    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', "strike"],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['image', "link","video"],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
        ],
        
      },
    }), [])

    var [categoryId,setCategoryId]=useState('')
    var [subcategoryId,setSubcategoryId]=useState('')
    var [brandId,setBrandId]=useState('')
    var [productId,setProductId]=useState('')
    const [concernId,setConcernId]=useState('')
    const [concernList,setConcernList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subcategoryList,setSubcategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [picture,setPicture]=useState({file:[],bytes:''})
    const [productsubname,setProductsubname]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [offerType,setOfferType]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState('')

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handlePicture =(event)=>{
        //setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
         if(Object.values(event.target.files).length<=3){
          alert("Pls upload 3 or more files")
         } else {
          setPicture({file:Object.values(event.target.files),bytes:event.target.files})
         }
      }

    const fetchAllSubcategory=async(cid)=>{
         var result = await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
          if(result.status){
            setSubcategoryList(result.data)
          }
        }
        useEffect(function(){fetchAllSubcategory()},[])
    const fillAllSubcategory = ()=>{
        return subcategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        }) 
    }    

    const fetchAllBrands=async()=>{
        var result = await getData('brand/display_all_brand')
        if(result.status){
            setBrandList(result.data)
        }
    }
    useEffect(function(){fetchAllBrands()},[])
    const fillAllBrands = ()=>{
       return brandList.map((item)=>{
        return <MenuItem value={item.brandid} >{item.brandname}</MenuItem>
       })
    }

   const fetchAllCategory = async ()=>{
    var result = await getData('category/display_all_category')
      if(result.status){
          setCategoryList(result.data)
      }
   }
   useEffect(function(){fetchAllCategory()},[])
   const fillAllCategory = ()=>{
     return categoryList.map((item)=>{
       return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })
   }
   
   const fetchAllProducts = async(cid)=>{
      var result =await postData('product/fetch_all_products_by_brandid',{brandid:cid})
      if(result.status){
        setProductList(result.data)
      }
   }
  useEffect(function(){fetchAllProducts()},[])
  const fillAllProducts = ()=>{
    return productList.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })
  }
   
  const fetchAllConcern = async()=>{
      var result= await getData('concern/display_all_concern')
      if(result.status){
        setConcernList(result.data)
      }
  }
 useEffect(function(){fetchAllConcern()},[])

  const fillAllConcern = ()=>{
    return concernList.map((item)=>{
      return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
    })
  }



  const handleCategoryChange = (event)=>{
    setCategoryId(event.target.value)
    fetchAllSubcategory(event.target.value)
  }
  const handleBrandChange = (event)=>{
    setBrandId(event.target.value)
    fetchAllProducts(event.target.value)
  }

  const handleSubmit = async  ()=>{
       var submit = true;

       if(concernId.length===0){
        handleError('concernId','Pls choose Concern ')
        submit=false
       }

       if(categoryId.length===0){
        handleError('categoryId','Pls Choose Category')
        submit=false
       }
       if(subcategoryId.length===0){
        handleError('subcategoryId','Pls Choose Subcategory')
        submit=false
       }
       if(brandId.length===0){
        handleError('brandId','Pls Choose Brand')
        submit=false
       }
       if(productId.length===0){
        handleError('productId','Pls choose Product')
        submit=false
       }
       if(productsubname.length===0){
        handleError('productsubname','Pls Input Product Subname')
        submit=false
       }
       if(description.length===0){
        handleError('description','Pls Input Description')
        submit=false
       }
       if(weight.length===0){
        handleError('weight','Pls Input Weight')
        submit=false
       }
       if(weightType.length===0){
        handleError('weightType','Pls input weight type ')
        submit=false
       }
       if(type.length===0){
        handleError('type','Pls Input Type')
        submit=false
       }
       if(packaging.length===0){
        handleError('packaging','Pls input packaging')
        submit=false
       }
       if(qty.length===0){
        handleError('qty','Pls input Quantity')
        submit=false
       }
       if(price.length===0){
        handleError('price','Pls input Price')
        submit=false
       }
       if(offerPrice.length===0){
        handleError('offerPrice','Pls input OfferPrice')
        submit=false
       }
       if(offerType.length===0){
        handleError('offerType','Pls input offerType')
        submit=false
       }
       if(picture.bytes===0){
        handleError('picture','Pls choose icon')
        submit=false
       }
       if(submit){
           var formData = new FormData()
           formData.append('concernid',concernId)
           formData.append('categoryid',categoryId)
           formData.append('subcategoryid',subcategoryId)
           formData.append('brandid',brandId)
           formData.append('productid',productId)
           formData.append('productsubname',productsubname)
           formData.append('description',description)
           formData.append('weight',weight)
           formData.append('weighttype',weightType)
           formData.append('type',type)
           formData.append('packaging',packaging)
           formData.append('qty',qty)
           formData.append('price',price)
           formData.append('offerprice',offerPrice)
           formData.append('offertype',offerType)
           //formData.append('picture',picture.bytes)
           picture?.file?.map((item,index)=>{
            formData.append('picture'+index,item)
           }) 

           var result = await postData('productdetails/submit_productdetails',formData)
           if(result.status){
            Swal.fire({
                icon:"Success",
                title:result.message,
                timer:1500
            })
           } else {
               Swal.fire({
                icon:'Error',
                title:result.message,
                timer:1500
               })
           }

       }
  }
   
   

  const handleReset = ()=>{
    setConcernId('')
    setCategoryId('')
    setBrandId('')
    setSubcategoryId('')
    setProductId('')
    setProductsubname('')
    setDescription('')
    setWeight('')
    setWeightType('')
    setType('')
    setPackaging('')
    setQty('')
    setPrice('')
    setOfferPrice('')
    setOfferType('')
    setPicture({file:[]})
  }

  const showImages=()=>{
    return picture?.file?.map((item)=>{
        return (<div style={{margin:2}} ><Avatar alt="Remy Sharp" variant="rounded" src={URL.createObjectURL(item)} /></div>)
    })
  }

    return(
        <div className={Classes.root} >
            <div className={Classes.box} >
               <Grid container spacing={2} >
                   <Grid item xs={12} >
                       <TitleComponent title="Add Product Detail" logo="medbazar.jpg" listicon="medlist.png" page="/admindashboard/displayallproductdetails" />
                   </Grid>
                   <Grid item xs={3} >
                       <FormControl fullWidth >
                          <InputLabel>Category</InputLabel>
                          <Select
                           label="Category"
                           value={categoryId}
                           onChange={handleCategoryChange}
                           error={error.categoryId}
                           onFocus={()=>handleError('categoryId',null)}
                           >{fillAllCategory()}</Select>
                           {error.categoryId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}} >{error.categoryId}</span>:<></>}
                       </FormControl>
                   </Grid>
                   <Grid item xs={3} >
                       <FormControl fullWidth >
                          <InputLabel>Subcategory</InputLabel>
                          <Select
                           label="Subcategory"
                           value={subcategoryId}
                           onChange={(event)=>setSubcategoryId(event.target.value)}
                           error={error.subcategoryId}
                           onFocus={()=>handleError('subcategoryId',null)}
                           >{fillAllSubcategory()}</Select>
                           {error.subcategoryId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}} >{error.subcategoryId}</span>:<></>}
                       </FormControl>
                   </Grid>
                   <Grid item xs={3} >
                       <FormControl fullWidth >
                          <InputLabel>Brand</InputLabel>
                          <Select
                           label="Brand"
                           value={brandId}
                           onChange={handleBrandChange}
                           error={error.brandId}
                           onFocus={()=>handleError('brandId',null)}
                           >{fillAllBrands()}</Select>
                           {error.brandId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}} >{error.brandId}</span>:<></>}
                       </FormControl>
                   </Grid>
                   <Grid item xs={3} >
                       <FormControl fullWidth >
                          <InputLabel>Product</InputLabel>
                          <Select
                           label="Product"
                           value={productId}
                           onChange={(event)=>setProductId(event.target.value)}
                           error={error.productId}
                           onFocus={()=>handleError('productId',null)}>
                        {fillAllProducts()}</Select>
                        {error.productId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}} >{error.productId}</span>:<></>}
                       </FormControl>
                   </Grid>
                   <Grid item xs={9} >
                     <TextField value={productsubname} onFocus={()=>handleError('productsubname',null)}  error={error.productsubname}  helperText={error.productsubname} onChange={(event)=>setProductsubname(event.target.value)} label="Product Subname" fullWidth />
                   </Grid>
                   <Grid item xs={3} >
                       <FormControl fullWidth >
                          <InputLabel>Concern</InputLabel>
                          <Select
                           label="Concern"
                           value={concernId}
                           onChange={(event)=>setConcernId(event.target.value)}
                           error={error.concernId}
                           onFocus={()=>handleError('concernId',null)}
                           >{fillAllConcern()}</Select>
                           {error.concernId?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}} >{error.concernId}</span>:<></>}
                       </FormControl>
                   </Grid>

                   <Grid item xs={12} >
                     <ReactQuill modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} />
                   </Grid>
                   <Grid item xs={3} >
                       <TextField value={weight} onFocus={()=>handleError('weight',null)}  error={error.weight}  helperText={error.weight} onChange={(event)=>setWeight(event.target.value)} label="Input Weight" fullWidth/>
                   </Grid>
                   <Grid item xs={3} >
                      <FormControl fullWidth >
                       <InputLabel>Weight Type</InputLabel>
                       <Select
                         label="Weighttype"
                         value={weightType}
                         onChange={(event)=>setWeightType(event.target.value)}
                         error={error.weightType}
                         onFocus={()=>handleError('weighttype',null)}
                       ><MenuItem value={'mg'}>mg</MenuItem>
                       <MenuItem value={'ml'}>ml</MenuItem>
                       <MenuItem value={'gm'}>gm</MenuItem>
                       <MenuItem value={'kg'}>kg</MenuItem>
                       <MenuItem value={'mm'}>mm</MenuItem>
                       <MenuItem value={'liter'}>liter</MenuItem></Select>
                       {error.weightType?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}}> {error.weightType}</span>:<></>}
                      </FormControl>
                   </Grid>
                   <Grid item xs={3} >
                      <FormControl fullWidth >
                       <InputLabel>Type</InputLabel>
                       <Select
                       label="type"
                       value={type}
                       onChange={(event)=>setType(event.target.value)}
                       error={error.type}
                       onFocus={()=>handleError('type',null)}
                       > <MenuItem value={"Tablet"}>Tablet</MenuItem>
                       <MenuItem value={"Capsules"}>Capsules</MenuItem>
                       <MenuItem value={"Drops"}>Drops</MenuItem>
                       <MenuItem value={"Syrup"}>Syrup</MenuItem>
                       <MenuItem value={"Powder"}>Powder</MenuItem>
                       <MenuItem value={"Gel"}>Gel</MenuItem>
                       <MenuItem value={"Spray"}>Spray</MenuItem>
                       <MenuItem value={"Cream"}>Cream</MenuItem>
                       <MenuItem value={"Bar"}>Bar</MenuItem>
                       <MenuItem value={"Lotion"}>Lotion</MenuItem>
                       <MenuItem value={"Injections"}>Injections</MenuItem>
                       <MenuItem value={"Others"}>Others</MenuItem></Select>
                       {error.type?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}}> {error.type}</span>:<></>}
                      </FormControl>
                   </Grid>
                   <Grid item xs={3} >
                      <FormControl fullWidth >
                       <InputLabel>Packaging</InputLabel>
                       <Select
                       label="packaging"
                       value={packaging}
                       onChange={(event)=>setPackaging(event.target.value)}
                       error={error.packaging}
                       onFocus={()=>handleError('packaging',null)}
                       > <MenuItem value={"Bottles"}>Bottles</MenuItem>
                       <MenuItem value={"Packs"}>Packs</MenuItem></Select>
                       {error.packaging?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}}> {error.packaging}</span>:<></>}
                      </FormControl>
                   </Grid>
                   <Grid item xs={3} >
                      <TextField value={qty} onFocus={()=>handleError('qty',null)}  error={error.qty} onChange={(event)=>setQty(event.target.value)} helperText={error.qty}  fullWidth label="Input quantity" />
                   </Grid>
                   <Grid item xs={3} >
                      <TextField value={price} onFocus={()=>handleError('price',null)}  error={error.price} onChange={(event)=>setPrice(event.target.value)} helperText={error.price} fullWidth label="Input price" />
                   </Grid>
                   <Grid item xs={3} >
                      <TextField value={offerPrice} onFocus={()=>handleError('offerprice',null)}  error={error.offerPrice}  onChange={(event)=>setOfferPrice(event.target.value)} helperText={error.offerPrice} fullWidth label="Input offerprice" />
                   </Grid>
                   <Grid item xs={3} >
                      <FormControl fullWidth >
                       <InputLabel>Offer type</InputLabel>
                       <Select
                         label="offertype"
                         value={offerType}
                         onChange={(event)=>setOfferType(event.target.value)}
                         error={error.offertype}
                         onFocus={()=>handleError('offertype',null)}
                       ><MenuItem value={"Month end sale"}>Month end sale</MenuItem>
                        <MenuItem value={"Clearance Sale"} >Clearance Sale</MenuItem></Select>
                        {error.offerType?<span style={{fontSize:13,margin:'2%',color:'#d32f2f'}} >{error.offerType}</span>:<></>}
                      </FormControl>
                   </Grid>
                   <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                  Upload
                  <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.picture}</span>:<></>}

               </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                {showImages()}
            </Grid>

            <Grid item xs={6}>
                <Button  onClick={handleSubmit} variant="contained" fullWidth>
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