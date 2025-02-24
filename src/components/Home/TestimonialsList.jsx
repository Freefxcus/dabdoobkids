import { Box, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getTestimonials } from '../../utils/apiCalls';
import styles from "../../styles/pages/Home.module.css";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
export default function TestimonialsList() {
    const [Testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true); // To handle the loading state
    const [error, setError] = useState(null); // To handle the error state
  
  
    useEffect(() => {
      const fetchTestimonials = async () => {
        try {
          const data = await getTestimonials();
          console.log("fetchTestimonials",data);
          
          setTestimonials(data);
        } catch (err) {
          console.error('Failed to fetch Testimonials:', err);
          setError(err); // You can also notify the error to the user if needed
        } finally {
          setLoading(false);
        }
      };
  
      fetchTestimonials();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator
    }
  
    if (error) {
      return <div>Error loading Testimonials</div>; // Show an error message
    }
  
  return (  <div className="padding-container section-bottom-margin">
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <h1 className={styles.title}>Testimonials</h1>

  
    </div>
    <Box
    component={Swiper}
    sx={{
      display: "grid",
  
      paddingY: 5,
      gap:{xs:1,sm:2,lg:3}
    }}
  
     className="mySwiper"
          grabCursor={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1700: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            2700: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
    {Testimonials?.categories?.map((item,index) => (
      <SwiperSlide
                key={(item.id || item._id)+index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  aspectRatio:0.9
                  // alignItems: "center",
                }}
              >
        <CardMedia
        loading='lazy'
          sx={{
            width: "100%",
            aspectRatio: {xs:0.9 ,sm:0.9},
            objectFit: "cover",
            borderRadius:"12px"
          }}
          component={"img"}
          src={
            item?.image|| "https://i.postimg.cc/HnNLbVGh/placeholder.png"
          }
        />
        </SwiperSlide>
    ))}
  </Box>
  </div>
  )
}
