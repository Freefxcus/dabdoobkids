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
  paymentLink,      // can be undefined or null initially
  open,
  closeModal,
  addressInfo = {},
  paymentAmount,
  orderSummary,
  price,
}) {
  // ✅ null-safe destructuring
  const { link, orderId, orderRef } = paymentLink ?? {};

  const { email } = useSelector((state) => state.userInfo.value) || {};

  const products = (orderSummary || []).map((item) => ({
    productId: item.product.id,
    quantity: item.count,
  }));

  const [deleteAllCart] = useDeleteAllCartMutation();

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
    shippingFees: Number(price?.shipping || 0),
  };

  // When modal closes, verify payment (support orderId or orderRef)
  useEffect(() => {
    if (open === false && (orderId || orderRef)) {
      (async () => {
        try {
          const ref = orderId || orderRef;
          const statusPayment = await getUserStatusPayment(ref);

          if (!statusPayment?.isPaid) {
            notifyError("Payment Failed Or Canceled");
            return;
          }

          const transactionCreated = await createTransaction(transaction);
          const ok = transactionCreated?.status === "success";
          const transactionId = transactionCreated?.data?._id;

          if (ok && transactionId) {
            await createOrders({
              products,
              transaction: transactionId,
            });
            try {
              await deleteAllCart();
            } catch {}
            if (email) {
              try {
                await orderMail({ email });
              } catch {}
            }
          }

          // report success to parent (will navigate)
          closeModal?.({ ok: true, orderId: ref });
        } catch (err) {
          notifyError(
            err?.response?.data?.message || err?.message || "Payment verification failed."
          );
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, orderId, orderRef]);

  return (
    <Modal
      open={!!open}
      onClose={() => closeModal?.()}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={!!open}>
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={() => closeModal?.()}>
            X
          </button>

          {/* ✅ Only render iframe when we have a link */}
          {link ? (
            <iframe src={link} title="Paymob" className={styles.iframe} />
          ) : (
            <div style={{ padding: 16 }}>Preparing payment…</div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalPaymentLink;
