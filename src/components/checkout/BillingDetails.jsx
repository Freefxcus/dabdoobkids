import AddIcon from "@mui/icons-material/Add";
import AddressModal from "./AddressModal";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { getAddress } from "../../utils/apiCalls";
import { useSearchParams } from "react-router-dom";
export default function BillingDetails({address}) {
  const [open, setOpen] = useState(false);
 //[{}F
  const [searchParams, setSearchParams] = useSearchParams();
  const [payemntMethod, setPaymentMethod] = useState(searchParams.get("paymentMethod") ||"cash");
    const [promoCode , setPromoCode] = useState(searchParams.get("promocode") ||"")

    console.log(searchParams.get("paymentMethod") , "paymentMethod12312132");
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  const controlProps = (item) => ({
    checked: payemntMethod === item,
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
      <div>
        <h3
          style={{
            marginBottom: "12px",
          }}
        >
          Address
        </h3>
        {address?.items?.length === 0 ? (
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
            <div
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon sx={{ color: "var(--brown)", cursor: "pointer" }} />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #E5E7EB",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "12px" }}>
              <h1>
                {address?.items?.[0].address},{" "}
                {address?.items?.[0]?.city?.name?.en},{" "}
                {address?.items?.[0]?.governorate?.name?.en}{" "}
              </h1>
            </div>
            <img
              onClick={() => {
                setOpen(true);
              }}
              style={{
                padding: "12px",
                cursor: "pointer",
              }}
              src="/editpen.svg"
              alt="editIcon"
            />
          </div>
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
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <img
                src="/CreditCard.svg"
                style={{ height: "28px", width: "28px" }}
                alt="Visa Icon"
              />
              Credit Card
            </div>
            <Radio
              {...controlProps("Credit Card")}
              sx={{
                "&.Mui-checked": {
                  color: "var(--brown)",
                },
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <img
                src="/Wallet.svg"
                style={{ height: "28px", width: "28px" }}
                alt="Wallet Icon"
              />
              Wallet
            </div>

            <Radio
              sx={{
                "&.Mui-checked": {
                  color: "var(--brown)",
                },
              }}
              {...controlProps("Wallet")}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <img
                src="/cash.svg"
                style={{ height: "28px", width: "28px" }}
                alt="cash Icon"
              />
              Cash
            </div>

            <Radio
              sx={{
                "&.Mui-checked": {
                  color: "var(--brown)",
                },
              }}
              {...controlProps("cash")}
            />
          </div>

          <div style={{marginTop : "6px" , display : "flex" ,flexDirection : "column"  , gap  :"12px"}}>
            <h3>Add Delivery Instructions</h3>
            <textarea
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid #E5E7EB",
                padding: "12px",
              }}
              />
          </div>
        </div>
      </div>
      <AddressModal
        open={open}
        setOpen={setOpen}
        addressInfo={address.items?.[0]}
        type="edit"
      />
    </div>
  );
}
