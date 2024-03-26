import Header from "../../components/userinterface/Header"
import ProductInformation from "../../components/userinterface/ProductInformation"
import ProductPictures from "../../components/userinterface/ProductPictures"






export default function productDetails()
{
    return(<div>
        <Header/>
        <div style={{display:'flex',width:'100%',justifyContent:'center',background:'#d3d3d324',marginTop:20}} >
            <div style={{width:'40%',marginRight:10}} >
                <ProductPictures/>
            </div>
            <div style={{width:'40%'}} >
                <ProductInformation/>
            </div>
        </div>
    </div>
    )
}