import React, { useEffect, useState } from "react";
import styles from "../styles/pages/Collection.module.css";
import { getCollections } from "../../utils/apiCalls"; // same place as your other calls

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionsData = async () => {
      try {
        const data = await getCollections(); // { collections, metadata }
        const rows = (data?.collections || []).map((c) => ({
          id: c.id,
          title: c.name ?? "",
          subtitle: c.description ?? "",
          image: Array.isArray(c.images) && c.images.length ? c.images[0] : "",
          link: c.link ?? undefined,
        }));
        setCollections(rows);
      } catch (err) {
        console.error("Failed to fetch Collections:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error loading Collections</div>;

  // 1 hero + 4 cards
  const [hero, ...rest] = collections;
  const four = rest.slice(0, 4);

  return (
    <section className={styles.wrap}>
      {/* HERO */}
      {hero && (
        <div className={styles.heroCard}>
          <img
            src={hero.image}
            alt={hero.title || "Collections"}
            className={styles.heroImage}
          />
          <div className={styles.heroPanel}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>{hero.title || "Collections"}</h1>
              {hero.subtitle && (
                <p className={styles.heroSubtitle}>{hero.subtitle}</p>
              )}
              {hero.link && (
                <a className={styles.ctaBtn} href={hero.link}>
                  Shop Collection
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4 cards */}
      <div className={styles.cardsRail} aria-label="Collections">
        {four.map((c) => (
          <article key={c.id} className={styles.card}>
            <div
              className={styles.cardImg}
              style={{ backgroundImage: `url(${c.image})` }}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardText}>
              <div className={styles.cardTitleTop}>
                {(c.title || "").split(" ")[0]}
              </div>
              <div className={styles.cardTitleBottom}>
                {(c.title || "Collection").split(" ").slice(1).join(" ") ||
                  "Collection"}
              </div>
              {c.subtitle && (
                <div className={styles.cardSubtitle}>{c.subtitle}</div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
