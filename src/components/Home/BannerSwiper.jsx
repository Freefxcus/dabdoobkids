import styles from "../../styles/pages/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination,  } from "swiper/modules";
import banner1 from "../../images/banner1.png";
import banner2 from "../../images/banner2.png";
import { useEffect, useState } from "react";
import CountdownTimer from "../CountdownTimer";
import { Box, Typography } from "@mui/material";
import { getBanners } from "../../utils/apiCalls";
import { useNavigate,Link } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation";

export default function BannerSwiper() {
  const bannerImages = [banner1, banner2];
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null); // To handle the error state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        console.log("fetchBanners",data);
        
        setBanners(data);
      } catch (err) {
        console.error('Failed to fetch banners:', err);
        setError(err); // You can also notify the error to the user if needed
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div  className={`${styles["banner-container"]} section-bottom-margin`}
      style={{ display:"flex",justifyContent:"center",alignItems:"center"}}>  <LoadingAnimation />
      </div>; // Show a loading indicator
  }

  if (error) {
    return <div>Error loading banners</div>; // Show an error message
  }

  
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
        speed={2000}
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        
        {banners?.categories.length? banners?.categories.map((item, index) => (
          <SwiperSlide>
            <Box
             
              component={Link}
              to={item?.url}
              sx={{
                backgroundImage: `url(${item?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
            </Box>
          </SwiperSlide>
        )):bannerImages.map((img, index) => (
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
