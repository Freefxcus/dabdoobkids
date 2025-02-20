import React from "react";
import { Box } from "@mui/material";
export default function News() {
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
      <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>Dabdoobkidz News</Box>
      <Box sx={{ maxWidth: "800px", fontSize: "20px", lineHeight: "2" }}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
        reproduced below for those interested. Sections 1.10.32 and 1.10.33 from
        "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their
        exact original form, accompanied by English versions from the 1914
        translation by H. Rackham.
      </Box>
    </Box>
  );
}
