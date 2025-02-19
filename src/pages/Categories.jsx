"use client";

import { useEffect, useState } from "react";
import styles from "../styles/pages/Categories.module.css";
import Category from "../components/Category";
import { getCategories } from "../utils/apiCalls";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Categories() {
  console.log("categories rendered");
  const [categoriesData, setCategoriesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // enhanse error handling
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await getCategories();
        setCategoriesData(res);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  // enhance responsive
  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Categories
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: "10px", sm: "15px", md: "20px" },
          p: { xs: "20px 0 50px", md: "50px 0 100px" },
          alignContent: "start",
        }}
      >
        {categoriesData?.categories?.map((category) => (
          <Category key={category.id} item={category} />
        ))}
      </Box>
    </div>
  );
}
