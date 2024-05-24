import { useEffect, useState } from "react";
import styles from "../styles/pages/Categories.module.css";
import Category from "../components/Category";
import { getCategories } from "../utils/apiCalls";
import { Box } from "@mui/material";
export default function Categories() {
  const [largeImage, setLargeImage] = useState();
  const [categoriesData, setCategoriesData] = useState({});
  useEffect(() => {
    getCategories().then((res) => {
      setCategoriesData(res);
    });
      
  }, []);


  return (
    <div style={{padding : "12px" }}>
      <div className={styles.title}>Categories</div>
      <Box sx={{display : "grid" , gridTemplateColumns : {lg : "repeat(3, 1fr)" , md : "repeat(2,1fr)" , xs :"repeat(1, 1fr)"} , justifyItems : "center", gap : "22px"}}>
   
        {categoriesData?.categories?.map((category) => (
          <Category item={category} />
        ))}
      </Box>
    </div>
  );
}
