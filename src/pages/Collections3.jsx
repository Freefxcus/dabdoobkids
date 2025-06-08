import React from 'react';
import { useNavigate } from 'react-router-dom'; // Keep if used elsewhere
import styles from '../styles/pages/Collections3.module.css';

// Placeholder images - replace with your actual image paths
// Keep these, but the CSS will control how they fill their containers
import LOGO_URL from '../images/collections/dabdoob.png';
import WINTER_IMG_URL  from '../images/collections/winter.png';
import SETS_IMG_URL from '../images/collections/sets.png';
import SUMMER_IMG_URL  from '../images/collections/summer.png';
import EID_IMG_URL from '../images/collections/eid.png';
import FOOTWEAR_IMG_URL from '../images/collections/foot-wear.png';


// Reusable Card Component (Keep this as is)
const Card = ({
    imgSrc,
    title,
    subTitle,
    cardCustomClass = "",
    textContainerCustomClass = "",
    titleCustomClass = "",
    subTitleCustomClass = "",
    altText
  }) => {
    return (
      <div className={`${styles.card} ${cardCustomClass}`}>
        {/* Image fills the card div */}
        <img
          src={imgSrc}
          alt={altText || title || "Card image"}
          className={styles.cardImage}
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+Not+Found"; }}
        />
        {/* Text container is absolutely positioned within the card */}
        <div className={`${styles.cardTextContainer} ${textContainerCustomClass}`}>
          {title && <h3 className={`${styles.cardTitle} ${titleCustomClass}`}>{title}</h3>}
          {subTitle && <p className={`${styles.cardSubTitle} ${subTitleCustomClass}`}>{subTitle}</p>}
        </div>
      </div>
    );
  };

  // Main Layout Component
  const CollectionPage = () => {
    // Reorganize card data to match areas, keeping structure simple
    const cardData = {
        winter: {
            id: 'winter',
            imgSrc: WINTER_IMG_URL,
            title: 'winter',
            subTitle: 'Collection',
            textContainerCustomClass: styles.textContainerWinterSummer,
            titleCustomClass: styles.titleWinterSummerEidFootwear,
            subTitleCustomClass: styles.subTitleWinterSummerEid,
          },
          sets: {
            id: 'sets',
            imgSrc: SETS_IMG_URL, // Use the bear image for the central circle
            title: 'Sets', // This text appears *below* the central bear
             textContainerCustomClass: styles.textContainerSets,
             titleCustomClass: styles.titleSets,
          },
          summer: {
            id: 'summer',
            imgSrc: SUMMER_IMG_URL,
            title: 'Summer',
            subTitle: 'Collection',
            textContainerCustomClass: styles.textContainerWinterSummer,
            titleCustomClass: styles.titleWinterSummerEidFootwear,
            subTitleCustomClass: styles.subTitleWinterSummerEid,
          },
          eid: {
            id: 'eid',
            imgSrc: EID_IMG_URL,
            title: 'Eid',
            subTitle: 'Collection',
            textContainerCustomClass: styles.textContainerEid,
            titleCustomClass: styles.titleWinterSummerEidFootwear,
            subTitleCustomClass: styles.subTitleWinterSummerEid,
          },
          footwear: {
            id: 'footwear',
            imgSrc: FOOTWEAR_IMG_URL,
            title: 'Foot wear',
            textContainerCustomClass: styles.textContainerFootwear,
            titleCustomClass: `${styles.titleWinterSummerEidFootwear} ${styles.titleFootwear}`,
          },
          // Assuming winter is part of the top-left area with Sets text
          // If winter needs separate text/styling, it might need its own layoutArea div
    };

    return (
      <div className={styles.pageContainer}>
        {/* Layout Areas - Positioned Absolutely */}

        {/* Top Left Area (Contains Winter/Sets Image, "Sets" text) */}
        <div className={styles.layoutArea + ' ' + styles.areaTopLeft}>
           {/* Place the image content for this area */}
           {/* You might combine images or use a single one that spans the area */}
           {/* For now, let's place the Winter card content here, and the Sets text will be separate */}
           {/* Note: This is an approximation. The Sets *text* is positioned over the top-left area image in Figma, while the Sets *image* (bear) is in the central circle. This requires careful placement. */}
           <Card {...cardData.winter} textContainerCustomClass={styles.textContainerWinterSummer} />
            {/* Place the Sets text here manually as it overlays the Winter image area */}
           <div className={`${styles.cardTextContainer} ${styles.textContainerSets}`}>
               <h3 className={`${styles.cardTitle} ${styles.titleSets}`}>{cardData.sets.title}</h3>
           </div>
        </div>

        {/* Top Right Area (Contains Summer) */}
        <div className={styles.layoutArea + ' ' + styles.areaTopRight}>
          <Card {...cardData.summer} />
        </div>

        {/* Bottom Left Area (Contains Eid) */}
        <div className={styles.layoutArea + ' ' + styles.areaBottomLeft}>
          <Card {...cardData.eid} />
        </div>

        {/* Bottom Right Area (Contains Footwear) */}
        <div className={styles.layoutArea + ' ' + styles.areaBottomRight}>
          <Card {...cardData.footwear} />
        </div>

         {/* Central Area (Contains Sets Image - the bear) */}
         {/* The logo is separate and floats above this circle */}
        <div className={styles.layoutArea + ' ' + styles.areaCentralCircle}>
             {/* Place the bear image here. The "Sets" text is overlaid on the top-left area. */}
             <img
                src={cardData.sets.imgSrc}
                alt={cardData.sets.altText || cardData.sets.title || "Central image"}
                className={styles.cardImage} 
                
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/CCCCCC/FFFFFF?text=Bear+Image+Error"; }}
              />
               {/* No text container inside the central circle based on Figma, only the image */}
        </div>


        {/* Central Logo (Floats on top) */}
        {/* Keep the logo positioning as is, as it works for floating */}
        <div className={styles.logoOuterContainer}>
          <div className={styles.logoInnerContainer}>
            <img
              src={LOGO_URL}
              alt="Company Logo"
              className={styles.logoImage}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/CCCCCC/FFFFFF?text=Logo+Error"; }}
            />
          </div>
        </div>

      </div>
    );
  };

  export default CollectionPage;