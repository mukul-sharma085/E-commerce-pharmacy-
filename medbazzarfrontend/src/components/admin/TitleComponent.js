import { useNavigate } from "react-router-dom"
import list from "../../assets/list.png"
import mainlogo from "../../../src/assets/logo.jpg"

export default function TitleComponent({title,logo,listicon,page}){

   var navigate = useNavigate() 
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
           <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
               <img src={mainlogo} width='105'/>
               <div style={{color:'white',fontWeight:"bolder",fontSize:16}}>{title}</div>
           </div>
           <div style={{cursor:'pointer'}} onClick={()=>{navigate(page)}}>
              <img src={list} width='30'/>
              
           </div>
        </div>
    )

}