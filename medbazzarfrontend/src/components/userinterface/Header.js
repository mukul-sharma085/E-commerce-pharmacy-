import { AppBar,Box,Toolbar,Badge} from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import logo from '../../assets/logo.jpg'
import { useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStyles } from "../../screens/userinterface/HomeCss"
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer'; 
import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'; 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
 
import { useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import { serverURL } from "../../services/fetchNodeservices"
import ShowCartProducts from "../userinterface/ShowCartProducts"
export default function Header(props)
{ const theme = useTheme();
  const classes=useStyles();
  var products=useSelector((state)=>state.data)
  var keys=Object?.keys(products)
  const navigate=useNavigate();
  const [status,setStatus]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const handleDrawer=()=>{
    setStatus(true)
  }
  const handleClose=()=>{
    setStatus(false)
  }
  const showCartDetails=()=>{
  
    setIsOpen(true)
  }
  const hideCartDetails=()=>{
  
    setIsOpen(false)
  }
  const drawerList=()=>{
 return( <Paper >
  <div className={classes.leftBarStyle}>
  <img src={`${serverURL}/images/1.jpg`}  style={{width:70,height:70,borderRadius:35}} />
    <div className={classes.nameStyle}>{'Alice Singh'}</div>
    <div className={classes.emailStyle}>{'alice@gmail.com'}</div>
    <div className={classes.phoneStyle}>{'+919301123085'}</div>
  </div>
  <div className={classes.menuStyle}>
    <List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
        </ListItemButton>
      </ListItem>


      <ListItem disablePadding>
        <ListItemButton  onClick={()=>navigate('/admindashboard/displayallcategory')} >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
        </ListItemButton>
      </ListItem>

     
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>} />
        </ListItemButton>
      </ListItem>

      
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={()=>navigate('/admindashboard/concern')} >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Add Concern</span>} />
        </ListItemButton>
      </ListItem>

     
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
        </ListItemButton>
      </ListItem>

      
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={()=>navigate('/admindashboard/banners')} >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
        </ListItemButton>
      </ListItem>


      <Divider />
      <ListItem disablePadding>
        <ListItemButton >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
        </ListItemButton>
      </ListItem>
    </List>
  </div> 
</Paper>
)

  }
  const secondrySearchBar=()=>{
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{background:'#fff'}} position="static">
          <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
          <MenuOutlinedIcon onClick={handleDrawer} style={{fontSize:30,color:'#000'}}/> 
           {searchBarComponent()}
           <div style={{ display:'flex',width:70,justifyContent:'space-between'}}>
           <PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000'}}/> 
           
           <PhoneOutlinedIcon style={{fontSize:30,color:'#000'}} />
           </div>
          </Toolbar>
        </AppBar>
        <div>
      
        </div>
      </Box>
    )
  }
   const searchBarComponent=()=>{
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px',margin:1, display: 'flex', alignItems: 'center', width:'50%' }}
      >
              
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products Here.."
          inputProps={{ 'aria-label': 'search google maps' }}
        
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
       
      </Paper>
    );
   }

    return(<Box sx={{ flexGrow: 1,position:'relative' }}>
        <AppBar style={{background:'#fff'}} position="static">
          <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
           <img src={logo} style={{width:150}} />
           {!matches?searchBarComponent():<div></div>}
           <div style={{ display:'flex',width:!matches?110:50,justifyContent:'space-between'}}>
           {!matches?<PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000'}}/>:<div></div>} 
           <Badge badgeContent={keys?.length} color="primary">
           <ShoppingCartOutlinedIcon onMouseLeave={hideCartDetails} onMouseOver={showCartDetails}  style={{fontSize:30,color:'#000'}} />
           </Badge>
           {!matches?<PhoneOutlinedIcon style={{fontSize:30,color:'#000'}} />:<div></div>}
           </div>

          </Toolbar>
        </AppBar>
        <div>
          {matches?secondrySearchBar():<div></div>}
          
        </div>
        <Drawer
            anchor={'left'}
            open={status}
           onClose={handleClose}
          >
          {drawerList()}
          </Drawer>
       <ShowCartProducts isOpen={isOpen} />
      </Box>
      )
}