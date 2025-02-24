import { useEffect, useState } from "react";
import { getWishlistItems } from "../utils/apiCalls";
import Productcard from "../components/ProductCard";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { set } from "lodash";
import Loader from "../components/Loader";
import { useGetAllWishListQuery } from "../Redux/wishlistApi";
import ClothesCard from "../components/ClothesCard";

export default function WishList() {
  const navigate = useNavigate();
  const { data: wishListData, isLoading } = useGetAllWishListQuery();
  const wishListItems = wishListData?.data?.[0]?.items || [];

  const [changed, setChanged] = useState(false);

  if (isLoading) {
    return <Loader open={true} />;
  }
  return (
    <div
      style={{ minHeight: "60vh", paddingTop: "50px", paddingBottom: "100px" }}
      className="padding-container"
    >
      <h1 style={{ fontSize: "32px", fontWeight: "400", margin: "12px auto" }}>
        My WishList
      </h1>
      {wishListItems?.length === 0 ? (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/empty-wishlist.svg" alt="empy cart" />
            <h2>Empty Wishlist</h2>
            <p>
              Looks like you haven't added any products to your wishlist yet.
            </p>
            <button
              onClick={() => {
                navigate("/");
              }}
              style={{
                backgroundColor: "var(--brown)",
                color: "white",
                border: "none",
                padding: "12px 48px",
                fontWeight: "400",
                fontSize: "18px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              continue shopping
            </button>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              lg: "repeat(4,1fr)",
              md: "repeat(3,1fr)",
              xs: "repeat(2,1fr)",
            },
            justifyItems: "center",
            paddingY: 5,
            gap:{xs:1,sm:2,lg:3}
          }}
        >
          {wishListItems?.map((item) => (
            <ClothesCard item={item.product} setChanged={setChanged} />
          ))}
        </Box>
      )}
    </div>
  );
}
