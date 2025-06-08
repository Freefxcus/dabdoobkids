// CollectionsGrid.js
import React from 'react';
import styles from '../styles/pages/Collection2.module.css';
import CollectionCard from './CollectionCard';

// Import your images (replace with actual paths or URLs)
// Using placeholder URLs for this example
const imageUrls = {
  winter: 'https://via.placeholder.com/400x500?text=Winter+Collection', // Replace with actual winter image
  sets: 'https://via.placeholder.com/600x400?text=Sets', // Replace with actual sets image
  summer: 'https://via.placeholder.com/400x500?text=Summer+Collection', // Replace with actual summer image
  eid: 'https://via.placeholder.com/600x400?text=Eid+Collection', // Replace with actual Eid image
  footwear: 'https://via.placeholder.com/600x400?text=Footwear', // Replace with actual footwear image
  bear: 'https://via.placeholder.com/300x300?text=Bear' // Replace with actual bear image (circular)
};


const CollectionPage = () => {

  // Dummy click handler - replace with actual navigation logic
  const handleCardClick = (collectionName) => {
    console.log(`Clicked on ${collectionName}`);
    // Example: Navigate to a route
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate(`/collections/${collectionName.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className={styles.gridContainer}>
      <CollectionCard
        title="Winter Collection"
        imageUrl={imageUrls.winter}
        gridAreaClass={styles.winter}
        onClick={() => handleCardClick('Winter Collection')}
      />
      <CollectionCard
        title="Sets"
        imageUrl={imageUrls.sets}
        gridAreaClass={styles.sets}
        onClick={() => handleCardClick('Sets')}
      />
      <CollectionCard
        title="Summer Collection"
        imageUrl={imageUrls.summer}
        gridAreaClass={styles.summer}
        onClick={() => handleCardClick('Summer Collection')}
      />
      <CollectionCard
        title="Eid Collection"
        imageUrl={imageUrls.eid}
        gridAreaClass={styles.eid}
        onClick={() => handleCardClick('Eid Collection')}
      />
      {/* The Bear item - no title, circular */}
      <CollectionCard
        imageUrl={imageUrls.bear}
        gridAreaClass={styles.bear}
        isCircular={true}
        onClick={() => handleCardClick('Bear')} // Maybe clicking the bear does something?
      />
       <CollectionCard
        title="Foot wear"
        imageUrl={imageUrls.footwear}
        gridAreaClass={styles.footwear}
        onClick={() => handleCardClick('Footwear')}
      />
    </div>
  );
};

export default CollectionPage;
