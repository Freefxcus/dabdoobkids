import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  boxShadow: "none", // Remove the box shadow
  backgroundColor: "transparent", // Set the background color to transparent
  outline: "none",
};

export default function Loader({ open }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress
            sx={{ color: "#fff", border: "none" }}
            size="100px"
          />
        </Box>
      </Modal>
    </div>
  );
}
