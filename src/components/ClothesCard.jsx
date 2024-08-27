import React from "react";
import styles from "../styles/components/ClothesCard.module.css";
import lady from "../images/lady.png";
import hot from "../images/hot.svg";
import eHeart from "../images/empty-heart.svg";
import fHeart from "../images/filled-heart.svg";

import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/general.js";
import { CardMedia } from "@mui/material";
import HandleMessageIsAuth from "../utils/message/index.js";
import {
  useAddToWishListMutation,
  useDeleteWishListMutation,
  useGetAllWishListQuery,
} from "../Redux/wishlistApi.jsx";
export default function ClothesCard({ item }) {
  const navigate = useNavigate();
  const { data: wishListData } = useGetAllWishListQuery();
  const wishListItems = wishListData?.data?.[0]?.items || [];

  const wished = wishListItems.some(
    (product) => product?.product?.id == item?.id
  );

  const [
    addToWishList,
    {
      isLoading: wishListAddLoad,
      isSuccess: isSuccessAddWishList,
      isError: isErrorAddWishList,
      error: addWishListError, // Capture the error object
    },
  ] = useAddToWishListMutation();
  
  const [
    deleteWishList,
    {
      isLoading: wishListDeleteLoad,
      isSuccess: isSuccessDeleteWishList,
      isError: isErrorDeleteWishList,
      error: deleteWishListError, // Capture the error object
    },
  ] = useDeleteWishListMutation();
  
  const handleTargetWishlist = async () => {
    try {
      if (wished) {
        await deleteWishList(item?.id).unwrap(); // unwrap to handle promise rejection
    
          notifySuccess("Removed from wishlist!");
      } else {
        await addToWishList(item?.id).unwrap(); // unwrap to handle promise rejection
        
          notifySuccess("Added to wishlist!");
        
      }
    } catch (error) {
      if (isErrorAddWishList || isErrorDeleteWishList) {
        const errorMessage = addWishListError?.data?.message || deleteWishListError?.data?.message || "An error occurred";
        notifyError(errorMessage);
      }else{
        notifyError(error||"An error occurred")
      }
    }
  };
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate(`/details/${item?.id}`);
      }}
    >
      <div className={styles["card-top"]}>
        <CardMedia
          sx={{
            height: { lg: "356px", md: "300px", xs: "204px" },
            width: "100%",
            objectFit: "cover",
          }}
          component={"img"}
          src={
            item?.images?.[0] || "https://i.postimg.cc/HnNLbVGh/placeholder.png"
          }
        />
        <button
          type="button"
          disabled={wishListAddLoad || wishListDeleteLoad}
          className={styles["heart-container"]}
          onClick={(e) => {
            e.stopPropagation();
            HandleMessageIsAuth(handleTargetWishlist);
          }}
        >
          <img src={wished ? fHeart : eHeart} width="25px" alt="heart" />
        </button>
        <div className={styles["tags-container"]}>
          {item?.extraInfo?.new && (
            <div className={styles["hot-container"]}>
              <div>New</div>
              <img src={hot} width="14px" alt="second heart" />
            </div>
          )}
          {item?.status !== "in-stock" && (
            <div className={styles["sold-container"]}>
              <div>Sold Out</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles["card-bottom"]}>
        <div style={{ fontWeight: "600" }}>{item?.brand?.name}</div>
        {/* <div>{truncateText( item?.description, 50)}</div> */}
        <div style={{ fontWeight: "bold" }}>${item?.price}</div>
      </div>
    </div>
  );
}
