import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../styles/components/AnnouncementBanner.css";

const announcements = [
  "الاسعار شامله الجمارك والشحن الدولي",
"ولا يوجد أي مصاريف اضافيه عند ال checkout",
"شحن مجاني لأي اوردر اكتر من 3500 جنيه",
"5% Off the first order use code: Off5",
"No extra fees or taxes will be applied",
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
