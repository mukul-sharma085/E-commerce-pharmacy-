
import MaterialTable from "@material-table/core";
import { productStyles } from "./ProductCSS";
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

export default function DisplayAllProduct (){
          
          var Classes = productStyles()
          var navigate = useNavigate()

          const [productData,setProductData]=useState([])
          const [open,setOpen]=useState(false)
          const [error,setError]=useState({})
          const [picture,setPicture]=useState({file:'md.png',bytes:''})
          const [description,setDescription]=useState('')
          const [productId,setProductId]=useState('')
          const [product,setProduct]=useState('')
          const [categoryList,setCategoryList]=useState([])
          const [subcategoryList,setSubcategoryList]=useState([])
          const [brandList,setBrandList]=useState([])
          const [subcategoryId,setSubcategoryId]=useState('')
          const [categoryId,setCategoryId]=useState('')
          const [brandId,setBrandId]=useState('')
          const [showBtn,setShowBtn]=useState(false)
          const [tempPicture,setTempPicture]=useState('')
      
        const handleError=(label,msg)=>{
            setError((prev)=>({...prev,[label]:msg}))
        }
        
        const handlePicture = (event)=>{
           setPicture(({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}))
           setShowBtn(true)
        }
        
        const fetchAllSubcategory = async(cid)=>{
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

        const fetchAllBrand = async()=>{
            var result = await getData('brand/display_all_brand')
            if(result.status){
                setBrandList(result.data)
            }
        }
        useEffect(function(){fetchAllBrand()},[])
        const fillAllBrand = ()=>{
            return brandList.map((item)=>{
                return <MenuItem value={item.brandid} >{item.brandname}</MenuItem>
            })
        }

        const fetchAllCategory = async()=>{
             var result = await getData('category/display_all_category')
             if(result.status){
                setCategoryList(result.data)
             }
        }
        useEffect(function(){fetchAllCategory()},[])
        const fillAllCategory =()=>{
            return categoryList.map((item)=>{
                return <MenuItem value={item.categoryid} >{item.categoryname}</MenuItem>
            })
        }
        
        const handleCategoryChange=(event)=>{
            setCategoryId(event.target.value)
            fetchAllSubcategory(event.target.value)
        }

        const fetchAllProduct=async()=>{
            var result = await getData('product/display_all_product')
            if(result.status){
                setProductData(result.data)
            }
        }
        useEffect(function(){fetchAllProduct()},[])
        
        const handleCancel =()=>{
            setPicture({file:tempPicture,bytes:''})
            setShowBtn(false)
        }

        const handleEditData=async()=>{
             var submit=true
             if(categoryId.length===0){
                handleError("categoryId",'Pls input Category')
                submit=false
             }
             if(subcategoryId.length===0){
                handleError("subcategoryId",'Pls input Subcateegory')
                submit=false
             }
             if(brandId.length===0){
                handleError("brandId",'Pls input brand')
                submit=false
             }
             if(product.length==0)
             {
                 handleError('product','Pls Input Product Name')
                 submit=false
             }
             if(description.length==0)
             {
                 handleError('description','Pls Input Description')
                 submit=false
             }
             if(submit)
             {
                 var body={productid:productId,categoryid:categoryId,subcategoryid:subcategoryId,brandid:brandId,productname:product,description:description}
                 var result=await  postData('product/edit_product_data',body)
                 if(result.status)
                     {
                         Swal.fire({
                         icon: "Success",
                         title: result.message,
                         timer:1500,
                         toast:'true'
                         });
     
                     }
                 else
                     {
                         Swal.fire({
                         icon: "Error",
                         title: result.message,
                         timer:1500,
                         toast:'true'
                         });
                     }
                 fetchAllProduct()
             }

        }

        const handleEditPicture=async()=>{
            var formData=new FormData()
            formData.append('productid',productId)
            formData.append('picture',picture.bytes)
            var result = await postData('product/edit_product_picture',formData)
            if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500,
                    toast:'true'
                  });
            }
            else
            {
                Swal.fire({
                    icon:"Error",
                    title:result.message,
                    timer:1500,
                    toast:'true'
                   });
            }
            fetchAllProduct()
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
                var body = { productid: rowData.productid };
                var serverResponse = await postData('product/delete_product', body);
          
                if (serverResponse.status) {
                  Swal.fire("Deleted!", "", "success");
                  fetchAllProduct(); // Refresh the data
                } else {
                  Swal.fire("Error!", "The record could not be deleted.", "error");
                }
              } else if (result.isDenied) {
                Swal.fire("Your record is not deleted", "", "info");
              }
            });
          };

          const handleClose=()=>{
            setOpen(false)
          }

          const handleOpen=(rowData)=>{
            setOpen(true)
            fetchAllSubcategory(rowData.categoryid)
            setProductId(rowData.productid)
            setCategoryId(rowData.categoryid)
            setSubcategoryId(rowData.subcategoryid)
            setBrandId(rowData.brandid)
            setProduct(rowData.productname)
            setDescription(rowData.description)
            setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
            setTempPicture(`${serverURL}/images/${rowData.picture}`)
          }  

          const ShowProductForm=()=>{
            return(
                <Dialog
                  open={open}
                  close={handleClose}
                  maxWidth={"md"}
                >
                    <DialogContent>
                      <div className={Classes.box}>
                         <Grid container spacing={3} >
                            <Grid item xs={12} >
                            <TitleComponent title="Edit Product" logo="medbazar.jpg" listicon="medlist.png"  />
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
                    <Button onClick={handleEditData} >Edit Data</Button>
                    <Button onClick={handleClose} >Close</Button>
                    </DialogActions>
                </Dialog>
            )
          }
      
          function ShowAllProducts() {
            return (
              <MaterialTable
                title="All Products"
                columns={[
                  { title: 'ProductId',field:'productid'},
                  { title: 'Category', field: 'categoryname' },
                  { title: 'Subcategory', field: 'subcategoryname' },
                  { title: 'Brand', field: 'brandname' },
                  { title: 'Product',field:'productname'},
                  { title: 'description',field:'description'},
                  { title:'Icon',field:'picture',render:(rowData)=><><img  src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/> </>}
              
                ]}
                data={productData}        
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edit Product',
                    onClick: (event, rowData) => handleOpen(rowData)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Delete Product',
                    onClick: (event, rowData) => handleDelete(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add New Product',
                    isFreeAction: true,
                    onClick: (event) => navigate('/admindashboard/product')
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
        <div className={Classes.root} >
            <div className={Classes.boxDisplay}>
             {ShowAllProducts()}
            </div>
            {ShowProductForm()}
        </div>
    )
}