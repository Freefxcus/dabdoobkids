import { useState } from "react";
import styles from "../styles/pages/Register.module.css";
import Form from "../components/Form";
import { Helmet } from "react-helmet";

export default function Register() {
  const [largeImage, setLargeImage] = useState();

  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
        <Helmet>
        <title>{"Dabdoob Kidz | register page"}</title>
        <meta name="description" content={"Join the Dabdoob Kidz Fun!\n Sign up for your child's free account and unlock a world of exciting activities, games, and learning adventures designed especially for kids"} />
      </Helmet>
      <Form type="register" />
    </div>
  );
}
