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
import { userInfoActions, dataActions, wishlistActions } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { debounce, set } from "lodash";
import { useLocation, useSearchParams } from "react-router-dom";
import Empty from "./empty";
import CloseIcon from "@mui/icons-material/Close";

export default function Search() {
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const location = useLocation();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(location.search)
  );
  // const [searchParams, setSearchParams] = useSearchParams();
  const urlCatId = searchParams.get("categoryId");
  const urlBrandId = searchParams.get("brandId");
  const urlQuery = searchParams.get("query");
  const [catId, setCatId] = useState(urlCatId ? urlCatId : "");
  const [brandId, setBrandId] = useState(urlBrandId ? urlBrandId : "");
  const [queryStr, setQuery] = useState(urlQuery ? urlQuery : "");
  const [searchData, setSearchData] = useState([]);
  const [filterCount, setFilterCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(searchParams.get("page"));
  const [state, setState] = useState(false);
  const [checked, setChecked] = useState(false);

  const data = useSelector((state) => state.data.value);
  // const categories = data.categories;

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res?.categories);
    });
    getBrands().then((res) => {
      setBrands(res?.brands);
    });
    setIsLoading(true);
    const pageNumber = searchParams.get("page") || 1;
    getProducts(pageNumber, false, catId, brandId, queryStr).then((res) => {
      console.log("res",res);
      
      setSearchData(res);
      setIsLoading(false);
      return ;
    });
    
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const pageNumber = searchParams.get("page") || 1;
    getProducts(pageNumber, false, catId, brandId, queryStr).then((res) => {
      setSearchData(res);
      setIsLoading(false);
    });
    let count=((catId ? 1 : 0) +
    (brandId ? 1 : 0) +
    (queryStr ? 1 : 0))
  
    setFilterCount(count || 0)
  }, [catId, brandId, queryStr]);

  console.log(searchParams.get("page"), "searchParams123saddsd123123");
  const debouncedHandleInputChange = debounce((searchparams) => {
    setIsLoading(true);
    const searchPage = searchparams.get("page") || 1;
    const searchCatId = searchparams.get("categoryId") || "";
    const searchBrandId = searchparams.get("brandId") || "";
    const searchQuery = searchparams.get("query") || "";
    getProducts(
      searchPage,
      false,
      searchCatId,
      searchBrandId,
      searchQuery
    ).then((res) => {
      setSearchData(res);
      setIsLoading(false);
    });
  }, 1000);

  const handleSearch = (e) => {
    setSearchParams((prev) => {
      if (e.target.value === "") {
        prev.delete("query");
        return prev;
      }
      prev.set("query", e.target.value);
      return prev;
    });
    debouncedHandleInputChange(searchParams);
  };

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
        <div className={styles.notification}>
          {filterCount}
        </div>
      </div>

      <div className={styles.body_container}>
        <div className={styles.categories_section}>
          <div className={styles.category}>
            <div className={styles.category_title}>Categories</div>
            {categories?.map((category) => (
              <div
                className={styles.checkbox_container}
                onClick={() => {
                  if (catId === category.id) {
                    setCatId("");
                    setSearchParams((prev) => {
                      prev.delete("categoryId");
                      return prev;
                    });
                    debouncedHandleInputChange(searchParams);
                  } else {
                    setSearchParams((prev) => {
                      prev.set("categoryId", category.id);
                      prev.delete("page");
                      return prev;
                    });
                    setCatId(category.id);
                    debouncedHandleInputChange(searchParams);
                  }
                }}
              >
                <Checkbox
                  // checked={checked}
                  checked={catId === category.id}
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
            {brands?.length ? (
              <>
                <div className={styles.category_title}>Brands</div>
                {brands?.map((brand) => (
                  <div
                    className={styles.checkbox_container}
                    onClick={() => {
                      if (brandId === brand.id) {
                        setBrandId("");
                        setSearchParams((prev) => {
                          prev.delete("brandId");
                          return prev;
                        });
                        debouncedHandleInputChange(searchParams);
                      } else {
                        setBrandId(brand.id);
                        setSearchParams((prev) => {
                          prev.set("brandId", brand.id);
                          prev.delete("page");
                          return prev;
                        });

                        debouncedHandleInputChange(searchParams);
                      }
                    }}
                  >
                    <Checkbox
                      // checked={checked}
                      checked={brandId === brand.id}
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
              </>
            ) : null}
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
                  {/* <Loader open={true} /> */}
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

              {searchData?.products?.length > 0 &&
                !isLoading &&
                searchData.products.map((item) => <ClothesCard item={item} />)}
            </>
          </div>
          <Box sx={{ width: "100%", mx: "auto", marginTop: "24px" }}>
            <Pagination
              sx={{
                display: "flex",
                justifyContent: "center",
                ".Mui-selected": {
                  color: "var(--brown)",
                  border: "1px solid rgba(173, 107, 70, 0.5)",
                  backgroundColor: "rgba(173, 107, 70, 0.12)",
                },
              }}
              color="primary"
              variant="outlined"
              count={searchData?.metadata?.totalPages || 1}
              page={+searchParams.get("page") || 1}
              onChange={(e, v) => {
                setSearchParams((prev) => {
                  prev.set("page", v);
                  return prev;
                });
                // searchData([]);
                debouncedHandleInputChange(searchParams);
              }}
            />
          </Box>
        </Box>
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
          {" "}
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
                  onClick={() => {
                    if (catId === category.id) {
                      setCatId("");
                      setSearchParams((prev) => {
                        prev.delete("categoryId");
                        return prev;
                      });
                      debouncedHandleInputChange(searchParams);
                    } else {
                      setSearchParams((prev) => {
                        prev.set("categoryId", category.id);
                        prev.delete("page");
                        return prev;
                      });
                      setCatId(category.id);
                      debouncedHandleInputChange(searchParams);
                    }
                  }}
                >
                  <Checkbox
                    // checked={checked}
                    checked={catId === category.id}
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
              {brands?.length ? (
                <>
                  <div className={styles.category_title}>Brands</div>
                  {brands?.map((brand) => (
                    <div
                      className={styles.checkbox_container}
                      onClick={() => {
                        if (brandId === brand.id) {
                          setBrandId("");
                          setSearchParams((prev) => {
                            prev.delete("brandId");
                            return prev;
                          });
                          debouncedHandleInputChange(searchParams);
                        } else {
                          setBrandId(brand.id);
                          setSearchParams((prev) => {
                            prev.set("brandId", brand.id);
                            prev.delete("page");
                            return prev;
                          });

                          debouncedHandleInputChange(searchParams);
                        }
                      }}
                    >
                      <Checkbox
                        // checked={checked}
                        checked={brandId === brand.id}
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
                </>
              ) : null}
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
        </Drawer>
      </div>
    </div>
  );
}
