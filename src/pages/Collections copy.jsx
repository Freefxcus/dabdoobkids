import React from "react";
import styles from "../styles/pages/Collection.module.css";
import WinterCollection from "../images/collections/winter-collection.png";
import RamadanCollection from "../images/collections/ramadan-collection.png";
import SummerCollection from "../images/collections/summer-collection.png";
import DressesCollection from "../images/collections/dresses-collection.png";
import heroImg from "../images/collections/Collections-hero.png";

export default function Collections() {
  return (
    <section className={styles.wrap}>
      {/* HERO — background image covers the whole card */}
      <div className={styles.heroCard}>
        <img src={heroImg} alt="Winter collection kids" className={styles.heroImage} />
        <div className={styles.heroPanel}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Cozy & Cute, Winter-Ready</h1>
            <p className={styles.heroSubtitle}>
              Wrap your little ones in warmth and style with our Winter Kids’ Collection —
              where comfort meets playful fashion for every chilly adventure.
            </p>
            <button className={styles.ctaBtn}>Shop Collection</button>
          </div>
        </div>
      </div>

      {/* 4 collection cards — one row on all screens; scroll on mobile */}
      <div className={styles.cardsRail} aria-label="Collections">
        <CollectionCard
          img={WinterCollection}
          titleLine1="Winter"
          titleLine2="Collection"
        />
        <CollectionCard
          img={SummerCollection}
          titleLine1="Summer"
          titleLine2="Collection"
        />
        <CollectionCard
          img={RamadanCollection}
          titleLine1="Ramadan"
          titleLine2="Collection"
        />
        <CollectionCard
          img={DressesCollection}
          titleLine1="Dresses"
          titleLine2="Collection"
        />
      </div>
    </section>
  );
}

function CollectionCard({ img, titleLine1, titleLine2 }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardImg} style={{ backgroundImage: `url(${img})` }} />
      <div className={styles.cardOverlay} />
      <div className={styles.cardText}>
        <div className={styles.cardTitleTop}>{titleLine1}</div>
        <div className={styles.cardTitleBottom}>{titleLine2}</div>
      </div>
    </article>
  );
}
