import React from 'react';
import '../styles/components/WhatsAppIcom.module.css';

const WhatsAppIcon = () => {
  const whatsappUrl = "https://wa.me/34643968171"; 

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fa fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppIcon;