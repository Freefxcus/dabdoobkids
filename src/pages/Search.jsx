// import FilterList from "@/app/_components/search/FilterList";

import styles from "../styles/pages/Search.module.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClothesCard from "../components/ClothesCard";
import CountdownTimer from "../components/CountdownTimer";
import LoaderSpinner from "../components/LoaderSpinner";
import LayoutFilterSort from "../components/search/LayoutFilterSort";
import LayoutPagination from "../components/search/LayoutPagination";
import { getProducts } from "../utils/apiCalls";

export const revalidate = 3600;

const sortFields = [
  { key: "sort", value: "default", name: "Default", id: 0 },
  { key: "sort", value: "price_desc", name: "Price High To Low", id: 1 },
  { key: "sort", value: "price_asc", name: "Price Low To High", id: 2 },
  { key: "sort", value: "newest", name: "New Arrivals", id: 3 },
  { key: "sort", value: "category_group", name: "Most Relevant", id: 4 },
];

const sizeFields = [
  { key: "sizes", value: "Up to 3Mths", name: "Up to 3Mths", id: 0 },
  { key: "sizes", value: "3-6 Mths", name: "3-6 Mths", id: 1 },
  { key: "sizes", value: "9-12 Mths", name: "9-12 Mths", id: 2 },
  { key: "sizes", value: "12-18 Mths", name: "12-18 Mths", id: 3 },
  { key: "sizes", value: "1.5-2 Yrs", name: "1.5-2 Yrs", id: 4 },
  { key: "sizes", value: "2-3 Yrs", name: "2-3 Yrs", id: 5 },
  { key: "sizes", value: "3-4 Yrs", name: "3-4 Yrs", id: 6 },
  { key: "sizes", value: "4-5 Yrs", name: "4-5 Yrs", id: 7 },
  { key: "sizes", value: "5-6 Yrs", name: "5-6 Yrs", id: 8 },
  { key: "sizes", value: "6-7 Yrs", name: "6-7 Yrs", id: 9 },
  { key: "sizes", value: "7-8 Yrs", name: "7-8 Yrs", id: 10 },
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    metadata: { totalPages = 1 } = {},
    products = [],
    sale: { end: flashSaleEnd = "", percentage } = {},
  } = searchData || {};

  const page = +searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "";
  const sale = !!searchParams.get("sale") || false;

  const params = {};

  const getQueries = searchParams.forEach(
    (value, key) => (params[key] = value)
  );

  // Filter Products
  useEffect(() => {
    setIsLoading(true);
    getProducts(
      page,
      20,
      params.category || "",
      params.subcategory || "",
      params.brand || "",
      params.query || "",
      sale
    )
      .then((res) => setSearchData(res))
      .finally(() => setIsLoading(false));
  }, [
    page,
    params.category,
    params.brand,
    params.query,
    sale,
    params.subcategory,
  ]);

  // Scroll To Top If Brand In SearchParams
  useEffect(() => {
    if (params.brand)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  }, [params.brand]);

  const pricesRange =
    searchParams
      .get("prices")
      ?.split("&")
      ?.map((el) => el.slice(el.indexOf("=") + 1)) || "";

  // const getFilterList = Object.entries(searchParams)
  //   .flatMap(([key, value]) => {
  //     const queries = [];

  //     if (key === "categories")
  //       for (const element of categories) {
  //         if (value.includes(",")) {
  //           value.split(",").forEach((category) => {
  //             if (category.includes(element._id))
  //               queries.push({ query: key, id: category, value: element.name });
  //           });
  //         } else if (element._id === value)
  //           queries.push({ query: key, id: value, value: element.name });
  //       }

  //     if (key === "brands")
  //       for (const element of brands) {
  //         if (value.includes(",")) {
  //           value.split(",").forEach((brand) => {
  //             if (brand.includes(element._id))
  //               queries.push({ query: key, id: brand, value: element.name });
  //           });
  //         } else if (element._id === value)
  //           queries.push({ query: key, id: value, value: element.name });
  //       }

  //     if (key === "sort") {
  //       for (const element of sortFields)
  //         if (element.value === value)
  //           queries.push({ query: key, id: element.id, value: element.name });
  //     }

  //     return queries;
  //   })
  //   .filter(Boolean);

  // Sorting products based on the selected sort option
  let currentProducts = structuredClone(products);

  if (pricesRange.length) {
    currentProducts = currentProducts.filter(
      (item) => +item.price >= +pricesRange[0] && +item.price <= +pricesRange[1]
    );
  }

  if (sort) {
    if (sort === "price_desc") {
      currentProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "price_asc") {
      currentProducts.sort((a, b) => a.price - b.price);
    }
    // else if (sort === "newest") {
    //   currentProducts.sort(
    //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    //   );
    // }
  }

  return (
    <section className={styles.section}>
      <h1>Find The Best Clothes</h1>

      <div className={styles.layoutFilterSort}>
        <LayoutFilterSort
          // filterList={getFilterList}
          sortFields={sortFields}
          sizeFields={sizeFields}
        />

        {/* <FilterList list={getFilterList} /> */}

        {isLoading ? (
          <LoaderSpinner />
        ) : (
          <>
            {flashSaleEnd && (
              <div className={styles.flashSale}>
                <CountdownTimer targetDate={flashSaleEnd} />
                {/* <Star type="b" value={20} /> */}
              </div>
            )}

            <div className={styles.productsContainer}>
              {currentProducts?.map((item) => (
                <div key={item.id}>
                  <ClothesCard item={item} />
                </div>
              ))}
            </div>

            <LayoutPagination totalPages={totalPages} page={page} />
          </>
        )}
      </div>
    </section>
  );
}

export default Search;
