import { useState } from "react";
import styles from "../styles/pages/Cart.module.css";
import promo from "../images/promo.png";
import x from "../images/x.png";
import add from "../images/add.png";
import edit from "../images/edit.png";
import fedex from "../images/fedex.png";
import dabdobkidz from "../images/dabdobkidz.png";
import OrderCard from "../components/OrderCard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Popup from "../components/Popup";
export default function Cart() {
  const [promocode, setPromocode] = useState("");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({});
  const [paymentOption, setPaymentOption] = useState("Credit Card"); // "Cash on Delivery"

  return (
    <div className={`${styles.container} padding-container`}>
      <Popup open={open} setOpen={setOpen} type="create_address" />
      <div className={styles.column}>
        <div className={styles.title_main}>Summary Order</div>
        {["", "", ""].map(() => (
          <OrderCard editable={true} />
        ))}
      </div>
    </div>
  );
}
