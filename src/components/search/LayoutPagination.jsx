import { Box, Pagination } from "@mui/material";
import useCreateQueryString from "../../hooks/useCreateQueryString";

function LayoutPagination({ totalPages, page }) {
  const { createQueryString } = useCreateQueryString();

  const handlePageChange = (event, value) => createQueryString("page", value);

  return (
    <Box sx={{ width: "100%", mx: "auto", marginTop: "24px" }}>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          ".Mui-selected": {
            color: "var(--brown)", // Brown color for selected page
            border: "1px solid rgba(173, 107, 70, 0.5)", // Brownish border
            backgroundColor: "rgba(173, 107, 70, 0.12)", // Light brownish background
          },
          ".MuiPaginationItem-root": {
            color: "var(--brown)", // Brown color for non-selected pagination items
            "&:hover": {
              backgroundColor: "rgba(173, 107, 70, 0.12)", // Hover background color
            },
          },
        }}
        variant="outlined"
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
}

export default LayoutPagination;
