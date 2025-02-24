import React, { useEffect, useMemo, useState } from "react";

import Loader from "../LoaderSpinner";
import { getSizes } from "../../utils/apiCalls";

import styles from "../../styles/components/ModalSize.module.css";

function ModalSize({ close, brand }) {
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getSizes();
        setSizes(data.data);
      } catch (error) {
        setSizes([]);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const currentCategories = useMemo(() => {
    return sizes.filter((item) =>
      item.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }, [sizes, brand]);

  const currentData = currentCategories.filter(
    (item) => item.category === selectCategory
  );

  useEffect(() => {
    setSelectCategory(currentCategories?.[0]?.category?.toLowerCase?.() || "");
  }, [currentCategories]);

  console.log(selectCategory);

  if (isLoading)
    return (
      <div className={`${styles.loaderContainer}`}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );

  if (!sizes.length) return <p>No Sizes now</p>;

  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={close}>
          ✖
        </button>
        <div className={styles.content}>
          <h5 className={styles.title}>Size Guide</h5>
          <div className={styles.categoryList}>
            {currentCategories.map((item) => (
              <React.Fragment key={item._id}>
                <button
                  className={`${styles.categoryButton} ${
                    item.category === selectCategory &&
                    styles.categoryButtonActive
                  }`}
                  onClick={() => setSelectCategory(item.category)}
                >
                  {item.category}
                </button>
                <div className={styles.divider}></div>
              </React.Fragment>
            ))}
          </div>

          {selectCategory &&
            currentData.map((item) => (
              <img
                src={item.image}
                alt="Size guide"
                key={item.image}
                className={styles.image}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default ModalSize;
