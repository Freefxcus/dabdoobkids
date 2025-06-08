// CollectionCard.js
import React from 'react';
import styles from '../styles/pages/Collection2.module.css';

// Helper component for each collection item or the bear
const CollectionCard = ({ title, imageUrl, gridAreaClass, isCircular = false, onClick }) => {
  return (
    <div
      className={`${styles.item} ${gridAreaClass} ${isCircular ? styles.bear : ''}`}
      onClick={onClick}
      role="button" // Indicate it's interactive
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => { // Handle keyboard interaction
          if (e.key === 'Enter' || e.key === ' ') {
              onClick();
          }
      }}
    >
      <img src={imageUrl} alt={title || "Collection item"} />
      {title && (
        <div className={styles.overlay}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
    </div>
  );
};

export default CollectionCard;