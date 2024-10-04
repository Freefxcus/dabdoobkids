import React, { useEffect, useState, memo } from "react";
import styles from "../../styles/pages/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";

import { Box, Typography } from "@mui/material";
import { getBanners } from "../../utils/apiCalls";
import { useNavigate, Link } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";

const BannerSwiper = () => {
  const bannerImages = [banner1, banner2];
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        console.log("fetchBanners", data);
        setBanners(data);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div
        className={`${styles["banner-container"]} section-bottom-margin`}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <div>Error loading banners</div>;
  }

  return (
    <div className={`${styles["banner-container"]} section-bottom-margin`} style={{ position: "relative" }}>
      <Swiper
        className="mySwiper"
        grabCursor={true}
        pagination={{ clickable: true }}
        speed={2000}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}
      >
        {banners?.categories.length
          ? banners.categories.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  component={Link}
                  to={item?.url}
                  className={styles.bannerBox}
                  style={{ backgroundImage: `url(${item?.image})` }}
                ></Box>
              </SwiperSlide>
            ))
          : bannerImages.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  className={styles.bannerBox}
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <Box>
                    <Typography variant="h1" className={styles.bannerTitle}>
                      Dabdoob KIDZ
                    </Typography>
                    <Typography className={styles.bannerSubtitle}>
                      Make yourself look different without old-fashioned clothes and impress others
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default memo(BannerSwiper);