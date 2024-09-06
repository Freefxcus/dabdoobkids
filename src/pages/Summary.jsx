import { useState } from "react";
import styles from "../styles/pages/Summary.module.css";
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
export default function Summary() {
  const [promocode, setPromocode] = useState("");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({});
  const [paymentOption, setPaymentOption] = useState("Credit Card"); // "Cash on Delivery"

  return (
    <div className={`${styles.container} padding-container`}>
      <Popup
        open={open}
        setOpen={setOpen}
        type="create_address"
        option="no_api"
        setAddress={setAddress}
        address={address}
      />
      <div className={styles.column}>
        <div className={styles.title_main}>Summary Order</div>
        <div className={styles.order_summary}>
          <OrderCard />
          <OrderCard />
        </div>
        <div className={styles.title_main}>Shipping Details</div>
        <div className={styles.shipping_details}>
          {address.address && (
            <>
              <div>Address</div>
              <div className={styles.address_container}>
                <div>{address.address}</div>
                <img
                  src={edit}
                  width="20px"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              </div>
            </>
          )}
          {!address.address && (
            <>
              <div>Address</div>
              <div className={styles.add_address_container}>
                <div>Add shipping address</div>
                <img
                  src={add}
                  width="40px"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              </div>
            </>
          )}

          <>
            <div>Payment Option</div>
            <RadioGroup
              value={paymentOption}
              className={styles.radio_container}
            >
              {/* option 1 */}
              <div
                className={
                  paymentOption === "Credit Card"
                    ? styles.radio_option_active
                    : styles.radio_option
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPaymentOption("Credit Card")}
              >
                <div className={styles.radio_option_section}>
                  <img src="credit-card.png" width="30px" />
                  <div className={styles.description}>Credit Card</div>
                </div>
                <div className={styles.radio_option_section}>
                  {/* <div style={{ textAlign: "center" }}>EGP 12.00</div> */}
                  <FormControlLabel
                    value="Credit Card"
                    control={<Radio />}
                    sx={{ m: 0 }}
                  />
                </div>
              </div>
              {/* option 2 */}
              <div
                className={
                  paymentOption === "Cash on Delivery"
                    ? styles.radio_option_active
                    : styles.radio_option
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPaymentOption("Cash on Delivery")}
              >
                <div className={styles.radio_option_section}>
                  <img src="credit-card.png" width="30px" />
                  <div className={styles.description}>Cash on Delivery</div>
                </div>
                <div className={styles.radio_option_section}>
                  {/* <div style={{ textAlign: "center" }}>Free</div> */}
                  <FormControlLabel
                    value="Cash on Delivery"
                    control={<Radio />}
                    sx={{ m: 0 }}
                  />
                </div>
              </div>
              {/* option 3 */}
              <div
                className={
                  paymentOption === "Wallet"
                    ? styles.radio_option_active
                    : styles.radio_option
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPaymentOption("Wallet")}
              >
                <div className={styles.radio_option_section}>
                  <img src="./e-wallet.png" width="30px" />
                  <div className={styles.description}>Cash on Delivery</div>
                </div>
                <div className={styles.radio_option_section}>
                  {/* <div style={{ textAlign: "center" }}>Free</div> */}
                  <FormControlLabel
                    value="Wallet"
                    control={<Radio />}
                    sx={{ m: 0 }}
                  />
                </div>
              </div>
            </RadioGroup>
            <div>Add Delivery Instructions</div>
            <textarea
              className={styles.textarea}
              placeholder="write your instructions...."
              rows="4"
              // cols="50"
            ></textarea>
          </>
        </div>
      </div>
      <div className={styles.price_summary}>
        <div className={styles.title_main}>Price Summary</div>
        <div>
          <div className={styles.title_sub}>Promo Code</div>
          <div
            className={styles.row}
            style={{
              paddingTop: "10px",
            }}
          >
            <div className={styles.promo_input_container}>
              <img src={promo} width="20px" />
              <input
                type="text"
                className={styles.promo_input}
                value={promocode}
                onChange={(e) => {
                  setPromocode(e.target.value);
                }}
              />
              <img
                src={x}
                width="20px"
                style={{
                  cursor: "pointer",
                  visibility: promocode ? "initial" : "hidden",
                }}
                onClick={() => {
                  setPromocode("");
                }}
              />
            </div>
            <button className={styles.btn}>Add</button>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title_sub}>Total Shopping</div>
          <div className={styles.value}>EGP {`3.040.00`}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.title_sub}>Shipping</div>
          <div className={styles.value}>EGP {`10.00`}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.title_sub}>Tax</div>
          <div className={styles.value}>EGP {`10.00`}</div>
        </div>
        <div className={styles.row} style={{ color: "var(--brown)" }}>
          <div className={styles.title_sub} style={{ color: "var(--brown)" }}>
            Discount
          </div>
          <div className={styles.value}>-EGP {`50.00`}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.title_main}>Sub Total</div>
          <div className={styles.title_main}>EGP {`3.010.00`}</div>
        </div>
       
        <button
          className={styles.brown_button}
          // disabled={!address.address || !promocode}
          disabled={!address.address}
        >
          Continue to payment
        </button>
      </div>
    </div>
  );
}
