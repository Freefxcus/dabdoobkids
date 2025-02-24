import { useState, useEffect, useCallback } from "react";
import styles from "../styles/pages/Search.module.css";
import ClothesCard from "../components/ClothesCard";
import Checkbox from "@mui/material/Checkbox";
import lense from "../images/lense.svg";
import filter from "../images/filter.png";
import Drawer from "@mui/material/Drawer";
import CountdownTimer from "../components/CountdownTimer";
import Pagination from "@mui/material/Pagination";
import Loader from "../components/Loader";
import { getBrands, getCategories, getProducts } from "../utils/apiCalls";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { debounce } from "lodash";
import { useLocation, useSearchParams } from "react-router-dom";
import Empty from "./empty";
import CloseIcon from "@mui/icons-material/Close";

export default function Search() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCatId = searchParams.get("categoryId")?.split(",") || [];
  const urlBrandId = searchParams.get("brandId")?.split(",") || [];
  const urlQuery = searchParams.get("query") || "";
  const urlSale = searchParams.get("sale") || "";
  const endDate = searchParams.get("endDate") || "";
  const [catId, setCatId] = useState(urlCatId.map((i) => +i));
  const [brandId, setBrandId] = useState(urlBrandId.map((i) => +i));
  const [queryStr, setQuery] = useState(urlQuery);
  const [searchData, setSearchData] = useState([]);
  const [filterCount, setFilterCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(+searchParams.get("page") || 1);
  const [state, setState] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const calculateTimeLeft = (saleEndTime) => {
    const end = new Date(saleEndTime).getTime();
    const now = new Date().getTime();
    const difference = end - now;
    if (difference > 0) {
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    } else {
      // Sale has ended
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page]);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res?.categories);
    });
    getBrands().then((res) => {
      setBrands(res?.brands);
    });
    // loadProducts(page); // Load products based on the current page state
  }, [page]);

  useEffect(() => {
    setCatId([...urlCatId].map((i) => +i));
    setBrandId([...urlBrandId].map((i) => +i));
    endDate && calculateTimeLeft(endDate);
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    const categoryStr = catId.length ? catId.join(",") : "";
    const brandStr = brandId.length ? brandId.join(",") : "";

    const queryParams = {
      page: page.toString(),
      category: categoryStr,
      brand: brandStr,
      query: queryStr || "",
      sale: urlSale || "",
    };

    getProducts(
      page,
      false,
      categoryStr,
      brandStr,
      queryParams.query,
      queryParams.sale
    )
      .then((res) => {
        setSearchData(res);
        setTotalPages(res?.metadata?.totalPages || 1);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleCategoryChange = (categoryId) => {
    const newCatId = catId.includes(categoryId)
      ? catId.filter((id) => id != categoryId)
      : [...catId, categoryId];
    let uniqueNewCatId = [...new Set(newCatId)];
    setCatId(uniqueNewCatId);
    setSearchParams((prev) => {
      prev.set("categoryId", uniqueNewCatId.join(","));
      prev.delete("page");
      return prev;
    });
  };

  const handleBrandChange = (id) => {
    const newBrandId = brandId.includes(id)
      ? brandId.filter((brand) => brand !== id)
      : [...brandId, id];
    let uniqueNewBrandId = [...new Set(newBrandId.map((i) => +i))];
    setBrandId(uniqueNewBrandId);
    setSearchParams((prev) => {
      prev.set("brandId", uniqueNewBrandId.join(","));
      prev.delete("page");
      return prev;
    });
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setSearchParams((prev) => {
      prev.set("query", event.target.value);
      prev.delete("page");
      return prev;
    });
    debouncedHandleInputChange();
  };

  const debouncedHandleInputChange = useCallback(
    debounce(() => {
      loadProducts(page);
    }, 300),
    [catId, brandId, queryStr, page]
  );

  const handlePageChange = (event, value) => {
    setPage(value); // Call the product loading function with the new page
  };

  useEffect(() => {
    console.log(page, "currentPage");

    loadProducts();
  }, [catId, brandId, queryStr, page]);
  return (
    <div
      className={`${styles.container} margin-container`}
      style={{ paddingBottom: "50px" }}
    >
      <div className={styles.header}>find the best clothes</div>
      {urlSale ? (
        <div className={styles["countdown-container"]}>
          <div className={styles["countdown-title"]}>Daily sale</div>
          <CountdownTimer
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
            type="a"
          />
        </div>
      ) : null}
      <div className={styles.options}>
        <img
          style={{ cursor: "pointer" }}
          src={filter}
          width="25px"
          onClick={() => {
            setState((prev) => !prev);
          }}
        />
        <div className={styles.options_title}>Title</div>
        <div className={styles.notification}>{filterCount}</div>
      </div>

      <div className={styles.body_container}>
        <div className={styles.categories_section}>
          <div className={styles.category}>
            <div className={styles.category_title}>Categories</div>
            {categories?.map((category) => (
              <div
                className={styles.checkbox_container}
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                <Checkbox
                  checked={catId.some((id) => +id == category.id)}
                  sx={{
                    padding: 0,
                    "&.Mui-checked": { color: "var(--brown)" },
                  }}
                />
                <div className={styles.checkbox_label}>{category.name}</div>
              </div>
            ))}
          </div>
          <div className={styles.category}>
            {brands?.length ? (
              <>
                <div className={styles.category_title}>Brands</div>
                {brands.map((brand) => (
                  <div
                    className={styles.checkbox_container}
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.id)}
                  >
                    <Checkbox
                      checked={brandId.some((id) => +id == brand.id)}
                      sx={{
                        padding: 0,
                        "&.Mui-checked": { color: "var(--brown)" },
                      }}
                    />
                    <div className={styles.checkbox_label}>{brand.name}</div>
                  </div>
                ))}
              </>
            ) : null}
          </div>

          <div
            className={styles.clear}
            onClick={() => {
              setCatId([]);
              setBrandId([]);
            }}
          >
            Clear All
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <div className={styles.center}>
            <div className={styles.search_container}>
              <input
                defaultValue={queryStr}
                className={styles.search_input}
                placeholder="Search product"
                onChange={handleSearch}
              />
              <img src={lense} />
            </div>
          </div>
          <div className={styles.cards_section}>
            {!searchData?.products?.length && !isLoading && (
              <Box sx={{ mx: "auto" }}>
                <Empty
                  title="No Result Found"
                  message="The item you are looking for is not in our store."
                />
              </Box>
            )}

            <>
              {isLoading && (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LinearProgress />
                  </Box>
                  <div style={{ height: "500px" }} />
                </>
              )}
              <Box
                sx={{
                  display: { xs: "grid" },
                  gridTemplateColumns: {
                    xs: "repeat(2,1fr)",
                    sm: "repeat(3,1fr)",
                    md: "repeat(3,1fr)",
                    xl: "repeat(4,1fr)",
                  },
                  gap: { lg: "20px", md: "10px", xs: "10px" },
                }}
                className={styles.cards_section}
              >
                {searchData?.products?.length > 0 &&
                  !isLoading &&
                  searchData?.products?.map((item) => (
                    <ClothesCard key={item.id} item={item} />
                  ))}
              </Box>
            </>
          </div>
          <Box sx={{ width: "100%", mx: "auto", marginTop: "24px" }}>
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
                ".Mui-selected": {
                  color: "var(--brown)", // Brown color for selected page
                  border: "1px solid rgba(173, 107, 70, 0.5)", // Brownish border
                  backgroundColor: "rgba(173, 107, 70, 0.12)", // Light brownish background
                },
                ".MuiPaginationItem-root": {
                  color: "var(--brown)", // Brown color for non-selected pagination items
                  "&:hover": {
                    backgroundColor: "rgba(173, 107, 70, 0.12)", // Hover background color
                  },
                },
              }}
              variant="outlined"
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </div>

      {/* drawer */}

      <Drawer
        anchor="right"
        open={state}
        onClose={() => {
          setState((prev) => !prev);
        }}
      >
        <CloseIcon
          onClick={() => {
            setState((prev) => !prev);
          }}
        />
        <div className={styles.categories_section_mobile}>
          <div className={styles.category}>
            <div className={styles.category_title}>Categories</div>
            {categories?.map((category) => (
              <div
                className={styles.checkbox_container}
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                <Checkbox
                  checked={catId.some((id) => +id == category.id)}
                  sx={{
                    padding: 0,
                    "&.Mui-checked": { color: "var(--brown)" },
                  }}
                />
                <div className={styles.checkbox_label}>{category.name}</div>
              </div>
            ))}
          </div>
          <div className={styles.category}>
            {brands?.length ? (
              <>
                <div className={styles.category_title}>Brands</div>
                {brands?.map((brand) => (
                  <div
                    className={styles.checkbox_container}
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.id)}
                  >
                    <Checkbox
                      checked={brandId.some((id) => +id == brand.id)}
                      sx={{
                        padding: 0,
                        "&.Mui-checked": { color: "var(--brown)" },
                      }}
                    />
                    <div className={styles.checkbox_label}>{brand.name}</div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div
            className={styles.clear}
            onClick={() => {
              setCatId([]);
              setBrandId([]);
            }}
          >
            Clear All
          </div>
        </div>
      </Drawer>
    </div>
  );
}
