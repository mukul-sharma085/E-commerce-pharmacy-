//import all things
// make funnction Display
//material table
//handlePicture
//handleCancel
//handleError
//handleEditData
//handlEditPicture
//handleDelete
//fetchAllBrand
//handleOpen
//handleClose
//ShowBrandForm
//ShowBrand
import MaterialTable from "@material-table/core";
import { useStyles } from "./BrandCSS";
import { useState, useEffect } from "react";
import { getData, postData, serverURL } from "../../services/fetchNodeservices";
import * as React from 'react';
import { Button,Grid,TextField, Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TitleComponent from "../../components/admin/TitleComponent";
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllBrand(){
    var Classes=useStyles()
    var navigate =useNavigate()
    const [brandData, setBrandData ]=useState([])
    const [open, setOpen]=useState(false)
    const [brand, setBrand]= useState('')
    const [error, setError]= useState({})
    const [picture,setPicture]= useState({file:'icon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [brandId, setbrandId]=useState('')
    const [showBtn, setShowBtn]=useState(false)

    const handlePicture = (event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
       setShowBtn(true) 
      }
    
    const handleCancel = ()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
      }

    const handleError = (label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleEditData = async()=>{
      var submit = true
        if(brand.length===0){
          handleError('brand','Pls input brand name..')
          submit = false
        }
        if(submit){
            var body = {brandid:brandId,brandname:brand}
            var result = await postData('brand/edit_brand_data',body)
            if(result.status){
               Swal.fire({
                icon:"success",
                title:result.message,
                timer:1200,
                toast:true
               })
            } else {
                Swal.fire({
                  icon:"error",
                  title:result.message,
                  toast:true
                })
            }
            fetchAllBrand()
        }
    }

    const handleEditPicture = async()=>{
        var formData = new FormData()
        formData.append('brandid',brandId)
        formData.append('picture',picture.bytes)
        var result = await postData('brand/edit_brand_picture',formData)
        if(result.status){
          
          Swal.fire({
             icon: "success",
             title: result.message,
             timer: 1200,
             toast: true
           });
  
  
        } else {
            
          Swal.fire({
             icon: "error",
             title: result.message,
             toast: true
             
           });
  
        }
         fetchAllBrand()
    }

    const handleDelete = (rowData)=>{
     Swal.fire({
      title:"Confirm Delete",
      toast:true,
      showDenyButton:true,
      showCancelButton:true,
      confirmButtonText:"Delete",
      denyButtonText:"Don't delete"
     }).then(async(result)=>{
      if(result.isConfirmed){
        var body = {brandid: rowData.brandid}
        var serverResponse = await postData('brand/delete_brand_data',body)
        if(serverResponse.status){
          Swal.fire("Deleted!", "", "success");
          fetchAllBrand(); // Refresh the data
        } else {
          Swal.fire("Error!", "The record could not be deleted.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Your record is not deleted", "", "info");
      }
     })
    }

    const fetchAllBrand = async()=>{

        var result = await getData('brand/display_all_brand')
        if(result.status){
          setBrandData(result.data)
        }
    }
    useEffect(function(){
        fetchAllBrand()
    },[])
     
    const handleClose = ()=>{
        setOpen(false)
    }

    const handleOpen = (rowData)=>{
        setOpen(true)
        setbrandId(rowData.brandid)
        setBrand(rowData.brandname)
        setPicture({file:`${serverURL}/images/${rowData.picture}`, bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const ShowBrandForm=()=>{
        return(
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogContent>
                <div className={Classes.box}>
      <Grid container spacing={3}>
         <Grid item xs={12}>
       <TitleComponent title="Edit Brand" logo="medbazar.jpg" listicon="medlist.png"  />
         </Grid>
         <Grid item xs={12}>
            <TextField value={brand} onFocus={() => handleError('brand',null)} error={error.brand} helperText={error.brand} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth/>
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

    function ShowBrand(){
        return(
            <MaterialTable
            title="Main Brands"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand ', field: 'brandname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:20}}  /></> },
             
            ]}
             data={brandData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit brand',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete brand',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/brand')
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
        <div className={Classes.root}>
            <div className={Classes.boxDisplay}>
              {ShowBrand()}
            </div>
            {ShowBrandForm()}
        </div>
    )
}