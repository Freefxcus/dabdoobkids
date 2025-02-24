import React from "react";
import {
  useAddToWishListMutation,
  useDeleteWishListMutation,
  useGetAllWishListQuery,
} from "../../Redux/wishlistApi";
import { notifyError, notifySuccess } from "../../utils/general";
import HandleMessageIsAuth from "../../utils/message";
import styles from "../../styles/pages/Details.module.css";
import eHeart from "../../images/empty-heart.svg";
import fHeart from "../../images/filled-heart.svg";
export default function WishlistProductDetails({ id }) {
  const { data: wishListData } = useGetAllWishListQuery();
  const wishListItems = wishListData?.data?.[0]?.items || [];

  const wished = wishListItems.some((product) => product?.product?.id == id);

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
        await deleteWishList(id).unwrap(); // unwrap to handle promise rejection

        notifySuccess("Removed from wishlist!");
      } else {
        await addToWishList(id).unwrap(); // unwrap to handle promise rejection

        notifySuccess("Added to wishlist!");
      }
    } catch (error) {
      if (isErrorAddWishList || isErrorDeleteWishList) {
        const errorMessage =
          addWishListError?.data?.message ||
          deleteWishListError?.data?.message ||
          "An error occurred";
        notifyError(errorMessage);
      } else {
        notifyError(error || "An error occurred");
      }
    }
  };
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          HandleMessageIsAuth(handleTargetWishlist);
        }}
        className={styles["heart-button"]}
      >
        <img
          alt="heart-icon"
          src={wished ? fHeart : eHeart}
          className={styles["heart-icon"]}
          width="30px"
          height="30px"
        />
      </button>
    </>
  );
}
