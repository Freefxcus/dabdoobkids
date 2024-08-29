import { Box, Stack } from "@mui/material";

export default function CartProgress({ value, percentage = "100%" }) {

  
  return (
    <Stack direction={"row"} gap={"24px"}>
      <span>{value}</span>
      <Box
        sx={{
          backgroundColor: "#D1D1D1",
          borderRadius: "50px",
          width:{xs:"80%" ,md: "400px"},
          height: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ position: "relative", width: `${percentage}%` }}>
            <img
              src="/bar.png"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "20px",
                borderRadius: "50px",
              }}
              alt=""
            />
            <img
              style={{
                height: "35px",
                width: "35px",
                position: "absolute",
                top: "-12px",
                right: "-8px",
              }}
              src="/dabdoobbar.svg"
              alt=""
            />
          </Box>
        </Box>
      </Box>
      3500$
    </Stack>
  );
}
