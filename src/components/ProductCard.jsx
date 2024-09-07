import React from "react";
import styles from "../styles/components/ClothesCard.module.css";
import lady from "../images/lady.png";
import hot from "../images/hot.svg";
import eHeart from "../images/empty-heart.svg";
import fHeart from "../images/filled-heart.svg";
import { addToWishlist, removeFromWishlist } from "../utils/apiCalls.js";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess, truncateText } from "../utils/general.js";
import HandleMessageIsAuth from "../utils/message/index.js";
import {
  useAddToWishListMutation,
  useDeleteWishListMutation,
  useGetAllWishListQuery,
} from "../Redux/wishlistApi.jsx";
export default function Productcard({ item, setChanged }) {

  const dispatch = useDispatch();
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
    <div
      className={styles.container}
      onClick={() => {
        navigate(`/details/${item?.id}`);
      }}
    >
      <div className={styles["card-top"]}>
        {/* <img src={lady} width="100%" height="380px" /> */}
        <img
          src={
            item.images?.[0] || "https://i.postimg.cc/HnNLbVGh/placeholder.png"
          }
          alt="product"
          style={{ height: "356px", width: "100%", objectFit: "cover" }}
        />
        <div
          className={styles["heart-container"]}
          onClick={(e) => {
            e.stopPropagation();
            HandleMessageIsAuth(handleTargetWishlist);
          }}
        >
          <img src={wished ? fHeart : eHeart} width="25px" alt="heart" />
        </div>
        {item?.extraInfo?.new && (
          <div className={styles["hot-container"]}>
            <div>New</div>
            <img src={hot} width="14px" alt="second heart" />
          </div>
        )}
        {item?.extraInfo?.sold && (
          <div className={styles["sold-container"]}>
            <div>Sold Out</div>
          </div>
        )}
      </div>
      <div className={styles["card-bottom"]}>
        <div style={{ fontWeight: "600" }}>{item?.name}</div>
        <div>{truncateText(item.description?.en || item.description, 20)}</div>
        <div style={{ fontWeight: "bold" }}>EGP{item?.price}</div>
      </div>
    </div>
  );
}
