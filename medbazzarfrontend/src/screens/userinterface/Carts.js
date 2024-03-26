import Header from "../../components/userinterface/Header";
import PaymentDetails from "../../components/userinterface/PaymentDetails";
import ShowCart from "../../components/userinterface/ShowCart";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";

export default function Carts(){
    // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    // const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    // const theme = useTheme()
    return(
        <div>
            <Header/>
            <div style={{marginTop:30,width:'100%',display:'flex',justifyContent:'center'}} >
                <div style={{width:'55%',background:'',marginRight:'3%'}} ><ShowCart /></div>
                <div style={{width:'30%',background:''}} ><PaymentDetails/></div>
            </div>
        </div>
    )
}