// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// export default function SwiperComponent({items}) {
//   return (
//     <Swiper
//     className="mySwiper"
//     grabCursor={true}
//     autoplay={{
//       delay: 2000,
//       disableOnInteraction: false,
//     }}
//     navigation={false}
//     modules={[Navigation]}
//     breakpoints={{
//       // when window width is >= 320px
//       320: {
//         slidesPerView: 2,
//         spaceBetween: 10,
//       },
//       // when window width is >= 480px
//       480: {
//         slidesPerView: 2,
//         spaceBetween: 20,
//       },
//       // when window width is >= 768px
//       768: {
//         slidesPerView: 3,
//         spaceBetween: 30,
//       },
//       // when window width is >= 1024px
//       1024: {
//         slidesPerView: 4,
//         spaceBetween: 40,
//       },
//       1700: {
//         slidesPerView: 5,
//         spaceBetween: 40,
//       },
//       2700: {
//         slidesPerView: 6,
//         spaceBetween: 40,
//       },
//     }}
//   >
//     {products?.array
//       .filter((item, i) => item.category.id == currentCat.id)
//       .slice(0, mobile ? 2 : 4)
//       .map((item) => (
//         <SwiperSlide
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             // alignItems: "center",
//           }}
//         >
//           <ClothesCard item={item} />
//         </SwiperSlide>
//       ))}
//   </Swiper>
//   )
// }
