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
import { truncateText } from "../utils/general.js";
export default function Productcard({ item , setChanged }) {
  console.log(item,"item12312312");
  const wishlist = useSelector((state) => state.wishlist.value);
  const wished = wishlist.includes(item?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          style={{height: "356px" , width: "100%" , objectFit: "cover"}}

        />
        <div
          className={styles["heart-container"]}
          onClick={ async(e) => {
            e.stopPropagation();
            if (wished) {
              dispatch(wishlistActions.remove(item?.id));
             await removeFromWishlist(item?.id);
              setChanged(prev=>!prev);
            } else {
              dispatch(wishlistActions.add(item?.id));
             await addToWishlist(item?.id);
               
            }
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
        <div style={{ fontWeight: "600" }}>
          {item?.brand?.name }
        </div>
        <div>{truncateText(item.description?.en || item.description, 50)}</div>
        <div style={{ fontWeight: "bold" }}>${item?.price}</div>
      </div>
    </div>
  );
}
