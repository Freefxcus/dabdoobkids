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
