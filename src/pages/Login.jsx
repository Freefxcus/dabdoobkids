import { useState } from "react";
import styles from "../styles/pages/Register.module.css";
import Form from "../components/Form";
import { Helmet } from "react-helmet";

export default function Login() {
  const [largeImage, setLargeImage] = useState();

  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      {" "}
      <Helmet>
        <title>{"E-commerce | login page"}</title>
        <meta
          name="description"
          content={
            "Join the E-commerce Fun! login for your child's free account and unlock a world of exciting activities, games, and learning adventures designed especially for kids"
          }
        />
      </Helmet>
      <Form type="login" />
    </div>
  );
}
