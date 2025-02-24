import BrandsSwiper from "./BrandsSwiper";
import { useEffect, useState } from "react";
import instance from "../../utils/interceptor";

function LayoutBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await instance.get("/brands", {
          params: { items: 50 },
        });
        setBrands(response?.data?.data?.brands || []);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
        setError(err); // Notify the error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (error) {
    return <div>Error loading banners</div>; // Show an error message
  }

  return <BrandsSwiper brands={brands} />;
}

export default LayoutBrands;
