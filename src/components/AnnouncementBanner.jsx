import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/components/AnnouncementBanner.css";

const announcements = [
  "شحن مجاني فوق ال ٣٥٠٠ جنيه",
  "الأسعار شاملة كل حاجة الجمارك والشحن الدولي",
  "الدفع عند الاستلام وبتشوف الاوردر قبل ماتدفع (تطبق سياسة الشحن)",
  "Order takes 10 to 14 days",
  "Free shipping over 3500 LE",
  "Prices include Tax and customs",
  "لاي استفسارات اخري يمكنكم ارسال رسالة علي الانستجرام Kidzdabdoob",
  "يمكنكم الشراء من قسم الفوري اضغط هنا",
  "آخر يوم لطلب اوردر العيد يوم ٧ رمضان إن شاء الله",
];

const AnnouncementBanner = () => {
  const [index, setIndex] = useState(0);
  const [inProp, setInProp] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setInProp(false); // Start fade out + move down
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        setInProp(true); // Start fade in + move up
      }, 1000); // Time for fade out
    }, 4000); // Total time per message

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-bar">
      <CSSTransition in={inProp} timeout={1000} classNames="banner-text" unmountOnExit>
        <p>{announcements[index]}</p>
      </CSSTransition>
    </div>
  );
};

export default AnnouncementBanner;
