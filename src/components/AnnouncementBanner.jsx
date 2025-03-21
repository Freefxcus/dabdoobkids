import { useState, useEffect } from "react";
import "../styles/components/AnnouncementBanner.css"

const announcements = [
  "شحن مجاني فوق ال ٣٥٠٠ جنيه",
  "الأسعار شاملة كل حاجة الجمارك والشحن الدولي",
  "الدفع عند الاستلام وبتشوف الاوردر قبل ماتدفع (تطبق سياسة الشحن)",
  "Order takes 10 to 14 days",
];

const AnnouncementBanner = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`announcement-banner ${fade ? "fade-in" : "fade-out"}`}>
      <p>{announcements[index]}</p>
    </div>
  );
};

export default AnnouncementBanner;
