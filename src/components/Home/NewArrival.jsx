import { useEffect, useState } from "react";
import styles from "../../styles/pages/Home.module.css";
import ClothesCard from "../ClothesCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { getProducts } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewArrival({ categories }) {
  let selectedCate = categories?.filter(
    (item, index) => item?.productsCount > 0
  );
  const [currentCat, setCurrentCat] = useState(categories?.[0]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentCat(categories?.[0]);
  }, []);
  useEffect(() => {
    getProducts(1, false, currentCat?.id, "", "").then((res) => {
      console.log(res);

      setProducts(res?.products);
    });
  }, [currentCat]);
  return (
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
          Our Collection
        </div>
        <div
          onClick={() => navigate("/search")}
          style={{
            color: "var(--brown)",
            fontSize: "14px",
            cursor: "pointer",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          All Products
        </div>
      </div>
      <div className={styles["categories-container"]}>
        {categories?.map((item, index) =>
          item?.productsCount > 0 ? (
            <div
              className={
                item?.id === currentCat?.id
                  ? styles["category-active"]
                  : styles.category
              }
              onClick={() => setCurrentCat(item)}
            >
              {item?.name}
            </div>
          ) : null
        )}
      </div>

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
          {/* .filter((item, i) => item?.category?.id === (currentCat?.id||1)) */}
          {products?.map((item) => (
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
    </div>
  );
}
