import React, { useState } from "react";
// import Filter_Sort from "./Filter_Sort";
import styles from "../../styles/components/LayoutFilterSort.module.css";
import FilterIcon from "../../images/filter.png";
import SearchIcon from "../../images/lense.svg";
import { Drawer } from "@mui/material";
import useCreateQueryString from "../../hooks/useCreateQueryString";
import FilterSort from "./FilterSort";

function LayoutFilterSort({ filterList = [], sortFields, sizeFields }) {
  const [openFilter, setOpenFilter] = useState(false);
  const { createQueryString, clearQuery } = useCreateQueryString();
  const isFilterList = !!filterList.length;

  const handleCloseFilter = () => setOpenFilter(false);
  const handleOpenFilter = () => setOpenFilter(true);

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.filterButtonContainer}>
          <button className={styles.filterButton} onClick={handleOpenFilter}>
            <img src={FilterIcon} alt="Filter Icon" width={24} height={24} />
            <span className={styles.filterText}>Filter & Sort</span>
          </button>

          {isFilterList && (
            <button className={styles.clearButton} onClick={clearQuery}>
              Clear all
            </button>
          )}
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Product"
            className={styles.searchInput}
            onChange={(e) => createQueryString("query", e.target.value)}
          />
          <img src={SearchIcon} alt="Search icon" width={24} height={24} />
        </div>
      </div>

      <Drawer open={openFilter} onClose={handleCloseFilter} anchor="right">
        <FilterSort
          closeFilter={handleCloseFilter}
          sortFields={sortFields || []}
          sizeFields={sizeFields || []}
        />
      </Drawer>
    </section>
  );
}

export default LayoutFilterSort;
