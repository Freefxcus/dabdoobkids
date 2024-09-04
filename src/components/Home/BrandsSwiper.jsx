import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/interceptor";
import styles from "../../styles/pages/Home.module.css";
export default function BrandsSwiper() {
  const [brands, setBrands] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    instance
      .get("/brands", {
        //   params: { limit: 100 },
      })
      .then((response) => {
        setBrands(response?.data?.data?.brands);
      })
      .catch(() => {});
  }, []);
  return (
    <Swiper
      className="mySwiper"
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      spaceBetween={1}
      grabCursor={true}
      speed={5000}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 0,
      }}
      modules={[Autoplay, Pagination]}
      // onSlideChange={(e) => setActiveSlide(e.activeIndex)}
    >
      {" "}
      {brands &&
        brands.map(({ images, name, id }, index) => (
          <SwiperSlide
            key={index}
            className={styles["brand-slide"]}
            style={{
              width: "150px !important",
              height: "250px !important",
              position: "relative",
            }}
          >
            <img
              src={images[0]}
              alt={name}
              style={{
                cursor: "pointer",
                objectFit: "contain",
                objectPosition: "center",
              }}
              onClick={() => {
                navigate(`search/?brandId=${id}`);
              }}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
