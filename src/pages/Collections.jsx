import React, { useEffect, useState } from "react";
import styles from "../styles/pages/Collection.module.css";

// If you still want a static hero image, keep this import.
import heroImg from "../images/collections/Collections-hero.png";

// ---- API client (minimal, uses env for base + token) ----
const API_BASE = import.meta.env.VITE_API_BASE_URL; // e.g. https://api.dabdoobkidz.com
const TEMP_TOKEN = import.meta.env.VITE_TEMP_AUTH_TOKEN; // matches JWTAnonymousGuard

async function fetchCollections({ limit = 5 } = {}) {
  const url = new URL("/collections", API_BASE);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TEMP_TOKEN}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to load collections: ${res.status}`);

  const json = await res.json();
  // API returns { status, data: { collections, metadata } }
  return json?.data?.collections ?? [];
}

export default function Collections() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await fetchCollections({ limit: 5 });
        // normalize to UI shape
        const norm = rows.map((c) => ({
          id: c.id,
          title: c.name ?? "",
          subtitle: c.description ?? "",
          image: Array.isArray(c.images) && c.images.length ? c.images[0] : undefined,
          link: c.link ?? undefined,
        }));
        if (mounted) setCards(norm);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Split hero + 4 cards
  const [hero, ...rest] = cards;
  const four = rest.slice(0, 4);

  return (
    <section className={styles.wrap}>
      {/* HERO */}
      <div className={styles.heroCard}>
        <img src={hero?.image || heroImg} alt={hero?.title || "Collections"} className={styles.heroImage} />
        <div className={styles.heroPanel}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{hero?.title || "Collections"}</h1>
            {hero?.subtitle && <p className={styles.heroSubtitle}>{hero.subtitle}</p>}
            {hero?.link && (
              <a className={styles.ctaBtn} href={hero.link}>
                Shop Collection
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cards rail */}
      <div className={styles.cardsRail} aria-label="Collections">
        {loading && <div className={styles.skeletonRow} />}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && four.map((c) => (
          <CollectionCard key={c.id} img={c.image} title={c.title} subtitle={c.subtitle} link={c.link} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({ img, title, subtitle, link }) {
  const CardTag = link ? 'a' : 'article';
  const props = link ? { href: link } : {};
  return (
    <CardTag className={styles.card} {...props}>
      <div className={styles.cardImg} style={{ backgroundImage: `url(${img})` }} />
      <div className={styles.cardOverlay} />
      <div className={styles.cardText}>
        <div className={styles.cardTitleTop}>{title?.split(' ')[0] || ''}</div>
        <div className={styles.cardTitleBottom}>{title?.split(' ').slice(1).join(' ') || 'Collection'}</div>
        {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
      </div>
    </CardTag>
  );
}
