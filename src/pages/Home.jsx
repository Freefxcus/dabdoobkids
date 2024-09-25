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
import CartProgress from "../components/CartProgress.jsx";
import BannerSwiper from "../components/Home/BannerSwiper.jsx";
import NewArrival from "../components/Home/NewArrival.jsx";
import { Helmet } from "react-helmet";
import BrandsSwiper from "../components/Home/BrandsSwiper.jsx";
import DailySaleComponent from "../components/Home/DailySaleComponent.jsx";
import TestimonialsList from "../components/Home/TestimonialsList.jsx";

export default function Home() {
  const mobile = useMediaQuery("(max-width:300px)");

  const [currentCat, setCurrentCat] = useState("");
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);


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
        console.log(res?.products, "<<<<<<<<ressss");
        setProducts(res?.products);
      })
      .catch((err) => {
        notifyError(err);
      });

    //* categories
    instance
      .get("/categories", {
        params: {
          items:9,
          paginated: false,
        },
      })
      .then((response) => {
        console.log(response?.data?.data?.categories, "categoriesasdasdsdasd");
        setCategories(response?.data?.data?.categories);
      })
      .catch((err) => {
        notifyError(err);
      });
  
  }, [reload]);
  const dispatch = useDispatch();

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

  console.log("categories", categories, "products", products);

  return (
    <>
      {/* <Helmet>
        <title>{"metaData.title"}</title>
        <meta name="description" content={"metaData.description"} />
      </Helmet> */}
      <BannerSwiper />
      {products?.length < 0 && (
        <>
          <Loader open={true} />
          <div style={{ height: "500px" }} />
        </>
      )}
      {products?.length === 0 && (
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

      {products?.length > 0 && (
        <>
          {/* swiper */}
          {/* new arrival */}

          <NewArrival products={products} categories={categories} />
        </>
      )}
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
            // maxWidth: "100%",
            width:"auto",
            alignContent: "start",
          }}
        >
          {categories.map((item) => (
            <Category item={item} />
          ))}
        </Box>
      </div>
      {/* ticker */}
      <div className={`${styles["image-ticker"]} section-bottom-margin`}>
       <BrandsSwiper />
      </div>
      {/* daily sale */}
      <DailySaleComponent categories={categories} />  

 {/* Testimonials*/}
      <TestimonialsList />
      {/* Best Value offers */}
      <div className={"padding-container section-bottom-margin"}>
        <div >
          <div
            className={`${styles["offers-title"]}  ${styles["offers-title-sub"]}`}
          >
            Dabdoob KIDZ
          </div>
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
  );
}
