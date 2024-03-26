import { useState } from "react";
import { useStyles } from "./AdminDashboardCSS";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Routes,Route,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/fetchNodeservices"

import Categories from './Categories';
import DisplayAllCategory from './DisplayAllCategory';
import Brand from './Brand';
import DisplayAllBrand from './DisplayAllBrand';

import Subcategory from './Subcategory';
import DisplayAllSubcategory from './DisplayAllSubcategory';
import Product from './Product';
import DisplayAllProduct from './DisplayAllProduct'
import Banners from "./Banners";

import ProductDetails from './ProductDetails';
import DisplayAllProductDetails from './DisplayAllProductDetails';

export default function AdminDashboard(){
  
    const Classes = useStyles()
    const navigate=useNavigate()
    var adminData=JSON.parse(localStorage.getItem('ADMIN'))

    return(
         <Box sx={{ flexGrow:1 }}>
            <AppBar position="sticky" >
                <Toolbar variant="dense" >
                    <Typography variant="h6" color="inherit" component="div" >
                         MedBazzar
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spaces={3} style={{paddingInlineStart:5}} >
                <Grid item xs={2.2} >
                    <Paper>
                        <div className={Classes.leftBarStyle}>
                            <img src={`${serverURL}/images/${adminData.picture}`}  style={{width:70,height:70,borderRadius:35}} />
                            <div className={Classes.nameStyle}>{adminData.adminname}</div>
                            <div className={Classes.emailStyle}>{adminData.emailid}</div>
                            <div className={Classes.phoneStyle}>{adminData.mobileno}</div>
                        </div>
                        <div className={Classes.menuStyle} >
                            <List>

                                <Divider/>

                               <ListItem disablePadding >
                                   <ListItemButton>
                                     <ListItemIcon>
                                        <DashboardIcon/>
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Dashboard</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')} >
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Category List</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')} >
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Subcategory List</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrand')}>
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Brands List</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton onClick={()=>navigate('/admindashboard/displayallproduct')}>
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Products List</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')}>
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>ProductDetails List</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton onClick={()=>navigate('/admindashboard/banners')}>
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Banners</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding >
                                   <ListItemButton>
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Sales Report</span>} />
                                   </ListItemButton>
                                </ListItem>

                                <Divider/>

                                <ListItem disablePadding >
                                   <ListItemButton>
                                     <ListItemIcon>
                                     <DraftsIcon />
                                     </ListItemIcon>
                                     <ListItemText primary={<span className={Classes.menuItemStyle}>Logout</span>} />
                                   </ListItemButton>
                                </ListItem>
                            </List>
                        </div>
                    </Paper>
                </Grid>
                     
                <Grid item xs={9.8} style={{padding:20}}>
                    <Routes>
                      <Route element={<Categories/>} path='/category' />
                      <Route element={<DisplayAllCategory/>} path='/displayallcategory' />
                      <Route element={<Brand/>} path='/brand' />
                      <Route element={<DisplayAllBrand/>} path='/displayallbrand' />
                      <Route element={<Subcategory/>} path='/subcategory' />
                      <Route element={<DisplayAllSubcategory/>} path='/displayallsubcategory' />
                      <Route element={<Product/>} path='/product' />
                      <Route element={<DisplayAllProduct/>  } path='/displayallproduct'/>
                      <Route element={<ProductDetails/>} path='/productdetails' />
                      <Route element={<DisplayAllProductDetails/>} path='/displayallproductdetails' />
                      <Route element={<Banners/>} path="/banners" />
                    </Routes>
                </Grid>     

            </Grid>

         </Box>
    )
}