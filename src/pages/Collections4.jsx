import React from 'react';

// --- Local Image Imports ---
// Using the paths you provided.
import dabdoobLogo from '../images/collections/dabdoob.png';
import winterImg from '../images/collections/winter.png';
import setsImg from '../images/collections/sets.png';
import eidImg from '../images/collections/eid.png';
import summerImg from '../images/collections/summer.png';
import footwearImg from '../images/collections/foot-wear.png';


// --- Style Objects ---
// All styles are defined as JavaScript objects here.
const styles = {
  sectionWrapper: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '80rem',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '2rem',
  },
  gridContainerWrapper: {
    position: 'relative',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '1rem',
    width: '100%',
    aspectRatio: '4 / 2.5',
  },
  // Grid item positioning
  gridCard1: { gridColumn: 'span 3', gridRow: 'span 1' },
  gridCard2: { gridColumn: 'span 3', gridRow: 'span 1' },
  gridCard3: { gridColumn: 'span 2', gridRow: 'span 1' },
  gridCard4: { gridColumn: 'span 2', gridRow: 'span 1' },
  gridCard5: { gridColumn: 'span 2', gridRow: 'span 1' },
  // Card styles
  card: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  cardImage: {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 500ms ease-in-out',
  },
  cardOverlay: {
    position: 'absolute',
    inset: '0',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)',
  },
  cardTitle: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  // Logo styles
  logoWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  },
  logoCircle: {
    width: '7rem',
    height: '7rem',
    backgroundColor: 'white',
    borderRadius: '9999px',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }
};


// Reusable Card Component
const CollectionCard = ({ imageUrl, title, gridPositionStyle }) => {
  const combinedCardStyle = { ...styles.card, ...gridPositionStyle };

  return (
    <div style={combinedCardStyle}>
      <img src={imageUrl} alt={title} style={styles.cardImage} />
      <div style={styles.cardOverlay}></div>
      <h3 style={styles.cardTitle}>{title}</h3>
    </div>
  );
};

// Main Collections Component
const Collections = () => {
      return (
    <div className="app-container">
      <div className="logo-container">
        {/* You can replace this with your own logo */}
        <img src="https://via.placeholder.com/150" alt="Logo" className="logo" />
      </div>

      {/* First Row */}
      <div className="row">
        <Card title="Card 1" content="Content for the first card." width="30%" />
        <Card title="Card 2" content="Content for the second card." width="30%" />
        <Card title="Card 3" content="Content for the third card." width="30%" />
      </div>

      {/* Second Row */}
      <div className="row">
        <Card title="Card 4" content="Content for the fourth card." width="45%" />
        <Card title="Card 5" content="Content for the fifth card." width="45%" />
      </div>
    </div>
  );
};

export default Collections;
