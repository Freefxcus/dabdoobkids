import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ClothesCard from "./ClothesCard";

export default function SwiperComponent({items}) {
    console.log(items, "itemsrelatedddd123123");
    
  return (
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
        spaceBetween: 10,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
  
    }}
  >
    {items?.data?.data?.products.map((item) => (
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
  )
}
