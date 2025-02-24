import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../components/Loader";
import SingleProductModal from "../components/singleProduct/SingleProductModal.jsx";
import delivery from "../images/delivery.png";
import styles from "../styles/pages/Details.module.css";
import { getProductById } from "../utils/apiCalls";

import { CircularProgress, Modal, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { Add, Minus, ShoppingCart } from "iconsax-react";
import LayoutRelatedProducts from "../components/cart/LayoutRelatedProducts.jsx";
import ExpandableText from "../components/ExpandableText.jsx";
import ModalSize from "../components/productDetail/ModalSize.jsx";
import WishlistProductDetails from "../components/singleProduct/WishlistProductDetails.jsx";
import {
  useAddToCartMutation,
  useGetAllCartsQuery,
} from "../Redux/cartApi.jsx";
import { cartActions, isUserAuth } from "../Redux/store.js";
import { calcDiscount, notifyError, notifySuccess } from "../utils/general.js";
import HandleMessageIsAuth from "../utils/message/index.js";
import Empty from "./empty.jsx";
export default function Details() {
  const isAuth = useSelector(isUserAuth);

  const [openModalSize, setOpenModalSize] = useState(false);

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() + 14);
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 20);

  const formattedStartDate = format(startDate, "dd MMMM");
  const formattedEndDate = format(endDate, "dd MMMM");
  const { id } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname, id]);
  const transformVariants = useCallback((variants) => {
    const optionsMap = {};

    variants?.forEach((variant) => {
      variant?.options?.forEach((option) => {
        const { name } = option.option || {};
        const { value } = option.value || {};

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

  const cartOffline = useSelector((state) => state.cart.products);

  const isRecentProductOffline = cartOffline.find(
    (product) => product.id === productDetails.id
  );

  const [counter, setCounter] = useState(() =>
    !isAuth && isRecentProductOffline ? isRecentProductOffline.count : 1
  );
  const [variant, setVariant] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    if (productDetails.status !== "in-stock" || !productDetails.stock) {
      notifyError("Out of stock");
      return;
    } else if (counter > productDetails.stock) {
      notifyError("Please Change Count");
      return;
    }

    try {
      const response = await addToCart(item).unwrap(); // Unwrap to handle promise rejection

      if (response?.status === "success")
        notifySuccess("1 Item Added To Your cart!");
      if (response?.status !== "success") notifyError("Failed to add to cart");
    } catch (error) {
      if (isErrorAddCart) notifyError("Failed to add to cart");
    }
  };

  const handleChange = ({ key, value }) => {
    setVariant((prev) => ({ ...prev, [key]: value }));
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
    setLoading(true);
    getProductById(id).then((res) => {
      setProductDetails(res);
      setLargeImage(res?.images[0]);
      setLoading(false);
    });
  }, [id]);

  // Update Product Count If Found In Cart
  useEffect(() => {
    if (cartItems.length && productDetails) {
      const productFind = cartItems.find(
        (item) => item.product.id === productDetails.id
      );

      if (productFind) {
        setCounter(productFind.count);
        // setReload(true);
      }
    }
  }, [cartItems, loading]);

  const newVariants = useMemo(
    () => transformVariants(productDetails?.variants) || [],
    [productDetails?.variants, transformVariants]
  );

  const selectedVariantObject =
    productDetails?.variants &&
    productDetails?.variants?.find((variantItem) =>
      variantItem.options.some(
        (option) => variant[option?.option?.name] === option?.value?.value
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
  // useEffect(() => {
  //   selectedVariantObject?.gallery?.[0]
  //     ? setLargeImage(selectedVariantObject?.gallery?.[0])
  //     : setLargeImage(productDetails?.images?.[0]);
  // }, [selectedVariantObject]);

  // Example usage
  const finalPrice = calcDiscount(selectedVariantObject, productDetails);

  // New Code

  const dispatch = useDispatch();

  const addToCartOffline = () => {
    if (
      productDetails.status !== "in-stock" ||
      !productDetails.stock ||
      counter > selectedVariantObject?.stock
    ) {
      notifyError("Out of stock");
      return;
    } else if (counter > productDetails.stock) {
      notifyError("Please Change Count");
      return;
    }

    const product = {
      id: productDetails.id,
      name: productDetails.name,
      description: productDetails.description,
      category: productDetails.category,
      stock: productDetails.stock,
      images: productDetails.images,
      price: productDetails.price,
      count: counter,
      variant: selectedVariantObject?.id,
      variantInformation: selectedVariantObject,
      brand: productDetails.brand,
      sale: productDetails?.sale || {},
    };

    dispatch(cartActions.addProduct(product));
    notifySuccess("1 Item Added To Your cart!");
  };

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
          className={`${styles["container"]} padding-container section-top-margin section-bottom-margin`}
        >
          <Box
            component={"div"}
            sx={{ display: { sm: "flex", xs: "none" } }}
            className={styles["images-section"]}
          >
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
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
              aspectRatio: 0.8,
              position: "relative",
              width: "98vw",
            }}
          >
            <Swiper
              className="mySwiper"
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              speed={2000}
              loop
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
            >
              {productDetails.images.slice(0, 4).map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component={"div"}
                    sx={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",

                      display: "flex",
                      aspectRatio: 0.8,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
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
              {finalPrice?.discount ? (
                <>
                  <span>EGP {finalPrice.priceAfter}</span>{" "}
                  <s
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      color: "var(--grey-text)",
                    }}
                  >
                    EGP {finalPrice.price}{" "}
                  </s>
                </>
              ) : productDetails?.sale ? (
                <>
                  <span>
                    EGP{" "}
                    {productDetails.sale.discountType === "percentage"
                      ? productDetails.price -
                        (productDetails?.price *
                          productDetails.sale.discountAmount) /
                          100
                      : finalPrice.price - +productDetails.sale.discountAmount}
                  </span>{" "}
                  <s
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      color: "var(--grey-text)",
                    }}
                  >
                    EGP {finalPrice.price}{" "}
                  </s>
                </>
              ) : (
                <span>EGP {finalPrice.price}</span>
              )}
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
            <div className={styles.sizeGuide}>
              Size
              <button onClick={() => setOpenModalSize(true)}>Size guide</button>
            </div>

            <Modal open={openModalSize} onClose={() => setOpenModalSize(false)}>
              <ModalSize
                brand={productDetails.brand.name}
                close={() => setOpenModalSize(false)}
              />
            </Modal>

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
                            productDetails?.variants?.filter((variant) =>
                              variant?.options.some(
                                (option) =>
                                  variantItem?.name == option?.option?.name &&
                                  ValueVariant == option?.value?.value
                              )
                            );
                          const isAvailable = matchingVariant?.some(
                            (item) =>
                              item.options.some(
                                (option) =>
                                  newVariants?.[0]?.name ==
                                    option?.option?.name &&
                                  variant?.[newVariants?.[0]?.name] ==
                                    option?.value?.value
                              ) && item?.stock != 0
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

            <div className={styles["row"]}>
              {selectedVariantObject ? (
                selectedVariantObject.stock > 10 ? null : (
                  <span style={{ color: "orange" }}>
                    {" "}
                    {/* Only {selectedVariantObject.stock} left in stock{" "} */}
                  </span>
                )
              ) : (
                <span style={{ color: "#000" }}> out of stock </span>
              )}
            </div>

            <div className={`${styles["row"]} ${styles["btns-action"]}`}>
              <Box
                className={`${styles["row"]} ${styles["btn-count"]}`}
                sx={{
                  padding: { xs: "8px 4px", sm: "13px 8px" },
                  border: "1px solid var(--unicorn-silver)",
                  borderRadius: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "nowrap",
                }}
              >
                <Minus
                  onClick={() => {
                    if (counter > 1) {
                      setCounter((prev) => prev - 1);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  size="20"
                  variant="Outline"
                  color="#1B1B1B"
                />
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {counter}
                </div>
                <Add
                  onClick={() => {
                    setCounter((prev) => prev + 1);
                  }}
                  style={{ cursor: "pointer" }}
                  size="20"
                  variant="Outline"
                  color="#1B1B1B"
                />
              </Box>
              {isAuth ? (
                <button
                  className={styles["cart-button"]}
                  style={{
                    opacity: counter < 1 ? ".3" : "1",
                    pointerEvents: counter < 1 ? "none" : "initial",
                  }}
                  disabled={
                    CartAddLoad ||
                    selectedVariantObject?.stock == 0 ||
                    !selectedVariantObject ||
                    productDetails?.variants?.length < 1 ||
                    counter < 1 ||
                    counter > selectedVariantObject?.stock
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (counter > selectedVariantObject?.stock) {
                      notifyError("Out of stock");
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
                    if (newCount === 0 && counter <= +productDetails.stock)
                      newCount += 1;
                    HandleMessageIsAuth(() => {
                      handleAddToCart([
                        {
                          product: +id,
                          count: newCount,
                          variant: selectedVariantObject?.id,
                        },
                      ]);
                      setOpen(true);
                    });
                  }}
                >
                  <ShoppingCart size="24" color="#FFF" />
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
              ) : (
                <button
                  className={styles["cart-button"]}
                  disabled={
                    CartAddLoad ||
                    productDetails?.stock == 0 ||
                    selectedVariantObject?.stock == 0 ||
                    !selectedVariantObject ||
                    counter < 1 ||
                    counter > productDetails?.stock
                  }
                  onClick={addToCartOffline}
                >
                  <ShoppingCart size="24" color="#FFF" />
                  Add To Cart
                </button>
              )}

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
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--errie-black)",
              }}
            >
              Description
            </div>
            <ExpandableText text={productDetails.description} />
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
                <div>
                  Door delivery between {formattedStartDate} and{" "}
                  {formattedEndDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Police /> */}
      <Box
        sx={{
          mx: { xs: "20px", md: "40px", lg: "150px" },
          mb: { xs: "120px", md: "140px", lg: "160px" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginLeft: { xs: "5px", md: "10px", lg: "0px" },
            marginBottom: "16px",
            fontWeight: "400",
            fontSize: { xs: "24px", md: "32px", lg: "40px" },
          }}
        >
          You may also like
        </Typography>

        <LayoutRelatedProducts
          categoryId={productDetails?.category?.id}
          productId={productDetails.id}
        />
      </Box>
    </>
  );
}
