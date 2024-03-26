import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';





export default function ProductDetailsComponent()
{
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'linear',
        arrows:false      
      };
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'linear',
        arrows:false,
        // vertical: true,
        // verticalSwiping: true,
        // swipeToSlide: true      
      };


    var productDetails = [{productdetailid:1, categoryid:2, subcategoryid:3, brandid:4, productid:5, productsubname:'xc', weight:10, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'sdsfb', picture:'p1.png,p2.png,p3.png,p1.png'}]
    var pdImages = Object.values(productDetails)[0].picture.split(',')
    const detailsSlide=()=>{
        return pdImages.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:400,marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} /></div>
        })
    } 
    const detailsSlide2=()=>{
        return pdImages.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:100,marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} /></div>
        })
    } 



    return(
        // <div style={{width:'100%',display:'flex',justifyContent:'center',background:'#d3d3d324'}} >
            
            <div style={{width:'100%',padding:10}} >
                    <div style={{marginLeft:'auto',display:'flex',justifyContent:'flex-end'}} >
                        <FavoriteBorderOutlinedIcon style={{marginRight:20}} />
                        <ShareOutlinedIcon style={{marginRight:20}} />
                    </div>


                    <Slider {...settings}>
                        {detailsSlide()}
                    </Slider>
    
                    <Slider {...settings2}>
                        {detailsSlide2()}
                    </Slider>
                                
            </div>
            
        // </div>

    )






}