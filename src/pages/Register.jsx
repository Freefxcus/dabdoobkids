import { Helmet } from "react-helmet";
import Form from "../components/Form";
import styles from "../styles/pages/Register.module.css";

export default function Register() {
  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      <Helmet>
        <title>{"E-commerce | register page"}</title>
        <meta
          name="description"
          content={
            "Join the E-commerce Fun!\n Sign up for your child's free account and unlock a world of exciting activities, games, and learning adventures designed especially for kids"
          }
        />
      </Helmet>
      <Form type="register" />
    </div>
  );
}
