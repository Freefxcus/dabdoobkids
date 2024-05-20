import { useState } from "react";
import styles from "../styles/pages/Register.module.css";
import Form from "../components/Form";

export default function Register() {
  const [largeImage, setLargeImage] = useState();

  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      <Form type="register" />
    </div>
  );
}
