import React, { useState, useEffect, lazy, Suspense } from "react";
import styles from "../styles/pages/Home.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box } from "@mui/material";
import OfferCard from "../components/OfferCard";
import Loader from "../components/Loader";
import Category from "../components/Category";
import { wishlistActions } from "../Redux/store";
import { useDispatch } from "react-redux";
import instance from "../utils/interceptor.js";
import { useNavigate } from "react-router-dom";
import { getProducts, getWishlistItems, authorize } from "../utils/apiCalls.js";
import { notifyError } from "../utils/general.js";
import BannerSwiper from "../components/Home/BannerSwiper.jsx";
import NewArrival from "../components/Home/NewArrival.jsx";

// Lazy load components
const BrandsSwiper = lazy(() => import("../components/Home/BrandsSwiper.jsx"));
const DailySaleComponent = lazy(() =>
  import("../components/Home/DailySaleComponent.jsx")
);
const TestimonialsList = lazy(() =>
  import("../components/Home/TestimonialsList.jsx")
);

export default function Home() {
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isUser = localStorage.getItem("access_token");
  const dispatch = useDispatch();

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
  }, [dispatch, isUser, reload]); // Add dispatch and isUser to the dependency array

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res?.products);
      })
      .catch((err) => {
        notifyError(err);
      });

    instance
      .get("/categories", {
        params: {
          items: 9,
          paginated: false,
        },
      })
      .then((response) => {
        setCategories(response?.data?.data?.categories);
      })
      .catch((err) => {
        notifyError(err);
      });
  }, [reload]);

  return (
    <>
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
          <NewArrival products={products} categories={categories} />
        </>
      )}
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
            width: "auto",
            alignContent: "start",
          }}
        >
          {categories.map((item) => (
            <Category item={item} />
          ))}
        </Box>
      </div>
      <Suspense fallback={<Loader open={true} />}>
        <div className={`${styles["image-ticker"]} section-bottom-margin`}>
          <BrandsSwiper />
        </div>
        <DailySaleComponent categories={categories} />
        <TestimonialsList />
      </Suspense>
      <div className={"padding-container section-bottom-margin"}>
        <div>
          <div
            className={`${styles["offers-title"]}  ${styles["offers-title-sub"]}`}
          >
            Dabdoob KIDZ
          </div>
          <div className={styles["offers-title"]}>Best Value offers</div>
          <div className={styles["bottom-container"]}>
            {[
              {
                id: "1",
                img: "/offer-1.svg",
                title: "Best Quality Guarantee",
                body: "Product that arrived at your door already passed our Quality Control procedure.",
              },
              {
                id: "2",
                img: "/offer-2.svg",
                title: "Easy Payment Choice",
                body: "Various payment choice will give an ease every time you purchase our product.",
              },
              {
                id: "3",
                img: "/offer-3.svg",
                title: "On-Time Delivery",
                body: "We will make sure that all product that you purchased will arrived at your address safely.",
              },
              {
                id: "4",
                img: "/offer-4.svg",
                title: "Best Price",
                body: "We are offering the best prices of the most authentic UK brands to your door step without taxes or extra fees.",
              },
            ].map((item) => (
              <OfferCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
      <Loader open={false} />
    </>
  );
}
