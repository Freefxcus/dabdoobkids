import { Box, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getTestimonials } from '../../utils/apiCalls';
import styles from "../../styles/pages/Home.module.css";
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
    sx={{
      display: "grid",
      gridTemplateColumns: {
        lg: "repeat(3,1fr)",
        md: "repeat(2,1fr)",
        xs: "repeat(1,1fr)",
      },
      justifyItems: "center",
      paddingY: 5,
      gap:{xs:1,sm:2,lg:3}
    }}
  >
    {Testimonials?.categories?.map((item) => (
        <CardMedia
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
    ))}
  </Box>
  </div>
  )
}
