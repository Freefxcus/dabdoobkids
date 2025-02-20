<<<<<<< HEAD
import styles from "../styles/pages/Otp.module.css";
import Otp from "../components/Otp";

export default function Register() {
  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      <Otp />
    </div>
  );
}
=======
import { useState } from "react";
import styles from "../styles/pages/Otp.module.css";
import Otp from "../components/Otp";

export default function Register() {
  const [largeImage, setLargeImage] = useState();

  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      <Otp />
    </div>
  );
}
>>>>>>> d1589dedd (Saving local changes before pulling latest updates)
