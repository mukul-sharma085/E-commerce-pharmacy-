import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/fetchNodeservices";
import { Button, Divider, Grid, Paper } from "@mui/material";
import logo from "../../assets/logo.jpg";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
//import ProductDetailComponent from "./ProductDetailComponent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PlusMinusComponent from "./PlusMinusComponent";
import { UseDispatch, useDispatch } from "react-redux";

export default function ProductComponent(props) {
  var navigate = useNavigate();
  var dispatch=useDispatch()
  const theme = useTheme();
  var product = props?.data
  //alert(JSON.stringify(product))

  var sld = createRef();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: matchesMd?2:3,
    slidesToScroll: 2,
    
  };
  {
    /*var images=Object.values(product)[0].picture.split(",") 
    const showSlide=()=>{
        return images.map((item,index)=>{
            return (<div key={index} style={{display:'flex',justifyContent:'center'}}><img src={`${serverURL}/images/${item}`} 
            style={{width:"70%", borderRadius:0, height:'auto'}} />
            
            </div>)
        })
    } */
  }

  const showSlide = (item) => {
    
   
  return(<div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`${serverURL}/images/${item.picture}`}
          style={{ width: "70%", borderRadius: 0, height: "auto",aspectRatio:3/3 }}
        />
      </div>)
   
  };

  const handleProductDetail = () => {
    // alert("jbg")
    // navigate("/productdetailcomponent", {message:"hfyfcvgnvcfhyc"})
  };

  const handleForward = () => {
    sld.current.slickNext();
  };

  const handleBackward = () => {
    sld.current.slickPrev();
  };

  const handleChange=(v,item)=>{
    if(v>0)
    {
    item['qty']=v 
    
    dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
    }
    else
    {
      dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
    }
   props.setPageRefresh(!props.pageRefresh) 
  }
  const ProductDetail = () => {
    return product?.map((item, index) => {
      return (
        <div>
          <div
            style={{
              width: "80%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FavoriteBorderIcon
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginTop: 10,
                    fontSize: 30,
                    color: "#e84393",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                {showSlide(item)}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 0.9,
                }}
              >
                <img src={logo} style={{ width: 85 }} />
              </Grid>
              <Grid
                item
                xs={12}
                
              >
              <div style={{
                  fontSize: matchesMd?"0.7em":"1.0em",
                  display: "flex",
                  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}>  
                {item.description.length<=20?<div>{item.description}<div>&nbsp;</div></div>:item.description}
              </div>  
                
                <div>{item.weight} {item.weighttype}</div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  fontSize: matchesMd?"0.7em":"1.0em",
                  display: "flex",
                  margin: 2,
                  fontWeight: "bold",
                }}
              >
                {item.offerprice==0?  <span>&#x20B9;{item.price}</span>:
                <div>
                <span style={{fontWeight:600,color:'grey',textDecoration:"line-through",marginRight:5}}>&#x20B9;{item.price}</span>
               <span> &#x20B9;{item.offerprice}</span>
               </div>}
            
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ borderWidth: 1.5 }}></Divider>
              </Grid>
              <Grid item xs={12} style={{ display: "flex",justifyContent:'center',alignItems:'center' }}>
                <Grid item xs={6} style={{ display: "flex", margin: 2 }}>
                  <PlusMinusComponent onChange={(v)=>handleChange(v,item)} />
                </Grid>
                <Grid
                  item
                  xs={6}
                   
                >
                <Button
                      variant="text"
                       style={{color:'#fff',background:'#000'}}
                      size='small'
                    >
                      Buy Now
                    </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{fontFamily:'kanit', width: "95%", position: "relative" }}>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 17,
          margin: "5px 0px 15px 15px",
        }}
      >
        {props?.title}
      </div>
      {matchesMd?<div></div>:<div>
      <div
        style={{
          display: "flex",
          width: 35,
          height: 35,
          borderRadius: 19,
          background: "#bdc3c7",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
          position: "absolute",
          zIndex: 2,
          top: "50%",
          left: "0.09%",
        }}
      >
      <ArrowBackIosIcon onClick={handleBackward} />
      </div>

      <div
        style={{
          display: "flex",
          width: 35,
          height: 35,
          borderRadius: 19,
          background: "#bdc3c7",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: 0.6,
          position: "absolute",
          zIndex: 2,
          top: "50%",
          right: "0.09%",
          cursor: "pointer",
        }}
      >
<ArrowForwardIosIcon onClick={handleForward} />
      </div>
      </div>}
      <Slider {...settings} ref={sld}>
        {ProductDetail()}
      </Slider>
    </div>
  );
}
