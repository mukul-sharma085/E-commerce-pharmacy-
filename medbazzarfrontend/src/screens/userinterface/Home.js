import BrandComponent from "../../components/userinterface/BrandComponent"
import Header  from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import SliderComponent from "../../components/userinterface/SliderComponent"
import CategoryComponent  from "../../components/userinterface/CategoryComponent"
import ProductComponent from "../../components/userinterface/ProductComponent"
import {useEffect,useState} from "react"
import { postData,getData } from "../../services/fetchNodeservices"
import FooterComponent from "../../components/userinterface/FooterComponent"
import { Divider } from "@mui/material"
import ConcernComponent from "../../components/userinterface/ConcernComponent"
export default function Home()
{   const [bannerList,setBannerList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [productListOffer,setProductListOffer]=useState([])
    const [concernList,setConcernList]=useState([])
    const [pageRefresh,setPageRefresh]=useState(false)

    const fetchAllBanners=async()=>{
        var result=await postData('userinterface/show_all_banners',{bannertype:'General'})
        setBannerList(result.data)

    }

    const fetchAllBrands=async()=>{
        var result=await getData('userinterface/show_all_brands')
        setBrandList(result.data)

    }
    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        setCategoryList(result.data)

    }
    
    const fetchAllConcern=async()=>{
        var result=await getData('userinterface/display_all_concern')
        setConcernList(result.data)

    }
    const fetchAllProductDetails=async(offertype)=>{
        var result=await postData('userinterface/display_all_productdetail_by_offer',{offertype})
        setProductListOffer(result.data)
       

    }

   useEffect(function(){
   fetchAllBanners()
   fetchAllBrands()
   fetchAllCategory()
   fetchAllProductDetails('Month end sale')
   fetchAllConcern()
   },[])
    return(<div style={{fontFamily:'Kanit'}}>
    <Header  />
    
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
        <SliderComponent data={bannerList} />
    </div>
    
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
    <BrandComponent title="Brands" data={brandList}/>
    </div>
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
     <CategoryComponent title="Browse by category" data={categoryList} />
    </div>

    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
     <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} title="Month End Sale" data={productListOffer} />
    </div>
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
        <Divider/>
    </div>
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
    <ConcernComponent title="Concern" data={concernList} />
    </div>
    
    <div style={{display:'flex',justifyContent:'center',marginTop:20}}  >
        <Divider/>
    </div>

    <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
       <FooterComponent/>
    </div>
    </div>)
}