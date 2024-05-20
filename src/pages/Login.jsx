import { useState } from "react";
import styles from "../styles/pages/Register.module.css";
import Form from "../components/Form";

export default function Login() {
  const [largeImage, setLargeImage] = useState();

  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      <Form type="login" />
    </div>
  );
}
