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
  const [variant, setVariant] = useState({});
  const [open, setOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleChange = ({ key, value }) => {
    setVariant((prev) => ({ ...prev, [key]: value }));
    console.log(key, value,"variantvariantvariantvariant",variant);
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

    getRelatedProducts(id)
      .then((res) => {
        setRelatedProducts(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [reload]);


  const newVariants = transformVariants(productDetails?.variants);

  
  const selectedVariantObject =productDetails?.variants?.find(variantItem => 
    variantItem.options.every(option => 
      variant[option.option.name] === option.value.value
    )
  );

  // const selectedVariantObject = productDetails?.variants?.length?   variant?.length===newVariants.length? productDetails?.variants?.find(variantItem => 
  //   variantItem.options.every(option => 
  //     variant[option.option.name] === option.value.value
  //   )
  // ):null:null;


  return (
    <>
      {loading && (
        <>
          <Loader open={true} />
          <div style={{ height: "500px" }} />
        </>
      )}
      {!productDetails && (
        <Empty
          title="Product not Found"
          message="Seems there is a problem finding this product"
        />
      )}
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
              $ {selectedVariantObject?selectedVariantObject?.price:productDetails?.price}
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
              {newVariants?.[0] && newVariants?.[0]?.values?.length ? (
                <FormControl sx={{ width: "100%" }} size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select {newVariants?.[0]?.name}
                  </InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={variant?.[newVariants?.[0]?.name] || 0}
                    value={variant?.[newVariants?.[0]?.name] || 0}
                    label="Select Size"
                    onChange={(event) =>
                      handleChange({
                        key: newVariants?.[0]?.name,
                        value: event.target.value,
                      })
                    }
                  >
                    {newVariants?.[0]?.values?.map((variant, index) => (
                      <MenuItem key={index} value={variant}>
                        {variant}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </Box>
            {newVariants?.length > 1
              ? newVariants
                  ?.filter((item, index) => item.values?.length && index !== 0)
                  ?.map((variantItem, index) => (
                    <Box key={variantItem?.name}>
                      <h1 style={{ marginBottom: "12px" }}>
                        {variantItem?.name} :
                      </h1>
                      <Stack direction={"row"} gap={"12px"}>
                        {variantItem?.values?.map((ValueVariant, index) => (
                          <span
                            onClick={() =>
                              handleChange({
                                key: variantItem?.name,
                                value: ValueVariant,
                              })
                            }
                            key={index + ValueVariant}
                            className={styles.color}
                            style={{
                              marginLeft: "6px",
                              padding: "4px 12px",
                              borderRadius: "8px",
                              backgroundColor:
                                variant?.[variantItem?.name] === ValueVariant
                                  ? "var(--brown)"
                                  : "transparent",
                              color:
                                variant?.[variantItem?.name] === ValueVariant
                                  ? "white"
                                  : "var(--rhine-castle)",
                              border:
                                variant?.[variantItem?.name] === ValueVariant
                                  ? "2px solid var(--brown)"
                                  : "1px solid black",
                              cursor: "pointer",
                            }}
                          >
                            {ValueVariant}
                          </span>
                        ))}
                      </Stack>
                    </Box>
                  ))
              : null}
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
                disabled={
                  !selectedVariantObject|| productDetails?.variants?.length < 1 ||
                  counter < 1 ||
                  counter >selectedVariantObject?.stock
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (counter > selectedVariantObject?.stock) {
                    toast.error("Out of stock");
                    return;
                  }

                  setOpen(true);
                  dispatch(cartActions.add({ id: +id, count: counter }));
                  addToCart(
                    +id,
                    counter,
                    selectedVariantObject?.id
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "12px 0px",
              }}
            >
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
          mx: { xs: "20px", md: "40px", lg: "60px" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginLeft: { xs: "5px", md: "10px", lg: "20px" },
            marginBottom: "16px",
            fontWeight: "400",
            fontSize: { xs: "24px", md: "32px", lg: "40px" },
          }}
        >
          You may also like
        </Typography>
        <SwiperComponent setReload={setReload} items={relatedProducts} />
      </Box>
    </>
  );
}

function transformVariants(variants) {
  const optionsMap = {};

  variants?.forEach((variant) => {
    variant?.options?.forEach((option) => {
      const { name } = option.option;
      const { value } = option.value;

      if (!optionsMap[name]) {
        optionsMap[name] = new Set();
      }

      optionsMap[name].add(value);
    });
  });

  const newVariants = Object.entries(optionsMap).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));

  return newVariants;
}
