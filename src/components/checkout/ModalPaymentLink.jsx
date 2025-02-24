import { Backdrop, Fade, Modal } from "@mui/material";
import { useEffect } from "react";
import { useDeleteAllCartMutation } from "../../Redux/cartApi";
import {
  createOrders,
  createTransaction,
  getUserStatusPayment,
  orderMail,
} from "../../utils/apiCalls";
import styles from "../../styles/components/ModalPaymentLink.module.css";
import { notifyError } from "../../utils/general";
import { useSelector } from "react-redux";

function ModalPaymentLink({
  paymentLink = {},
  open,
  closeModal,
  addressInfo = {},
  paymentAmount,
  orderSummary,
  price,
}) {
  const { email } = useSelector((state) => state.userInfo.value) || {};

  const { link, orderId } = paymentLink;

  const products = orderSummary.map((item) => ({
    productId: item.product.id,
    quantity: item.count,
  }));

  const [
    deleteAllCart,
    {
      isLoading: wishListDeleteLoad,
      isSuccess: isSuccessDeleteWishList,
      isError: isErrorDeleteWishList,
      error: deleteWishListError, // Capture the error object
    },
  ] = useDeleteAllCartMutation();

  const transaction = {
    paymentAmount,
    paymentStatus: "success",
    paymentType: "online",
    shippingData: {
      warehouseName: addressInfo.warehouseName || "",
      governate: addressInfo?.governorate?.name?.en || "",
      city: addressInfo?.city?.name?.en || "",
      street: addressInfo.street || "",
      customerName: addressInfo.name || "",
      phoneNumber: addressInfo.phone || "",
      address: addressInfo.address || "",
    },
    shippingFees: +price.shipping,
  };

  useEffect(() => {
    if (open === false && orderId) {
      const paymentCycle = async () => {
        const statusPayment = await getUserStatusPayment(orderId); // status key ?

        if (!statusPayment.isPaid) {
          notifyError("Payment Failed Or Canceled");
          return;
        }

        const transactionCreated = await createTransaction(transaction);

        const transactionId = transactionCreated.data._id;
        if (transactionCreated.status === "success") {
          createOrders({
            products: products,
            transaction: transactionId,
            // status: "pending",
          }).then(() => {
            deleteAllCart();
            orderMail({ email });
          });
        }
      };

      paymentCycle();
    }
  }, [open, orderId]);

  return (
    <Modal
      open={open}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={closeModal}>
            X
          </button>
          <iframe src={link} title="Paymob" className={styles.iframe} />
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalPaymentLink;
