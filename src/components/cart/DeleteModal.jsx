import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HandleMessageIsAuth from "../../utils/message";
import { useDeleteFromCartMutation } from "../../Redux/cartApi";
import { notifyError, notifySuccess } from "../../utils/general";
import { cartActions } from "../../Redux/store";

export default function DeleteModal({
  open,
  setOpen,
  ProductId,
  id,
  variantId,
}) {
  const isAuth = localStorage.getItem("access_token");

  const dispatch = useDispatch();

  const [
    deleteFromCart,
    {
      isLoading: wishListDeleteLoad,
      isSuccess: isSuccessDeleteWishList,
      isError: isErrorDeleteWishList,
      error: deleteWishListError, // Capture the error object
    },
  ] = useDeleteFromCartMutation();

  const handleDeleteFromCart = async () => {
    try {
      const response = await deleteFromCart(id).unwrap();
      const message = `Deleted Item to cart!`;
      notifySuccess(message);
      setOpen(false);
    } catch (error) {
      const errorMessage = "Failed to Deleted to cart";
      notifyError(errorMessage);
    }
  };
  return (
    <Modal open={open}>
      <Box sx={style}>
        <img src="/delete-product.svg" alt="delete" />
        <h2 style={{ textAlign: "center" }}>Remove Product From Cart</h2>
        <div
          style={{
            display: "flex",
            gap: "32px",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <button
            style={{
              backgroundColor: "var(--error)",
              color: "white",
              border: "none",
              padding: "12px 32px",
              fontWeight: "400",
              fontSize: "18px",
              borderRadius: "10px",
              cursor: "pointer",
              flex: "1",
            }}
            onClick={() =>
              isAuth
                ? HandleMessageIsAuth(handleDeleteFromCart)
                : dispatch(cartActions.remove(id))
            }
          >
            Remove
          </button>
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid var(--errie-black)",

              padding: "12px 32px",
              fontWeight: "400",
              fontSize: "18px",
              borderRadius: "10px",
              cursor: "pointer",
              flex: "1",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "10px",

  p: 4,
  "& img": {
    width: { xs: "90%", md: "400px" },
    height: { xs: "250px", md: "320px" },
  },
};
