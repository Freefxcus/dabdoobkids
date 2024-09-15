import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../utils/interceptor";
import "./style.css"
export default function BrandsSwiper() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(() => Math.ceil(window.innerWidth / 300));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await instance.get("/brands", {
          params: { items: 50 },
        });
        setBrands(response?.data?.data?.brands);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
        setError(err); // Notify the error if needed
      } finally {
        setLoading(false);
      }
    };

    

    fetchBanners();
   
  }, []);

  // Update the limit on window resize
  useEffect(() => {
    const handleResize = () => {
      setLimit(Math.ceil(window.innerWidth / 300));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (error) {
    return <div>Error loading banners</div>; // Show an error message
  }

  const repeatCount = Math.ceil(limit / brands.length);

  // Create a new array with the repeated brands
  const newBrands = [...Array(repeatCount + 3)].flatMap(() => brands);

  return (
    

<article class="wrapper">
  <div class="marquee">
    <div class="marquee__group">
    {brands?.length
        ? newBrands.map(({ images, name, id }, index) => (
            <img
              key={index}
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
          ))
        : null}
    </div>
  </div>

 </article>

   
  );
}


{/* <Swiper
className="mySwiper"
slidesPerView={limit}
speed={10000}
autoplay={{ <marquee ref={marqueeRef} direction="left">
    
    </marquee>
  delay: 0,
  disableOnInteraction: false,
}}
modules={[Autoplay, Pagination, Navigation]}
// pagination={{ clickable: true }}
loop={true}
>
<div className="swiper-container" style={{ width: "100%" }}>
  {brands?.length
    ? newBrands.map(({ images, name, id }, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "fit-content !important",
          }}
        >
          <div style={{ width: "250px", height: "150px" }}>
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
          </div>
        </SwiperSlide>
      ))
    : null}
</div>
</Swiper> */}