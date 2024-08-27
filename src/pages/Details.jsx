import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "../styles/pages/Details.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import delivery from "../images/delivery.png";
import cartImg from "../images/cart.png";
import { useParams } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../utils/apiCalls";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import SingleProductModal from "../components/singleProduct/SingleProductModal.jsx";

import SwiperComponent from "../components/Swiper.jsx";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { set } from "lodash";
import Empty from "./empty.jsx";
import HandleMessageIsAuth from "../utils/message/index.js";
import WishlistProductDetails from "../components/singleProduct/WishlistProductDetails.jsx";
import {
  useAddToCartMutation,
  useGetAllCartsQuery,
} from "../Redux/cartApi.jsx";
import { notifyError, notifySuccess } from "../utils/general.js";

export default function Details() {
  const { id } = useParams();

  const transformVariants = useCallback((variants) => {
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
  }, []);

  const [productDetails, setProductDetails] = useState({});

  const [largeImage, setLargeImage] = useState("");

  const [counter, setCounter] = useState(1);
  const [variant, setVariant] = useState({});
  const [open, setOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: cartData } = useGetAllCartsQuery();
  const cartItems = cartData?.data || [];
  const [
    addToCart,
    {
      isLoading: CartAddLoad,
      isSuccess: isSuccessAddCart,
      isError: isErrorAddCart,
      data: addToCartData, // Contains the response from the mutation if successful
      error: addCartError, // Capture the error object
    },
  ] = useAddToCartMutation();
  const handleAddToCart = async (item) => {
    try {
      const response = await addToCart(item).unwrap(); // Unwrap to handle promise rejection

      if (isSuccessAddCart) {
        const message = `Added ${productDetails?.name} to cart!`;
        notifySuccess(message);
      }
    } catch (error) {
      if (isErrorAddCart) {
        const errorMessage =
          addCartError?.data?.message || "Failed to add to cart";
        notifyError(errorMessage);
      }
    }
  };
  const handleChange = ({ key, value }) => {
    setVariant((prev) => ({ ...prev, [key]: value }));
    console.log(key, value, "variantvariantvariantvariant", variant);
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

  const newVariants = useMemo(
    () => transformVariants(productDetails?.variants) || [],
    [productDetails?.variants, transformVariants]
  );

  const selectedVariantObject = productDetails?.variants?.find((variantItem) =>
    variantItem.options.every(
      (option) => variant[option.option.name] === option.value.value
    )
  );
  useEffect(() => {
    if (newVariants?.length) {
      newVariants.forEach((VariantItem) => {
        if (VariantItem?.name && VariantItem?.values?.[0]) {
          handleChange({
            key: VariantItem.name,
            value: VariantItem.values[0],
          });
        }
      });
    }
  }, [newVariants]);
  useEffect(() => {
    selectedVariantObject?.gallery?.[0]
      ? setLargeImage(selectedVariantObject?.gallery?.[0])
      : setLargeImage(productDetails?.images?.[0]);
  }, [selectedVariantObject]);

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
          className={`${styles["container"]} margin-container section-top-margin section-bottom-margin`}
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
              ${" "}
              {selectedVariantObject
                ? selectedVariantObject?.price
                : productDetails?.price}
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
            <div className={styles["line"]}></div>
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
                    className={styles["select"]}
                    sx={{
                      width: "100%",
                      ".Mui-focused .MuiSelect-select ": {
                        borderColor: "#ad6b46",
                        color: "#ad6b46",
                      },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={newVariants?.[0]?.values?.[0] || 0}
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
                        {variantItem?.values?.map((ValueVariant, index) => {
                          // Find the variant that matches the current ValueVariant
                          const matchingVariant =
                            productDetails?.variants?.find((variant) =>
                              variant?.options.some(
                                (option) =>
                                  variantItem?.name == option?.option?.name &&
                                  ValueVariant == option?.value?.value
                              )
                            );
                          const isAvailable = matchingVariant.options.some(
                            (option) =>
                              newVariants?.[0]?.name == option?.option?.name &&
                              variant?.[newVariants?.[0]?.name] ==
                                option?.value?.value
                          );
                          // Check if the matching variant is in stock

                          return (
                            <button
                              onClick={() =>
                                handleChange({
                                  key: variantItem?.name,
                                  value: ValueVariant,
                                })
                              }
                              key={index + ValueVariant}
                              className={styles["color"]}
                              style={{
                                marginLeft: "6px",
                                padding: "4px 12px",
                                borderRadius: "8px",
                                opacity: isAvailable ? 1 : 0.7,
                                textDecoration: isAvailable
                                  ? "none"
                                  : "line-through",
                                backgroundColor:
                                  variant?.[variantItem?.name] === ValueVariant
                                    ? "var(--brown)"
                                    : isAvailable
                                    ? "white"
                                    : "#9f9f9f99",
                                color:
                                  variant?.[variantItem?.name] === ValueVariant
                                    ? "white"
                                    : "var(--rhine-castle)",
                                border:
                                  variant?.[variantItem?.name] === ValueVariant
                                    ? "2px solid var(--brown)"
                                    : "1px solid black",
                                cursor: isAvailable ? "pointer" : "not-allowed",
                              }}
                            >
                              {ValueVariant}
                            </button>
                          );
                        })}
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
            <div className={styles["row"]}>
              {selectedVariantObject
                ? selectedVariantObject.stock > 10
                  ? null
                  : `  Only  ${selectedVariantObject.stock} left in stock `
                : "out of stock please select another option"}
            </div>
            <div className={styles["row"]}>
              <div
                className={styles["row"]}
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
                  CartAddLoad || productDetails?.variants?.length
                    ? !selectedVariantObject ||
                      productDetails?.variants?.length < 1 ||
                      counter < 1 ||
                      counter > selectedVariantObject?.stock
                    : false
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (counter > selectedVariantObject?.stock) {
                    toast.error("Out of stock");
                    return;
                  }
                  let itemForCart = cartItems?.find(
                    (cartItem) =>
                      cartItem?.product.id == +id &&
                      cartItem?.variant?.id == selectedVariantObject?.id
                  );
                  let newCount = itemForCart
                    ? Math.trunc(counter - itemForCart.count)
                    : counter;
                  if(newCount === 0) return 0;
                     HandleMessageIsAuth(() =>{
                        handleAddToCart([
                          {
                            product: +id,
                            count: newCount,
                            variant: selectedVariantObject?.id,
                          },
                        ])
                         setOpen(true)  }
                      )
                 
                }}
              >
                <img src={cartImg} width="16px" alt="cart" />
                {CartAddLoad ? (
                  <Stack
                    direction="row"
                    justifyContent={"center"}
                    gap={2}
                    alignItems={"center"}
                  >
                    {" "}
                    <CircularProgress
                      color="inherit"
                      size="1rem"
                      sx={{ width: "12px" }}
                    />{" "}
                    Loading
                  </Stack>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>
              <SingleProductModal
                open={open}
                handleClose={setOpen}
                productDetails={productDetails}
                cartItems={cartItems}
                selectedVariantObject={selectedVariantObject}
              />
              <WishlistProductDetails id={+id} />
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
