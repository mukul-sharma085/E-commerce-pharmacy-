import { useSelector } from "react-redux";
import { Divider,Paper } from "@mui/material";
export default function ShowCartProducts(props)
{  var products=useSelector((state)=>state.data)
    var keys=Object?.keys(products)
    var products=Object?.values(products)
    const showProducts=()=>{
        return products.map((item)=>{
            return <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:6}}><div>{item.productname}</div><div>{item.qty}</div></div>
        })
    }

    return(<Paper elevation={2} style={{display:props.isOpen?'flex':'none',position:'absolute',top:50,right:70,zIndex:3}}>
     <div style={{width:300,height:'auto',display:'flex',flexDirection:'column',padding:5}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <div style={{fontSize:16,fontWeight:'bold'}} >Order Summary</div>   
         <div style={{fontSize:16,fontWeight:'bold'}}>{keys.length} Items</div>
        
         
        </div>
        <Divider/> 
        {showProducts()}
        </div>       
    </Paper>)
}