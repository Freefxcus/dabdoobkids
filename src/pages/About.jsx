import React from "react";
import { Box } from "@mui/material";
import logo from "../images/logo.svg";
export default function About() {
  return (
    <Box
      className="padding-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        mt: "20px",
        mb: "20px",
      }}
    >
      {/* <Box component="img" src={logo} sx={{ maxWidth: "100px" }} /> */}
      <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>About Dabdoobkidz</Box>
      <Box sx={{ maxWidth: "800px", fontSize: "20px", lineHeight: "2" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Box>
    </Box>
  );
}
