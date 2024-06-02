import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styles from "../styles/pages/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import CountdownTimer from "../components/CountdownTimer";
import Form from "../components/Form";
import { Box, Container } from "@mui/material";
import ClothesCard from "../components/ClothesCard";
import OfferCard from "../components/OfferCard";
import Loader from "../components/Loader";
import Category from "../components/Category";
import Star from "../components/Star";
import Popup from "../components/Popup";
import axiosInstance from "../utils/interceptor";
import { userInfoActions, dataActions, wishlistActions } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/interceptor.js";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  getWishlistItems,
  addToWishlist,
  authorize,
} from "../utils/apiCalls.js";
import { notifyError } from "../utils/general.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { current } from "@reduxjs/toolkit";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import arrow from "../images/arrow.svg";
const bannerImages = [banner1, banner2];
export default function Home() {
  const mobile = useMediaQuery("(max-width:300px)");

  const [currentCat, setCurrentCat] = useState("");
  const [reload, setReload] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const data = useSelector((state) => state.data.value);
  console.log(data, "<<<<<<<<<<<<<<<<<Data");

  const products = data.products;
  const categories = data.categories;
  const brands = data.brands;
  let repeatedBands = [];
  if (brands?.array?.length) {
    for (let i = 1; i <= 100; i++) {
      repeatedBands = [...repeatedBands, ...brands.array];
    }
  }
  const wishlist = useSelector((state) => state.wishlist.value);
  const userInfo = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  const isUser = localStorage.getItem("access_token");
  useEffect(() => {
    if (isUser) {
      getWishlistItems()
        .then((res) => {
          const ids = res.map((item) => item.product.id);
          dispatch(wishlistActions.set(ids));
        })
        .catch((err) => {
          if (err?.response?.data?.message === "Unauthorized") {
            authorize(setReload)
              .then(() => {})
              .catch((err) => {
                console.log(err);
              });
          } else {
            notifyError(err);
          }
        });
    }
  }, [reload]);
  useEffect(() => {
    //* products
    getProducts()
      .then((res) => {
        console.log(res, "<<<<<<<<ressss");
        dispatch(
          dataActions.update({
            products: {
              array: res.products,
              metadata: res.metadata,
            },
          })
        );
      })
      .catch((err) => {
        notifyError(err);
      });

    //* categories
    instance
      .get("/categories", {
        params: {
          paginated: false,
        },
      })
      .then((response) => {
        console.log(response, "categoriesasdasdsdasd");
        setCurrentCat(response.data.data.categories[0]);
        dispatch(
          dataActions.update({
            categories: {
              array: response.data.data.categories,
              metadata: response.data.data.metadata,
            },
          })
        );
      })
      .catch((err) => {
        notifyError(err);
      });
    //* brands
    instance
      .get("/brands", {
        // params: { page: 1 },
      })
      .then((response) => {
        dispatch(
          dataActions.update({
            brands: {
              array: response.data.data.brands,
              metadata: response.data.data.metadata,
            },
          })
        );
      })
      .catch(() => {
        notifyError("xxxxxxxxxx");
      });
  }, [reload]);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const [formData, setFormData] = useState({
    // name: "",
    // email: "",
    file: null,
  });

  // *********
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {products?.array?.length < 0 && (
        <>
          <Loader open={true} />
          <div style={{ height: "500px" }} />
        </>
      )}
      {products?.array?.length === 0 && (
        <>
          <div
            style={{
              height: "58.3vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Data
          </div>
        </>
      )}

      {products?.array?.length > 0 && (
        <>
          {/* swiper */}
          <div
            className={`${styles["banner-container"]} section-bottom-margin`}
            style={{ position: "relative" }}
          >
            <Swiper
              className="mySwiper"
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
              onSlideChange={(e) => setActiveSlide(e.activeIndex)}
            >
              {bannerImages.map((img, index) => (
                <SwiperSlide>
                  <img src={img} className="slider-image" />
                </SwiperSlide>
              ))}
            </Swiper>

            <Star type="a" />
            {activeSlide === 0 && (
              <>
                <div className={styles["swiper-text-2"]}>
                  <div className={styles["swiper-text-title-2"]}>
                    DABDOOB KIDS
                  </div>
                  <div className={styles["swiper-text-body-2"]}>
                    Make yourself look different without old-fashioned clothes
                    and impress others.
                  </div>
                  <button className={styles.shop_collection}>
                    <span> Shop Collection</span>
                    <img src={arrow} />
                  </button>
                </div>
              </>
            )}
            {activeSlide === 1 && (
              <>
                <div className={styles["countdown-container"]}>
                  <div
                    className={styles["countdown-title"]}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Daily sale
                  </div>
                  <CountdownTimer
                    hours={5}
                    minutes={30}
                    seconds={20}
                    type="a"
                  />
                </div>
                <div className={styles["swiper-text"]}>
                  <div className={styles["swiper-text-title"]}>
                    DABDOOB KIDS
                  </div>
                  <div className={styles["swiper-text-body"]}>
                    Make yourself look different without old-fashioned clothes
                    and impress others.
                  </div>
                </div>
              </>
            )}
          </div>
          {/* new arrival */}
          <div className="padding-container section-bottom-margin">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div className={styles.title} style={{ marginBottom: "0" }}>
                New arrivals
              </div>
              <div
                style={{
                  color: "var(--brown)",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                All
                {" " +
                  currentCat.name
                    ?.split(" ")[0]
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </div>
            </div>
            <div className={styles["categories-container"]}>
              {categories?.array?.map((item, index) => (
                <div
                  className={
                    item.id === currentCat?.id
                      ? styles["category-active"]
                      : styles.category
                  }
                  onClick={() => setCurrentCat(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            {mobile && (
              <div className="cards_container_a">
                {products.array
                  .filter((item, i) => item.category.id == currentCat.id)
                  .slice(0, mobile ? 2 : 4)
                  .map((item) => (
                    <ClothesCard item={item} />
                  ))}
              </div>
            )}
            {/* swiper */}
            {/* <div className={`${styles["banner-container"]} section-bottom-margin`}> */}
            {!mobile && (
              <div className={`section-bottom-margin`}>
                <Swiper
                  className="mySwiper"
                  grabCursor={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  modules={[Navigation]}
                  breakpoints={{
                    // when window width is >= 320px
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    // when window width is >= 480px
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    // when window width is >= 768px
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    // when window width is >= 1024px
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                    1700: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    2700: {
                      slidesPerView: 6,
                      spaceBetween: 40,
                    },
                  }}
                >
                  {products?.array
                    .filter((item, i) => item.category.id == currentCat.id)
                    .slice(0, mobile ? 2 : 4)
                    .map((item) => (
                      <SwiperSlide
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          // alignItems: "center",
                        }}
                      >
                        <ClothesCard item={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            )}
          </div>
          {/* shop by category */}
          <div className="padding-container section-bottom-margin">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h1 className={styles.title}>Shop by category</h1>

              <span
                onClick={() => navigate("/categories")}
                style={{
                  color: "var(--brown)",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                All Categories
              </span>
            </div>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  lg: "repeat(3,1fr)",
                  md: "repeat(2,1fr)",
                  xs: "repeat(2,1fr)",
                },
                gap: { lg: "20px", md: "10px", xs: "10px" },
                maxWidth: "100%",
                alignContent: "start",
              }}
            >
              {categories?.array?.map((item) => (
                <Category item={item} />
              ))}
            </Box>
          </div>
          {/* ticker */}
          {/* <div className={`${styles["image-ticker"]} section-bottom-margin`}>
            {brands?.array &&
              repeatedBands.map(({ images, name, id }) => (
                <img
                  src={images[0]}
                  alt={name}
                  onClick={() => {
                    navigate(`search/?brandId=${id}`);
                  }}
                />
              ))}
          </div> */}
          {/* daily sale */}
          <div className="padding-container section-bottom-margin">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div>
                <div className={styles.title} style={{ marginBottom: "5px" }}>
                  Daily Sale
                </div>
                <CountdownTimer hours={5} minutes={30} seconds={20} type="b" />
              </div>
              <Star type="b" />
              <div
                style={{
                  marginLeft: "auto",
                  color: "var(--brown)",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                All Collections
              </div>
            </div>

            <div className="cards_container_a">
              {products.array
                .filter((item, i) => item.extraInfo?.sale)
                .slice(0, mobile ? 2 : 4)
                .map((item) => (
                  <ClothesCard item={item} />
                ))}
            </div>
          </div>
          {/* Best Value offers */}
          <div className={"padding-container section-bottom-margin"}>
            <div className={styles["offers-container"]}>
              <div className={styles["offers-title"]}>Dabdoob KIDZ</div>
              <div className={styles["offers-title"]}>Best Value offers</div>
              <div className="cards_container_c">
                {[
                  {
                    id: "1",
                    img: "https://i.postimg.cc/j5Pxd33D/offer1.png",
                    title: "Best Quality Guarantee",
                    body: "Product that arrived at your door already passed our Quality Control procedure.",
                  },
                  {
                    id: "2",
                    img: "https://i.postimg.cc/prv29Q3q/offer2.png",
                    title: "Easy Payment Choice",
                    body: "Various payment choice will give an ease every time you purchase our product.",
                  },
                  {
                    id: "3",
                    img: "https://i.postimg.cc/sfPjk8Z8/offer3.png",
                    title: "On-Time Delivery",
                    body: "We will make sure that all product that you purchased will arrived at your address safely.",
                  },
                  {
                    id: "4",
                    img: "https://i.postimg.cc/rs9q50kc/offer4.png",
                    title: "Best Price",
                    body: "We are offering the best prices of the most authentic UK brands to your door step without taxes or extra fees.",
                  },
                ].map((item) => (
                  <OfferCard item={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
          {/* xxx */}
          <Loader open={false} />
          {/* <Popup open={open} setOpen={setOpen} type="set_new_password" /> */}
          {/* ******* */}
          {/* <form onSubmit={handleSubmit}>
        <label>
          File:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form> */}
        </>
      )}
    </>
  );
}
