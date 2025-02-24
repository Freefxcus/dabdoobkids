import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../../styles/components/BrandsSwiper.module.css";
import { Link } from "react-router-dom";

const BrandsSwiper = ({ brands }) => {
  const [limit, setLimit] = useState(
    () => Math.ceil(window.innerWidth / 300) || 1
  );

  // Update the limit on window resize
  useEffect(() => {
    const handleResize = () => {
      setLimit(Math.ceil(window.innerWidth / 300));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const repeatCount = Math.ceil(limit / (brands?.length || 1));

  // Create a new array with the repeated brands
  const newBrands = [...Array((repeatCount || 1) + 3)].flatMap(() => brands);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section className={`${styles.embla} embla`} ref={emblaRef}>
      <div className={`${styles.emblaContainer} embla__container`}>
        {brands?.length
          ? newBrands.map(({ images, name, id }) => (
              <div className={`${styles.emblaSlide} embla__slide`} key={id}>
                <Link to={`/search/?brand=${id}`} className={styles.imageLink}>
                  <img
                    src={images[0]}
                    alt={name}
                    width={150}
                    height={150}
                    className={styles.brandImage}
                  />
                </Link>
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

BrandsSwiper.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BrandsSwiper;
