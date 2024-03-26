import { Button,IconButton } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {useState} from 'react'
export default function PlusMinusComponent(props)
{  const [value,setValue]=useState(0)
    const handlePlus=()=>{
        setValue((prev)=>prev+1)
        var v=value
        v=v+1
        props?.onChange(v)
    
    }
    const handleMinus=()=>{
        setValue((prev)=>prev-1)
        var v=value
        v=v-1
       
        props?.onChange(v)
    }
    

    
    return(<div style={{display:'flex'}}>
      {value==0?  
       <IconButton onClick={handlePlus} color="primary" aria-label="add to shopping cart">
                    <Button
                      variant="text"
                      endIcon={<AddShoppingCartIcon />}
                      size='small'
                    >
                      ADD
                    </Button>
                  </IconButton>:  
      <div style={{alignItems:'center',display:'flex', justifyContent:'space-evenly', background:'#00391c',width:80,height:25,  borderRadius:4}}>
       
        <span onClick={handleMinus} style={{cursor:'pointer', color:'#fff',fontSize:16,fontWeight:'bold'}}>-</span> 
        <span style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>{value}</span>
        <span onClick={handlePlus} style={{cursor:'pointer',color:'#fff',fontSize:16,fontWeight:'bold'}}>+</span>

      </div>}
    </div>)
}