import styles from "../../styles/pages/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import arrow from "../../images/arrow.svg";
import Star from "../../components/Star";

import { useState } from "react";
import CountdownTimer from "../CountdownTimer";
import { Box, Typography } from "@mui/material";

export default function BannerSwiper() {
  const bannerImages = [banner1, banner2];

  const [activeSlide, setActiveSlide] = useState(0);

  return (
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
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
        modules={[Autoplay, Pagination]}
        // onSlideChange={(e) => setActiveSlide(e.activeIndex)}
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide>
            <Box
              sx={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: "white",
                    fontFamily: "Playfair Display, serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize : {xs : "2rem", sm : "3rem", md : "4rem", lg : "5rem"},
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  Dabdoob KIDZ
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize : {xs : "1rem", sm : "1rem", md : "1rem", lg : "2rem"},
                    fontWeight: 300,
                    maxWidth: "80%",
                    mx: "auto",
                    wordBreak: "break-word",
                  }}
                >
                  Make yourself look different without old-fashioned clothes and
                  impress others
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
