import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { useSearchParams } from "next/navigation";
import styles from "../../styles/components/FilterSort.module.css";
import { useSearchParams } from "react-router-dom";
import useCreateQueryString from "../../hooks/useCreateQueryString";
import { getBrands, getCategories } from "../../utils/apiCalls";

function FilterSort({ closeFilter, sortFields, sizeFields }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { createQueryString, clearQuery, removeQuery, selectMoreFilters } =
    useCreateQueryString();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getCategories().then((res) => setCategories(res?.categories));
    getBrands().then((res) => setBrands(res?.brands));
  }, []);

  const handleIsKeyValueQuery = (key, id) => {
    const keyFilter = searchParams.get(key) || "";
    const isFind = keyFilter.split(",").find((value) => value === String(id));

    return !!isFind;
  };

  const sortFieldValue = searchParams.get("sort");
  const SizeFieldValue = searchParams.get("sizes");
  const pricesFieldValue = searchParams.get("prices");

  const [price, setPrice] = useState(
    pricesFieldValue
      ?.split("&")
      ?.map((el) => el.slice(el.indexOf("=") + 1)) || [0, 0]
  );

  // Remove Scrollbar from body
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    return () => (document.querySelector("body").style.overflow = "auto");
  }, []);

  const handleChange = (e, value) => {
    createQueryString("prices", `minPrice=${value[0]}&maxPrice=${value[1]}`);
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4>Filter & Sort</h4>
          <p className={styles.clearButtonText}>
            1 Filter -{" "}
            <button className={styles.clearButton} onClick={clearQuery}>
              Clear all
            </button>
          </p>
        </div>

        {/* Sort */}
        <div className={styles.filterSection}>
          <h5 className={styles.sortHeading}>Sort by</h5>
          <div className={styles.filterButtons}>
            {sortFields.map((field, index) => (
              <button
                key={field.id}
                className={`${styles.filterButton} ${
                  !sortFieldValue && index === 0
                    ? styles.activeButton
                    : field.value === sortFieldValue
                    ? styles.activeButton
                    : styles.inactiveButton
                }`}
                onClick={() => {
                  field.value === "default"
                    ? removeQuery(field.key)
                    : createQueryString(field.key, field.value);
                }}
              >
                {field.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          {/* Category */}
          <div className={styles.accordionContainer}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h5 className={styles.headingSection}>Category</h5>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filterButtons}>
                  {categories?.map((item) =>
                    item?.productsCount > 0 ? (
                      <button
                        key={item.id}
                        className={`${styles.filterButton} ${
                          handleIsKeyValueQuery("category", item.id) &&
                          styles.activeButton
                          // : styles.inactiveFilter
                        }`}
                        onClick={() =>
                          selectMoreFilters("category", String(item.id), 1)
                        }
                      >
                        {item.name}
                      </button>
                    ) : null
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Size */}
          <div className={styles.accordionContainer}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h5 className={styles.headingSection}>Size</h5>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filterButtons}>
                  {sizeFields.map((field) => (
                    <button
                      key={field.id}
                      className={`${styles.filterButton} ${
                        field.value === SizeFieldValue
                          ? styles.activeButton
                          : styles.inactiveFilter
                      }`}
                      onClick={() => {
                        selectMoreFilters(field.key, field.value, 1);
                      }}
                    >
                      {field.name}
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Brand */}
          <div className={styles.accordionContainer}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h5 className={styles.headingSection}>Brand</h5>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.filterButtons}>
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      className={`${styles.filterButton} ${
                        handleIsKeyValueQuery("brand", brand.id)
                          ? styles.activeButton
                          : styles.inactiveFilter
                      }`}
                      onClick={() => selectMoreFilters("brand", brand.id, 1)}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/* Price */}
          <div className={styles.accordionContainer}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h5 className={styles.headingSection}>Price</h5>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.sliderContainer}>
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={price}
                    onChange={(e, value) => setPrice(value)}
                    onChangeCommitted={handleChange}
                    valueLabelDisplay="on"
                    min={0}
                    max={9999}
                    sx={{
                      "& .MuiSlider-track": {
                        backgroundColor: "#ad6b46",
                        borderColor: "#ad6b46",
                      },
                      "& .MuiSlider-thumb": {
                        color: "#ad6b46",
                        "&:hover, &.Mui-active": {
                          boxShadow: "0px 0px 10px 2px #ad6b46",
                        },
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgb(209 213 219)", // rail color
                      },
                    }}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <button onClick={closeFilter} className={styles.buttonDone}>
          Done
        </button>
      </div>
    </section>
  );
}

export default FilterSort;
