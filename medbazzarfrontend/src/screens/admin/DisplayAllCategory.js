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

export default function DisplayAllCategory (){
    var Classes=useStyles()
    var navigate=useNavigate()
    const [categoryData, setCategoryData ]=useState([])
    const [open, setOpen]=useState(false)
    const [category, setCategory]= useState('')
    const [error, setError]= useState({})
    const [picture,setPicture]= useState({file:'icon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [categoryId, setCategoryId]=useState('')
    const [showBtn, setShowBtn]=useState(false)


  const handlePicture = (event) => {
     
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
       if(category.length==0){
        handleError('category','Pls input category name...')
       submit = false
      }
      
      if(submit){

        var body = {categoryid:categoryId,categoryname:category}  
        var result = await postData('category/edit_category_data',body)
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
        fetchAllCategory()
        } 
      }
   const handleEditPicture = async()=>{
    
       var formData = new FormData()
       formData.append('categoryid',categoryId)
       formData.append('picture',picture.bytes)
       var result = await postData('category/update_category_picture',formData)
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
       fetchAllCategory()
    
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
          var body = { categoryid: rowData.categoryid };
          var serverResponse = await postData('category/delete_category_data', body);
    
          if (serverResponse.status) {
            Swal.fire("Deleted!", "", "success");
            fetchAllCategory(); // Refresh the data
          } else {
            Swal.fire("Error!", "The record could not be deleted.", "error");
          }
        } else if (result.isDenied) {
          Swal.fire("Your record is not deleted", "", "info");
        }
      });
    };
    
    
    const fetchAllCategory=async()=>{

     var result=await getData('category/display_all_category')
     if(result.status){
        setCategoryData(result.data)
     }

    }
    useEffect(function(){
      fetchAllCategory()
    },[])
     
    const  handleClose = ()=>{
      setOpen(false)
    }

    const handleOpen = (rowData)=>{
      setOpen(true) 
      setCategoryId(rowData.categoryid)
      setCategory(rowData.categoryname)
      setPicture({file:`${serverURL}/images/${rowData.picture}`, bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const ShowCategoryForm =()=>{
      return(
        <Dialog
         open={open}
         onClose={handleClose}

        >
        
          <DialogContent>
          <div className={Classes.box}>
      <Grid container spacing={3}>
         <Grid item xs={12}>
       <TitleComponent title="Edit Category" logo="medbazar.jpg" listicon="medlist.png"  />
         </Grid>
         <Grid item xs={12}>
            <TextField value={category} onFocus={() => handleError('category',null)} error={error.category} helperText={error.category} onChange={(event)=>setCategory(event.target.value)} label="Category Name" fullWidth/>
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



    function ShowCategory() {
        return (
          <MaterialTable
            title="Main Categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Category ', field: 'categoryname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:20}}  /></> },
             
            ]}
             data={categoryData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit category',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete category',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/category')
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
      return (
      <div className={Classes.root}>
        <div className={Classes.boxDisplay}>
          {ShowCategory()}
        </div>
        {ShowCategoryForm()}
      </div>
      )

}