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
export default function BillingDetails() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({}); //[{}F
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getAddress();
      setAddress(address);
    };
    fetchAddress();
  }, []);
  console.log("address>>>>>" , address);



  const controlProps = (item) => ({
    checked: selectedValue === item,
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
              {...controlProps("Wallet")}
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
              {...controlProps("Credit Card")}
            />
          </div>
        </div>
      </div>
      <AddressModal open={open} setOpen={setOpen} />
    </div>
  );
}
