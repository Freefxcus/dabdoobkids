import React, { useEffect, useState, memo , useRef} from "react";
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

const LazyBackground = ({ imageUrl, className, children }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ backgroundImage: loaded ? `url(${imageUrl})` : "none" }}
      aria-label="Shop Now!"
      role="img"
    >
      {children}
    </div>
  );
};

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
        loop={true}
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
                  aria-label="Shop Now!"
                 
                ></Box>
              </SwiperSlide>
            ))
          : bannerImages.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  className={styles.bannerBox}
                  //style={{ backgroundImage: `url(${img})` }}
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "block",
                    width: "100%",
                    height: "400px",
                  }}
                  aria-label="Shop Now!"
                >
                <img
                    src={img}
                    srcSet={`
                      ${img.replace(".webp", "-400px.webp")} 400w,
                      ${img.replace(".webp", "-800px.webp")} 800w,
                      ${img.replace(".webp", "-1200px.webp")} 1200w
                    `}
                    sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                    alt="Shop Now"
                    loading={index === 0 ? "eager" : "lazy"} // Load first image immediately
                    decoding="async"
                    width="1200"
                    height="400"
                    style={{ display: "none" }} // Hide img but allow browser to preload it
                  />
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
