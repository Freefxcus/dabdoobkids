import { useState, useEffect } from "react";
import styles from "../styles/pages/Details.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import delivery from "../images/delivery.png";
import cart from "../images/cart.png";
import eHeart from "../images/empty-heart.svg";
import fHeart from "../images/filled-heart.svg";
import { useParams } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../utils/apiCalls";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions, cartActions } from "../Redux/store";
import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} from "../utils/apiCalls.js";
import { toast } from "react-toastify";
import SingleProductModal from "../components/singleProduct/SingleProductModal.jsx";

import SwiperComponent from "../components/Swiper.jsx";
import { Stack, Typography } from "@mui/material";
import { set } from "lodash";
import Empty from "./empty.jsx";

export default function Details() {
  const { id } = useParams();
  const wishlist = useSelector((state) => state.wishlist.value);
  const wished = wishlist.includes(+id);
  console.log(wished);
  const [productDetails, setProductDetails] = useState({});
  console.log(productDetails);
  const [largeImage, setLargeImage] = useState("");
  const [size, setSize] = useState("");
  const [counter, setCounter] = useState(1);
  const [variant, setVaraint] = useState(0);
  const [open, setOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reload , setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setVaraint(prev => value);
    console.log(variant, "variantzzzzzzzzzz");
  };

  const handleImageChange = (e) => {
    const clickedImage = e.target.src;
    setLargeImage(clickedImage);
    const clonedSmallImages = [...productDetails?.images?.slice(0, 4)];
    const indexOfImageToReplace = clonedSmallImages.indexOf(clickedImage);
    if (indexOfImageToReplace !== -1) {
      clonedSmallImages[indexOfImageToReplace] = largeImage;
      // Output the updated array
      console.log("Updated Array:", clonedSmallImages);
      console.log("Index of Replaced Item:", indexOfImageToReplace);
    } else {
      console.log("Item not found in the array.");
    }
  };
  useEffect(() => {
   
    getProductById(id).then((res) => {
      setProductDetails(res);
      setLargeImage(res?.images[0]);
    });

    getRelatedProducts(id).then((res) => {
      setRelatedProducts(res);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
    });
    
  }, [reload]);

  console.log(loading, "productDetails12321123");

  return (
    <>
      {loading && (
        <>
          <Loader open={true} />
          <div style={{ height: "500px" }} />
        </>
      )}
  {!productDetails && <Empty title="Product not Found" message="Seems there is a problem finding this product"/> }
      {productDetails?.id && (
        <div
          className={`${styles.container} margin-container section-top-margin section-bottom-margin`}
        >
          <div className={styles["images-section"]}>
            <img src={largeImage} className={styles["large-image"]} />
            <div className={styles["small-images-container"]}>
              {productDetails.images.slice(0, 4).map((img, index) => (
                <img
                  alt="small-imge"
                  key={index}
                  src={img}
                  className={styles["small-image"]}
                  onClick={(e) => {
                    handleImageChange(e);
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles["order-section"]}>
            <div style={{ fontSize: "14px", color: "var(--rhine-castle)" }}>
              {productDetails.category.name}
            </div>
            <div style={{ fontSize: "36px", color: "var(--errie-black)" }}>
              {productDetails?.name}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--errie-black)",
              }}
            >
              $ {productDetails?.variants[variant]?.price}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--placeholder-text)",
              }}
            >
              Tax included shipping calculated at checkout
            </div>
            <div className={styles.line}></div>
            <Box
              sx={{
                minWidth: 120,
                "& .MuiFormControl-root": {
                  m: 0,
                },
              }}
            >
              <FormControl sx={{ width: "100%" }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Select Size
                </InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={variant || 0}
                  value={variant || 0}
                  label="Select Size"
                  onChange={(event)=>handleChange(event.target.value)}
                >
                  {productDetails?.variants?.map((variant, index) => (
                    <MenuItem key={index} value={index}>
                      {variant?.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <h1 style={{marginBottom : "12px"}}>Color :</h1>
              <Stack direction={"row"} gap={"12px"}>
                {productDetails?.variants?.map((singleVariant, index) => (
                 
                  <span
                    onClick={() => handleChange(index)}
                    key={index}
                    className={styles.color}
                    style={{
                      backgroundColor: `${singleVariant?.color}`,
                      marginLeft: "6px",
                      width: "30px",
                      height: "30px",
                      border : variant === index ? "2px solid var(--brown)" : "1px solid black",
                      cursor: "pointer",
                    }}
                  ></span>
                ))}
              </Stack>
            </Box>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--errie-black)",
              }}
            >
              Description
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--placeholder-text)",
              }}
            >
              {productDetails.description}
            </div>
            <div className={styles.row}>
              <div
                className={styles.row}
                style={{
                  minWidth: "70px",
                  padding: "13px 8px 13px 8px",
                  border: "1px solid var(--unicorn-silver)",
                  borderRadius: "10px",
                  flexWrap: "nowrap",
                }}
              >
                <div
                  onClick={() => {
                    if (counter > 1) {
                      setCounter((prev) => prev - 1);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  -
                </div>
                <div>{counter}</div>
                <div
                  onClick={() => {
                    setCounter((prev) => prev + 1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  +
                </div>
              </div>
              <button
                className={styles["cart-button"]}
                style={{
                  opacity: counter < 1 ? ".3" : "1",
                  pointerEvents: counter < 1 ? "none" : "initial",
                }}
                disabled={productDetails?.variants?.length<1||   counter < 1 || counter > productDetails?.variants[variant]?.stock}
                onClick={(e) => {
                  e.stopPropagation();
                  if (counter > productDetails?.variants[variant]?.stock) {
                    toast.error("Out of stock");
                    return;
                  }
                
                  setOpen(true);
                  dispatch(cartActions.add({ id: +id, count: counter }));
                  addToCart(
                    +id,
                    counter,
                    productDetails?.variants[variant]?.id
                  );
                  // if (wished) {
                  //   dispatch(cartActions.remove(+id));
                  //   removeFromCart(+id);
                  // } else {
                  //   dispatch(cartActions.add({ id: +id, count: counter }));
                  //   addToCart(+id, counter);
                  // }
                }}
              >
                <img src={cart} width="16px" alt="cart" />
                <span>Add to cart</span>
              </button>
              <SingleProductModal
                open={open}
                handleClose={setOpen}
                productDetails={productDetails}
              />
              <img
                alt="heart-icon"
                src={wished ? fHeart : eHeart}
                className={styles["heart-icon"]}
                onClick={(e) => {
                  e.stopPropagation();
                  if (wished) {
                    dispatch(wishlistActions.remove(+id));
                    removeFromWishlist(+id);
                  } else {
                    dispatch(wishlistActions.add(+id));
                    addToWishlist(+id);
                  }
                }}
                width="30px"
                height="30px"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" , margin :"12px 0px" }}>
              <img src={delivery} className={styles["delivery-icon"]} />
              <div>
                <div>Delivery details</div>
                <div>Door delivery between 07 February and 10 February</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Box 
      sx={{
        mx : {xs : "20px" , md : "40px" , lg :"60px"},
      }}>
        <Typography
          variant="h4"
          sx={{
            marginLeft: {xs : "5px" , md : "10px" , lg :"20px"},
            marginBottom: "16px",
            fontWeight: "400",
            fontSize : {xs : "24px" , md : "32px" , lg :"40px"},
          }}
        >
          You may also like
        </Typography>
        <SwiperComponent setReload = {setReload} items={relatedProducts} />
      </Box>
    </>
  );
}
