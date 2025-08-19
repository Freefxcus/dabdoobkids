import React, { useEffect, useState } from 'react';
const data = await fetchCollections({ limit: 5 }); // 1 hero + 4 cards
if (mounted) setCards(data);
} catch (e) {
if (mounted) setError(e.message || 'Failed to load collections');
} finally {
if (mounted) setLoading(false);
}
})();
return () => { mounted = false; };
}, []);


const [hero, ...rest] = cards;
const four = rest.slice(0, 4);


return (
<section className={styles.wrap}>
{/* HERO */}
<div className={styles.heroCard}>
<img
src={hero?.image || heroImg}
alt={hero?.title || 'Collections'}
className={styles.heroImage}
/>
<div className={styles.heroPanel}>
<div className={styles.heroText}>
<h1 className={styles.heroTitle}>{hero?.title || 'Collections'}</h1>
{hero?.subtitle && <p className={styles.heroSubtitle}>{hero.subtitle}</p>}
{hero?.link && (
<a className={styles.ctaBtn} href={hero.link}>
Shop Collection
</a>
)}
</div>
</div>
</div>


{/* 4 collection cards */}
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
const [first, ...rest] = (title || 'Collection').split(' ');
const bottom = rest.length ? rest.join(' ') : 'Collection';
return (
<CardTag className={styles.card} {...props}>
<div className={styles.cardImg} style={{ backgroundImage: `url(${img})` }} />
<div className={styles.cardOverlay} />
<div className={styles.cardText}>
<div className={styles.cardTitleTop}>{first}</div>
<div className={styles.cardTitleBottom}>{bottom}</div>
{subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
</div>
</CardTag>
);
}