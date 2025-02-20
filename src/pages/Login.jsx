import styles from "../styles/pages/Register.module.css";
import Form from "../components/Form";
import { Helmet } from "react-helmet";

export default function Login() {
  return (
    <div
      className={`${styles.container} section-top-padding section-bottom-padding`}
    >
      {" "}
      <Helmet>
        <title>{"Dabdoob Kidz | login page"}</title>
        <meta
          name="description"
          content={
            "Join the Dabdoob Kidz Fun! login for your child's free account and unlock a world of exciting activities, games, and learning adventures designed especially for kids"
          }
        />
      </Helmet>
      <Form type="login" />
    </div>
  );
}
