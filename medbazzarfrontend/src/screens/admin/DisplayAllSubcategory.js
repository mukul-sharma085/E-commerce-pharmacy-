import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCSS";
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

export default function DisplayAllSubcategory(){
    var Classes = useStyles()
    var navigate = useNavigate()
    const[subcategoryData,setSubcategoryData]=useState([])
    const[open,setOpen]=useState(false)
    const[subcategory,setSubcategory]=useState('')
    const[error,setError]=useState({})
    const[picture,setPicture]=useState({file:'icon.png',bytes:''})
    const[tempPicture,setTempPicture]=useState('')
    const[subcategoryId,setSubcategoryId]=useState('')
    const[showBtn,setShowBtn]=useState(false)
    const[categoryId,setCategoryId]=useState(false)
    const [categoryList,setCategoryList]=useState([])

    const fetchAllCategory=async()=>{

        var result=await getData('category/display_all_category')
        if(result.status){
           setCategoryList(result.data)
        }
   
       }
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
       useEffect(function(){
         fetchAllCategory()
       },[])

       

    const handlePicture =(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0] })
         setShowBtn(true)
    }

    const handleCancel = ()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
      }

    const handleError = (label,msg) => {
        setError((prev)=>({...prev,[label]:msg}))
    }

    

    const handleEditData = async()=>{
        
        var submit = true
           if(subcategory.length===0){
            handleError('subcategory','Pls input subcategory name...')
           submit = false
          }
          
          if(submit){
    
            var body = {categoryid:categoryId,subcategoryid:subcategoryId,subcategoryname:subcategory}  
            var result = await postData('subcategory/edit_subcategory_data',body)
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
            fetchAllSubcategory()
            } 
          }
       const handleEditPicture = async()=>{
        
           var formData = new FormData()
           formData.append('subcategoryid',subcategoryId)
           formData.append('picture',picture.bytes)
           var result = await postData('subcategory/edit_subcategory_picture',formData)
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
           fetchAllSubcategory()
        
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
              var body = { subcategoryid: rowData.subcategoryid };
              var serverResponse = await postData('subcategory/delete_subcategory_data', body);
        
              if (serverResponse.status) {
                Swal.fire("Deleted!", "", "success");
                fetchAllSubcategory(); // Refresh the data
              } else {
                Swal.fire("Error!", "The record could not be deleted.", "error");
              }
            } else if (result.isDenied) {
              Swal.fire("Your record is not deleted", "", "info");
            }
          });
        };
     
    const fetchAllSubcategory=async()=>{

        var result=await getData('subcategory/display_all_subcategory')
        if(result.status){
           setSubcategoryData(result.data)
        }
   
       }
       useEffect(function(){
         fetchAllSubcategory()
       },[])
        
       const  handleClose = ()=>{
         setOpen(false)
       }
   
       const handleOpen = (rowData)=>{
         setOpen(true)
         setSubcategoryId(rowData.subcategoryid) 
         setCategoryId(rowData.categoryid)
         setSubcategory(rowData.subcategoryname)
         setPicture({file:`${serverURL}/images/${rowData.picture}`, bytes:''})
         setTempPicture(`${serverURL}/images/${rowData.picture}`)
       }

       const ShowSubcategoryForm = ()=>{
        return(
            <Dialog
         open={open}
         onClose={handleClose}

        >
        
          <DialogContent>
          <div className={Classes.box}>
      <Grid container spacing={3}>
         <Grid item xs={12}>
       <TitleComponent title="Edit Subcategory" logo="medbazar.jpg" listicon="medlist.png"  />
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
            <TextField value={subcategory} onFocus={() => handleError('subcategory',null)} error={error.subcategory} helperText={error.subcategory} onChange={(event)=>setSubcategory(event.target.value)} label="Subcategory Name" fullWidth/>
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
      
       function ShowSubcategory(){
        return(
            <MaterialTable
            title="Main Subategories"
            columns={[
              { title: 'Subcategory Id', field: 'subcategoryid' },  
              { title: 'Category', field: 'categoryname' },
              { title: 'Subcategory ', field: 'subcategoryname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:20}}  /></> },
             
            ]}
             data={subcategoryData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit subcategory',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete subcategory',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Subcategory',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/subcategory')
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
            <div className={Classes.boxDisplay} >
            {ShowSubcategory()}
            </div>
            {ShowSubcategoryForm()}
        </div>
    )
}