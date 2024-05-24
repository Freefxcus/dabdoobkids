import { Box, Button, Typography } from "@mui/material";

import { useState } from "react";
import { redirect, useNavigate, useParams, useSearchParams } from "react-router-dom";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OAuth() {
    const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  console.log(searchParams.get("code"), "<<<parammmms");

  return (
    <Box
      sx={{
        height: "70vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <Typography id="modal-modal-title" variant="h3" component="h2">
        Success!
      </Typography>

      <button
        onClick={()=>{
            navigate("/")
        }}
        style={{ backgroundColor: "var(--brown)", color: "white", padding: "8px" }}
      >
        Continue
      </button>
    </Box>
  );
}
