import { Box, Stack } from "@mui/material";

export default function CartProgress({ value = 0, percentage = "100%" }) {
  return (
    <Stack direction={"row"} gap={"24px"}>
      <span>{value}</span>
      <Box
        sx={{
          backgroundColor: "#D1D1D1",
          borderRadius: "50px",
          width: { xs: "80%", md: "400px" },
          height: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ position: "relative", width: `${percentage}%` }}>
            <div
              style={{
                width: "100%",
                height: "20px",
                borderRadius: "50px",
                backgroundColor: "#000",
              }}
            ></div>
            <div
              style={{
                height: "20px",
                width: "20px",
                position: "absolute",
                top: "50%",
                right: "-10px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            ></div>
          </Box>
        </Box>
      </Box>
      3500EGP
    </Stack>
  );
}
