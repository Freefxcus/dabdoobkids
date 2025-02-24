import AddIcon from "@mui/icons-material/Add";
import AddressModal from "./AddressModal";
import { useEffect, useState } from "react";
import styles from "../../styles/components/Popup.module.css";

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
            {/*         
          {address?.items?.length?  <button
              style={{
              backgroundColor: "transparent",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
               border:"none",
               marginInline:"8px"
            }}
            onClick={() => {
              setOpenAdd(true);
            }}
          >
            <AddIcon sx={{ color:  "var(--brown)", cursor: "pointer" }} />
            </button>
         :null }    */}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "auto",
                transition: "all",
                transitionDuration: "0.5s",
              }}
            >
              {/* Wallet */}
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <img
                    src="/Wallet.svg"
                    style={{ height: "28px", width: "28px" }}
                    alt="Wallet Icon"
                  />
                  Wallet
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
                    style={{ width: "100%", boxSizing: "border-box" }}
                    onChange={(e) => setPhone(e.target.value?.trim())}
                    id="phone"
                    type="tel"
                    pattern="^01[0-2,5]\d{8}$" // Phone number pattern (11 digits)
                    minLength={11} // Ensure phone number is at least 11 characters long
                    maxLength={11} // Limit phone number to 11 characters
                    required={searchParams.get("paymentMethod") === "E-Wallet"}
                    className={`phone-input`}
                    placeholder="Enter phone number"
                  />
                </div>
              ) : null} */}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <img
                  src="/cash.svg"
                  style={{ height: "28px", width: "28px" }}
                  alt="cash Icon"
                />
                Cash
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
                  // width: "100%",
                  height: "100px",
                  border: "1px solid #E5E7EB",
                  padding: "12px",
                }}
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
