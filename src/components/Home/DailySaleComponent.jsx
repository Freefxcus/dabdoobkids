import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls

import styles from "../../styles/pages/Home.module.css";
import CountdownTimer from "../CountdownTimer";
import Star from "../Star";
import ClothesCard from "../ClothesCard";
import instance from "../../utils/interceptor";
import { useNavigate } from "react-router-dom";

export default function DailySaleComponent({ categories }) {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [productsCate, setProductsCate] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  useEffect(() => {
    const categoryWithMaxProducts = categories.reduce(
      (maxCategory, currentCategory) => {
        // Return the category with the higher productsCount
        return currentCategory.productsCount > maxCategory.productsCount
          ? currentCategory
          : maxCategory;
      },
      { id: 17, productsCount: -Infinity }
    );
    const fetchDailySaleProducts = async () => {
      const responseCate = await instance.get(
        `/products?category=${categoryWithMaxProducts?.id}`
      );
      setProductsCate(responseCate?.data?.data?.products);
      try {
        const response = await instance.get("/products/sale");

        setProducts(response?.data?.data?.products);

        // Assuming data structure is suitable for ClothesCard
      } catch (err) {
        console.error("Failed to fetch daily sale products:", err);
        setError(err); // Handle error appropriately
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
          <CountdownTimer hours={5} minutes={30} seconds={20} type="b" />
        </div>
        <Star type="b" />
        <div
          onClick={() => navigate("/search?sale")}
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

      <div className="cards_container_a">
        {products?.length ? (
          products?.map((item) => (
            <ClothesCard key={item.id || item._id} item={item} /> // Use unique identifier for key
          ))
        ) : productsCate?.length ? (
          productsCate?.map((item) => (
            <ClothesCard key={item.id || item._id} item={item} /> // Use unique identifier for key
          ))
        ) : (
          <>not products</>
        )}
      </div>
    </div>
  );
}
