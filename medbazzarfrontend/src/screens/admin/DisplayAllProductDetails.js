import MaterialTable from "@material-table/core";
import { productDetailStyles } from "./ProductDetailsCSS";
import { useState, useEffect } from "react";
import { getData, postData, serverURL } from "../../services/fetchNodeservices";
import * as React from 'react';
import { Button,Grid,TextField, Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TitleComponent from "../../components/admin/TitleComponent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

//handleError
//fetchAllSubcategory
//fillAllSubcategory
//fetchAllBrands
//fillAllBrands
//fetchAllCategory
//fillAllCategory
//fetchAllProducts
//fillAllProducts
//handleCategoryChange
//handleBrandChange
//handleEditData
//handleEditPicture
//handleDelete
//fetchAllProductDetails
//handleClose
//handleOpen
//handleCancel
//handleWeightChange
//handleTypeChange
//handlePackagingChange
//handleOfferTypeChange
//showProductDetailForm
//showAllProductDetail

export default function DisplayAllProductDetails(){
            
        var Classes = productDetailStyles()
        var navigate = useNavigate()

        const [concernId,setConcernId]=useState('')
        const [concernList,setConcernList]=useState([])
        const [categoryId,setCategoryId]=useState('')
        const [categoryList,setCategoryList]=useState([])
        const [brandId,setBrandId]=useState('')
        const [brandList,setBrandList]=useState([])
        const [subcategoryId,setSubcategoryId]=useState('')
        const [subcategoryList,setSubcategoryList]=useState([])
        const [productId,setProductId]=useState('')
        const [productList,setProductList]=useState([])
        const [productsubname,setProductsubname]=useState('')
        const [description,setDescription]=useState('')
        const [weight,setWeight]=useState('')
        const [weightType,setWeightType]=useState('')
        const [type,setType]=useState('')
        const [packaging,setPackaging]=useState('')
        const [qty,setQty]=useState('')
        const [price,setPrice]=useState('')
        const [offerPrice,setOfferPrice]=useState('')
        const [offerType,setOfferType]=useState('')
        const [picture,setPicture]=useState({file:'icon.png',bytes:''})
        const [tempPicture,setTempPicture]=useState('')
        const [error,setError]=useState({})
        const [showBtn,setShowBtn]=useState(false)
        const [open,setOpen]=useState(false)
        const [productDetailId,setProductDetailId]=useState('')
        const [productDetailData,setProductDetailData]=useState([])


        const handleError=(label,msg)=>{
              setError((prev)=>({...prev,[label]:msg}))
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

    const handleCategoryChange = (event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategory(event.target.value)
      }
      const handleBrandChange = (event)=>{
        setBrandId(event.target.value)
        fetchAllProducts(event.target.value)
      }

      const handleEditData=async()=>{
        var submit=true

        if(productsubname.length==0)
        {
            handleError('productsubname','Pls Input Product Subname')
            submit=false
        }
        if(description.length==0)
        {
            handleError('description','Pls Input description')
            submit=false
        }
        if(weight.length==0)
        {
            handleError('weight','Pls Input Weight')
            submit=false
        }
        if(qty.length==0)
        {
            handleError('qty','Pls Input Quantity')
            submit=false
        }
        if(price.length==0)
        {
            handleError('price','Pls Input Price')
            submit=false
        }
        if(offerPrice.length==0)
        {
            handleError('offerPrice','Pls Input Offerprice')
            submit=false
        }

        if(submit)
        {
            var body ={productdetailid:productDetailId,categoryid:categoryId,concernid:concernId,subcategoryid:subcategoryId,brandid:brandId,productid:productId,productsubname:productsubname,description:description,weight:weight,weighttype:weightType,type:type,packaging:packaging,qty:qty,price:price,offerprice:offerPrice,offertype:offerType}
            var result=await postData('productdetails/edit_productdetail_data', body)

            if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer:1500,
                    toast:true
                  });
            }

        fetchAllProductDetails()  

        }
    }

    const handleEditPicture=async()=>{
        var formData = new FormData()
        formData.append('productdetailid',productDetailId)
        formData.append('picture',picture.bytes)
        var result = await postData('productdetails/edit_productdetail_picture',formData)
        if(result.status)
              {
                  Swal.fire({
                      icon: "Success",
                      title: result.message,
                      timer:1500,
                      toast:true
                    });
              }
              else
              {
                  Swal.fire({
                      icon: "error",
                      title: result.message,
                      timer:1500,
                      toast:true
                    });
              }
              fetchAllProductDetails()
    }

    const handleDelete = (rowData) => {
        Swal.fire({
          title: "Confirm Delete",
          toast: true,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Don't delete`
        }).then(async (result) => {
          if (result.isConfirmed) {
            var body = { productdetailid: rowData.productdetailid };
            var serverResponse = await postData('productdetails/delete_productdetails', body);
      
            if (serverResponse.status) {
              Swal.fire("Deleted!", "", "success");
              fetchAllProductDetails(); // Refresh the data
            } else {
              Swal.fire("Error!", "The record could not be deleted.", "error");
            }
          } else if (result.isDenied) {
            Swal.fire("Your record is not deleted", "", "info");
          }
        });
      };

      const fetchAllProductDetails = async()=>{
        var result = await getData('productdetails/display_all_productdetails')
        if(result.status){
            setProductDetailData(result.data)
        }

    }
    useEffect(function(){fetchAllProductDetails()},[])

    const handleClose=()=>{
        setOpen(false)
    }

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.targe.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const handleCancel=()=>{
        setPicture({file:tempPicture,bytes:''})
  
        setShowBtn(false)
   
    }

    const handleWeightChange=(event)=>{
        setWeightType(event.target.value)
    }

    const handleTypeChange=(event)=>{
        setType(event.target.value)
    }

    const handlePackagingChange=(event)=>{
        setPackaging(event.target.value)
    }

    const handleOffertypeChange=(event)=>{
        setOfferType(event.target.value)
    }

    const handleOpen=(rowData)=>{
            setOpen(true)
            setConcernId(rowData.concernid)
            fetchAllSubcategory(rowData.categoryid)
            fetchAllProducts(rowData.brandid)
            setProductDetailId(rowData.productdetailid)
            setCategoryId(rowData.categoryid)
            setSubcategoryId(rowData.subcategoryid)
            setBrandId(rowData.brandid)
            setProductId(rowData.productid)
            setProductsubname(rowData.productsubname)
            setDescription(rowData.description)
            setWeight(rowData.weight)
            setWeightType(rowData.weighttype)
            setType(rowData.type)
            setPackaging(rowData.packaging)
            setQty(rowData.qty)
            setPrice(rowData.price)
            setOfferPrice(rowData.offerprice)
            setOfferType(rowData.offertype)
            setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
            setTempPicture(`${serverURL}/images/${rowData.picture}`)


    }

    const showProductDetailForm=()=>{
        return(
            <Dialog 
            open={open}
            onClose={handleClose}
            maxWidth={'lg'}
            >
                <DialogContent>
                  <div className={Classes.boxDisplay}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} >
                       <TitleComponent title="Edit Product Detail" logo="medbazar.jpg" listicon="medlist.png" page="/displayallproduct" />
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
                     <ReactQuill theme="snow" value={description} onChange={(e)=>setDescription(e)} />
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
                       <MenuItem value={"Injections"}>Injections</MenuItem></Select>
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
            
            {showBtn?<div style={{display:'flex', justifyContent:'space-evenly'}} ><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<>

            <Button variant="contained" component="label" fullWidth>
               Set New Picture
               <input onClick={() => handleError('picture',null)} onChange={handlePicture} type="file" hidden accept='images/*' multiple />
            </Button>
           {error.picture?<span style={{color:'red', fontSize:12, marginLeft:'4%'}}>{error.picture}</span>:<></>}
           </>}
         </Grid>
         <Grid item xs={6} style={{display:'flex', justifyContent:'center' }}>
         <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
         </Grid>

                    </Grid>
                  </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleEditData}>Edit Data</Button>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }
    
    function showAllProductdetail() {
        return (
          <MaterialTable
             
            title="Main Productdetail"
            columns={[
              { title: 'ProductdetailId', field: 'productdetailid' },
              { title: 'Category',  render:(rowData)=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div><div>{rowData.concernname}</div></div>  },
            
              { title: 'Product', render:(rowData)=><div><div>{rowData.brandname}</div><div>{rowData.productname} {rowData.productsubname} {rowData.weight} {rowData.weighttype}</div></div>  },
              { title: 'Type', render:(rowData)=><div><div>{rowData.qty} {rowData.type}</div><div>{rowData.packaging} </div></div> },
   
              
              { title: 'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice} </div></div>  },
               
              { title: 'Offertype', field: 'offertype' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(",")[0]}`} style={{width:60,height:60,borderRadius:30}}/></> },
               
            ]}
            data={productDetailData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit productdetails',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'delete productdetails',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
               icon: 'add',
               tooltip: 'Add New Product Detail',
               isFreeAction: true,
               onClick: (event) => navigate('/admindashboard/productdetails')
              }
            ]}
            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,7,10]
            }}
          />
        )
      }


    return(
        <div>
            <div>
         {showAllProductdetail()}
            </div>
            {showProductDetailForm()}
        </div>
    )
}