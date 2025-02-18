import AddIcon from "@mui/icons-material/Add";
import AddressModal from "./AddressModal";
import { useEffect, useState } from "react";
import styles from "../../styles/components/Popup.module.css";
import payment1 from "../../images/image1.png";
import payment2 from "../../images/image2.png";
import payment3 from "../../images/image3.png";
import payment4 from "../../images/image4.png";
import FirstValuIcon from "../../images/image6.png";
import SecondValuIcon from "../../images/Payment Name.png";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { getAddress, getWallet } from "../../utils/apiCalls";
import { useSearchParams } from "react-router-dom";

export default function BillingDetails({
  address,
  addressActive,
  setAddressActive,
  ForceReload,
  setForceReload,
  setPhone,
  phone,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [addressInfo, setAddressInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [payemntMethod, setPaymentMethod] = useState(
    searchParams.get("paymentMethod")
  );
  const [promoCode, setPromoCode] = useState(
    searchParams.get("promocode") || ""
  );

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("paymentMethod", "Cash on Delivery");
      return prev;
    });
  }, []);
  useEffect(() => {
    setAddressActive(
      address?.items?.length
        ? address?.items?.filter((item) => item?.primary).id ||
            address?.items?.[0]?.id
        : null
    );
  }, []);

  useEffect(() => {
    setAddressActive(
      address?.items?.length
        ? address?.items?.filter((item) => item?.primary).id ||
            address?.items?.[0]?.id
        : null
    );
  }, [address, ForceReload]);
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const initialValue = searchParams.get("paymentMethod") || "Cash on Delivery";
  const controlProps = (item) => ({
    checked: initialValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "12px" }}>
        Shipping Details
      </h1>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <div style={{ display: "grid", gap: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            <h3
              style={{
                marginBottom: "12px",
              }}
            >
              Address
            </h3>
          </div>
          {!address || address?.items?.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #E5E7EB",
                alignItems: "center",
              }}
            >
              <input
                disabled={true}
                style={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                  border: "none",
                  padding: "11px 14px",
                }}
                type="text"
                placeholder="Add Shipping Address"
              />
              <button
                style={{
                  backgroundColor: "transparent",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  marginInline: "8px",
                }}
                onClick={() => {
                  setOpenAdd(true);
                }}
              >
                <AddIcon sx={{ color: "var(--brown)", cursor: "pointer" }} />
              </button>
            </div>
          ) : (
            address?.items?.map((addressItem) => (
              <div
                key={addressItem.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid #E5E7EB",
                  alignItems: "center",
                  backgroundColor:
                    addressActive == addressItem.id ? "#E5E7EB44" : "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAddressActive(addressItem.id);
                }}
              >
                <div style={{ padding: "12px" }}>
                  <h1>
                    {addressItem.address}, {addressItem?.city?.name?.en},{" "}
                    {addressItem?.governorate?.name?.en}{" "}
                  </h1>
                </div>

                <img
                  onClick={() => {
                    setAddressInfo(addressItem);
                    setOpenEdit(true);
                  }}
                  style={{
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  src="/editpen.svg"
                  alt="editIcon"
                />
              </div>
            ))
          )}
        </div>

        {/* Payment Method */}
        <div style={{ marginTop: "12px" }}>
          <h1>Expedition</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {/* Credit Card Option */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <img
                  src="/CreditCard.svg"
                  style={{ height: "28px", width: "28px" }}
                  alt="Visa Icon"
                />
                Credit Card
              </div>
              <Radio
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("paymentMethod", "Credit Card");
                    return prev;
                  });
                }}
                {...controlProps("Credit Card")}
                sx={{
                  "&.Mui-checked": {
                    color: "var(--brown)",
                  },
                }}
              />
            </div>

            {/* Payment Icons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "8px",
                justifyContent: "start",
              }}
            >
              <img
                src={payment1}
                style={{ height: "20px", width: "20px" }}
                alt="Payment Option 1"
              />
              <img
                src={payment2}
                style={{ height: "20px", width: "20px" }}
                alt="Payment Option 2"
              />
              <img
                src={payment3}
                style={{ height: "20px", width: "20px" }}
                alt="Payment Option 3"
              />
              <img
                src={payment4}
                style={{ height: "20px", width: "20px" }}
                alt="Payment Option 4"
              />
            </div>

            {/* E-Wallet Option */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "auto",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <img
                    src="/Wallet.svg"
                    style={{ height: "28px", width: "28px" }}
                    alt="Wallet Icon"
                  />
                  E-Wallet
                </div>
                <Radio
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("paymentMethod", "E-Wallet");
                      return prev;
                    });
                  }}
                  sx={{
                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                  {...controlProps("E-Wallet")}
                />
              </div>

              {searchParams.get("paymentMethod") === "E-Wallet" ? (
                <div className={styles.item}>
                  <div className={`${styles.label} ${styles.item}`}>
                    <span>Phone Number </span>
                    <span className={styles.error}> *</span>
                  </div>
                  <input
                    value={phone}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    onChange={(e) => setPhone(e.target.value?.trim())}
                    id="phone"
                    type="tel"
                    pattern="^01[0-2,5]\d{8}$"
                    minLength={11}
                    maxLength={11}
                    required={searchParams.get("paymentMethod") === "E-Wallet"}
                    placeholder="Enter phone number"
                  />
                </div>
              ) : null}
            </div>

            {/* valu Option */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "auto",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <img
                    src={FirstValuIcon}
                    style={{ height: "20px", width: "20px" }}
                    alt="Valu Icon"
                  />
                  <img
                    src={SecondValuIcon}
                    style={{ height: "20px", width: "20px" }}
                    alt="Valu Icon"
                  />
                </div>
                <Radio
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("paymentMethod", "Valu");
                      return prev;
                    });
                  }}
                  sx={{
                    "&.Mui-checked": {
                      color: "var(--brown)",
                    },
                  }}
                  {...controlProps("Valu")}
                />
              </div>

              {searchParams.get("paymentMethod") === "Valu" ? (
                <div className={styles.item}>
                  <div className={`${styles.label} ${styles.item}`}>
                    <span>Phone Number </span>
                    <span className={styles.error}> *</span>
                  </div>
                  <input
                    value={phone}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    onChange={(e) => setPhone(e.target.value?.trim())}
                    id="phone"
                    type="tel"
                    pattern="^01[0-2,5]\d{8}$"
                    minLength={11}
                    maxLength={11}
                    required={searchParams.get("paymentMethod") === "Valu"}
                    placeholder="Enter phone number"
                  />
                </div>
              ) : null}
            </div>

            {/* Cash on Delivery Option */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <img
                  src="/cash.svg"
                  style={{ height: "28px", width: "28px" }}
                  alt="Cash Icon"
                />
                Cash on Delivery
              </div>
              <Radio
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("paymentMethod", "Cash on Delivery");
                    return prev;
                  });
                }}
                sx={{
                  "&.Mui-checked": {
                    color: "var(--brown)",
                  },
                }}
                {...controlProps("Cash on Delivery")}
              />
            </div>

            {/* Delivery Instructions */}
            <div
              style={{
                marginTop: "6px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3>Add Delivery Instructions</h3>
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  border: "1px solid #E5E7EB",
                  padding: "12px",
                  borderRadius: "4px",
                }}
                placeholder="Enter delivery instructions..."
              />
            </div>
          </div>
        </div>

        {address?.items?.length ? (
          addressInfo && openEdit ? (
            <AddressModal
              open={openEdit}
              setOpen={setOpenEdit}
              addressInfo={addressInfo}
              setForceReload={setForceReload}
              type="edit"
            />
          ) : null
        ) : (
          <AddressModal
            open={openAdd}
            setOpen={setOpenAdd}
            type="add"
            setForceReload={setForceReload}
          />
        )}
      </Box>
    </div>
  );
}
