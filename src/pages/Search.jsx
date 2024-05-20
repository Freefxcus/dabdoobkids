import { useState, useEffect } from "react";
import styles from "../styles/pages/Search.module.css";
import ClothesCard from "../components/ClothesCard";
import Checkbox from "@mui/material/Checkbox";
import lense from "../images/lense.svg";
import filter from "../images/filter.png";
import Drawer from "@mui/material/Drawer";
import CountdownTimer from "../components/CountdownTimer";
import Pagination from "@mui/material/Pagination";
import Loader from "../components/Loader";
import { getProducts } from "../utils/apiCalls";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { userInfoActions, dataActions, wishlistActions } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCatId = searchParams.get("categoryId");
  const urlBrandId = searchParams.get("brandId");
  const urlQuery = searchParams.get("query");
  const [catId, setCatId] = useState(urlCatId ? urlCatId : "");
  const [brandId, setBrandId] = useState(urlBrandId ? urlBrandId : "");
  const [query, setQuery] = useState(urlQuery ? urlQuery : "");
  const debouncedHandleInputChange = debounce((value) => {
    setQuery(value);
  }, 1000); //
  const [searchData, setSearchData] = useState([]);
  console.log(searchData.products);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [state, setState] = useState(false);
  const [checked, setChecked] = useState(false);

  const data = useSelector((state) => state.data.value);
  const categories = data.categories;
  const brands = data.brands;

  useEffect(() => {
    getProducts(page, false, catId, brandId, query).then((res) => {
      setSearchData(res);
    });
  }, [page, catId, brandId, query]);
  return (
    <div
      // className={`${styles.container} margin-container section-top-margin section-bottom-margin`}
      className={`${styles.container} margin-container`}
    >
      <div className={styles.header}>find the best clothes</div>
      <div className={styles["countdown-container"]}>
        <div className={styles["countdown-title"]}>Daily sale</div>
        <CountdownTimer hours={5} minutes={30} seconds={20} type="a" />
      </div>
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
        <div className={styles.notification}>3</div>
      </div>
      <div className={styles.center}>
        <div className={styles.search_container}>
          <input
            value={query}
            className={styles.search_input}
            placeholder="Search product"
            onChange={(e) => {
              debouncedHandleInputChange(e.target.value);
            }}
          />
          <img src={lense} />
        </div>
      </div>
      <div className={styles.body_container}>
        <div className={styles.categories_section}>
          <div className={styles.category}>
            <div className={styles.category_title}>Categories</div>
            {categories?.array.map((category) => (
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  if (catId == category.id) {
                    setCatId("");
                  } else {
                    setCatId(category.id);
                  }
                }}
              >
                <Checkbox
                  // checked={checked}
                  checked={catId == category.id}
                  sx={{
                    // color: pink[800],
                    padding: 0,
                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                />
                <div className={styles.checkbox_label}>{category.name}</div>
              </div>
            ))}
          </div>
          <div className={styles.category}>
            <div className={styles.category_title}>Brands</div>
            {brands?.array.map((brand) => (
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  if (brandId == brand.id) {
                    setBrandId("");
                  } else {
                    setBrandId(brand.id);
                  }
                }}
              >
                <Checkbox
                  // checked={checked}
                  checked={brandId == brand.id}
                  sx={{
                    // color: pink[800],
                    padding: 0,
                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                />
                <div className={styles.checkbox_label}>{brand.name}</div>
              </div>
            ))}
          </div>
          <div
            className={styles.clear}
            onClick={() => {
              setCatId("");
              setBrandId("");
            }}
          >
            Clear All
          </div>
        </div>
        <div className={styles.cards_section}>
          <Pagination
            color="primary"
            variant="outlined"
            count={totalPages}
            page={page}
            onChange={(e, v) => {
              setPage(v);
              searchData([]);
            }}
            sx={{ mt: "10px", mb: "10px", width: "100%" }}
          />
          <>
            {isLoading && (
              <>
                {/* <Loader open={true} /> */}
                <Box sx={{ width: "100%" }}>
                  <LinearProgress />
                </Box>
                <div style={{ height: "500px" }} />
              </>
            )}

            {searchData?.products?.length > 0 &&
              !isLoading &&
              searchData.products.map((item) => <ClothesCard item={item} />)}
          </>
        </div>
      </div>
      {/* drawer */}
      <div>
        <Drawer
          anchor="right"
          open={state}
          onClose={() => {
            setState((prev) => !prev);
          }}
        >
          <div className={styles.categories_section_mobile}>
            <div className={styles.category}>
              <div className={styles.category_title}>Product Type</div>
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  setChecked((prev) => !prev);
                }}
              >
                <Checkbox
                  checked={checked}
                  sx={{
                    // color: pink[800],
                    padding: 0,
                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                />
                <div className={styles.checkbox_label}>Sweater</div>
              </div>
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  setChecked((prev) => !prev);
                }}
              >
                <Checkbox
                  checked={checked}
                  sx={{
                    // color: pink[800],
                    padding: 0,
                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                />
                <div className={styles.checkbox_label}>Sweater</div>
              </div>
            </div>
            <div className={styles.category}>
              <div className={styles.category_title}>Product Type</div>
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  setChecked((prev) => !prev);
                }}
              >
                <Checkbox
                  checked={checked}
                  sx={{
                    // color: pink[800],
                    padding: 0,

                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                />
                <div className={styles.checkbox_label}>Sweater</div>
              </div>
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  setChecked((prev) => !prev);
                }}
              >
                <Checkbox
                  checked={checked}
                  sx={{
                    // color: pink[800],
                    padding: 0,

                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                />
                <div className={styles.checkbox_label}>Sweater</div>
              </div>
            </div>
            <div className={styles.clear}>Clear All</div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
