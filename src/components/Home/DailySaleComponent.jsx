import React, { useEffect, useState } from "react";

import styles from "../../styles/pages/Home.module.css";
import CountdownTimer from "../CountdownTimer";
import Star from "../Star";
import ClothesCard from "../ClothesCard";
import instance from "../../utils/interceptor";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
export default function DailySaleComponent() {
  const [products, setProducts] = useState([]);
  const [endDate, setEndDate] = useState([]);
    const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  useEffect(() => {
    const calculateTimeLeft = (saleEndTime) => {
 
      const end=new Date(saleEndTime).getTime()
      const now = new Date().getTime();
      const difference = end - now;
      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Sale has ended
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const fetchDailySaleProducts = async () => {
      try {
        const response = await instance.get("/products/sale");
        const productsData = response?.data?.data?.products;
        const saleEndTime = response?.data?.data?.sale?.end;

        if (productsData) {
          setProducts(productsData);
          calculateTimeLeft(saleEndTime);
          setEndDate(saleEndTime)
        }
      } catch (err) {
        console.error("Failed to fetch daily sale products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailySaleProducts();
  }, []);

  if (loading) {
    return <div>Loading daily sale products...</div>;
  }

  if (error) {
    return <div>Error fetching daily sale products: {error.message}</div>;
  }

 
  return (
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
            <CountdownTimer hours={timeLeft.hours} 
      minutes={timeLeft.minutes} 
      seconds={timeLeft.seconds} 
      type="b"  />
          </div>
          <Star type="b" />
        <div
          onClick={() => navigate(`/search?sale=true&endDate=${endDate}`)}
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
      <div >
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
          {/* .filter((item, i) => item?.category?.id === (currentCat?.id||1)) */}
          {products?.length ? (
            products?.map((item) => (
              <SwiperSlide
                key={item.id || item._id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <ClothesCard item={item} />
              </SwiperSlide>
            ))
          ) : (
            <>not products</>
          )}
        </Swiper>
      </div>
    </div>
  );
}
