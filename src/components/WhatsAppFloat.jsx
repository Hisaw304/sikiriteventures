import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/2348136012465"
      className="sv-whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="sv-whatsapp-pulse"></span>

      <FaWhatsapp className="sv-whatsapp-icon" />

      <span className="sv-whatsapp-tooltip">Chat with us</span>
    </a>
  );
};

export default WhatsAppFloat;
