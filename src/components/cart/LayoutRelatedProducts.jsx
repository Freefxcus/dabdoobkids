import { useEffect, useState } from "react";
import { getProducts } from "../../utils/apiCalls";
import SwiperComponent from "../Swiper";
import LoaderSpinner from "../LoaderSpinner";

function LayoutRelatedProducts({ categoryId, productId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts(1, 10, categoryId).then((res) => {
      setRelatedProducts(res);
      setIsLoading(false);
    });
  }, [categoryId]);

  if (isLoading) return <LoaderSpinner />;

  console.log("relatedProducts", relatedProducts?.products);

  const currentDate = relatedProducts?.products?.filter(
    (item) => item.id !== productId
  );

  return <SwiperComponent items={{ products: currentDate }} />;
}

export default LayoutRelatedProducts;
