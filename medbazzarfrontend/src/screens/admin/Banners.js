import { useState, useEffect } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material";
import { useStyles } from "./BannersCSS";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData,getData } from "../../services/fetchNodeservices";
import Swal from "sweetalert2";
//handlesubmit
//handlereset
//handleError
//handlePicture
//fecthAllBrands
//fillAllBrands

export default function Banners (){
  var Classes = useStyles()
   const [bannerId,setBannerId]=useState('')
   const [bannerType,setBannerType]=useState('')
   const [brandId,setBrandId]=useState('')
   const [brandList,setBrandList]=useState([])
   const [error,setError]=useState({})
   const [picture,setPicture]=useState({file:[],bytes:''}) 
      
   const fecthAllBrands=async()=>{
      var result=await getData('brand/display_all_brand')
      if(result.status){
         setBrandList(result.data)
      }
   }
   useEffect(function(){fecthAllBrands()},[])

   const fillAllBrands=()=>{
      return brandList.map((item)=>{
         return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
      })
}
    
   const showImages=()=>{
      return picture?.file?.map((item)=>{
          return (<div style={{margin:2}} ><Avatar alt="Remy Sharp" variant="rounded" src={URL.createObjectURL(item)} /></div>)
      })
    }

    const handlePicture=(event)=>{
      if(Object.values(event.target.files).length<=5){
         alert("Pls upload 6 or more files")
        } else {
         setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }
    }
    const handleError = (label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))         
    }
    const handleSubmit=async()=>{
       var submit=true
       if(bannerType.length===0){
         submit=false
         handleError('bannerType','Choose Banner Type')
       }
       if(brandId.length===0){
         submit=false
         handleError('brandId','Pls choose Brand')
       }          
       if(picture.bytes.length===0){
         handleError('picture','Pls choose icon')
         submit=false
       }
       if(submit){
         var formData = new FormData()

         formData.append('brandid', brandId)

         formData.append('bannertype', bannerType)

         picture.file.map((item, i) => {
             formData.append('picture' + i, item)
         })
         var result = await postData('banners/submit_banners', formData)
         if (result.status) {

             Swal.fire({
                 icon: 'success',
                 timer: 1500,
                 title: result.message

             })

         }
         else {

             Swal.fire({
                 icon: 'error',
                 title: result.message,
                 timer: 1500
             })

         }

       }
    }
    const handleReset=()=>{
          setBannerId('')
          setBrandId('')
          setPicture({file:[]})
    }

    return(
        <div className={Classes.root} >
            <div className={Classes.box} >
                <Grid container spacing={3} > 
                    <Grid item xs={12} >
                       <TitleComponent title="Add New Banners" page="/admindashboard/displayallbanners" />
                    </Grid>
                    <Grid item xs={6} >
                       <FormControl fullWidth >
                            <InputLabel>Banners Type</InputLabel>
                            <Select 
                            label="banners type"
                            value={bannerType}
                            error={error.bannerType}
                            onFocus={()=>handleError('bannerType',null)}
                            onChange={(event)=>setBannerType(event.target.value)}

                            >
                               <MenuItem value={"General"}>General</MenuItem>
                               <MenuItem value={"Brand"}>Brand</MenuItem>
                               <MenuItem value={"Trending"}>Trending</MenuItem>
                               <MenuItem value={"Latest"}>Latest</MenuItem>
                               <MenuItem value={"Popular"}>Popular</MenuItem>
                            </Select>
                            {error.bannerType?<span style={{ marginLeft: '4%', fontSize: 13, color: '#d32f2f' }} >{error.bannerType}</span>:<></>}
                       </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                       <FormControl fullWidth >
                            <InputLabel>Brands</InputLabel>
                            <Select 
                            label="brands"
                            value={brandId}
                            error={error.brandId}
                            onFocus={()=>handleError('brandId',null)}

                            onChange={(event)=>{ console.log(event.target.value); setBrandId(event.target.value)}}
                            >
                               {bannerType === 'Brand' ? (
                                    fillAllBrands()
                                ) : (
                                    <MenuItem value={0}>None</MenuItem>
                                )}
                            </Select>
                            {error.brandId?<span style={{ marginLeft: '4%', fontSize: 13, color: '#d32f2f' }} >{error.brandId}</span>:<></>}
                       </FormControl>
                    </Grid>
                    <Grid item xs={6} >
                       <Button variant="contained" fullWidth component="label" >
                        Upload
                        <input onChange={handlePicture} onClick={() => handleError('picture', null)} type="file" accept="images/*" hidden multiple />
                       </Button>
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'center' }}>
                     {showImages()}
                    </Grid>
                    <Grid item xs={6} >
                        <Button onClick={handleSubmit} variant="contained" fullWidth >
                           Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                     <Button onClick={handleReset} variant="contained" fullWidth >
                        Reset
                     </Button>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}