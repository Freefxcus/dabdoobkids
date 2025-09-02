// src/components/checkout/ModalPaymentLink.jsx
import { Backdrop, Fade, Modal } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDeleteAllCartMutation } from "../../Redux/cartApi";
import {
  createOrders,
  createTransaction,
  getUserStatusPayment,
  orderMail,
} from "../../utils/apiCalls";
import styles from "../../styles/components/ModalPaymentLink.module.css";
import { notifyError, notifySuccess } from "../../utils/general";
import { useSelector } from "react-redux";

/**
 * Props:
 * - paymentLink: { link?: string, redirectUrl?: string, orderId?: string }
 * - open: boolean
 * - closeModal: (result?: { ok?: boolean; orderId?: string }) => void
 * - addressInfo: shipping address object (fields used below are optional)
 * - paymentAmount: number
 * - orderSummary: array of cart items
 * - price: { shipping: number }
 */
export default function ModalPaymentLink({
  paymentLink = {},
  open,
  closeModal,
  addressInfo = {},
  paymentAmount = 0,
  orderSummary = [],
  price = {},
}) {
  const { email } = useSelector((state) => state.userInfo.value) || {};

  // Support either shape: { link } or { redirectUrl }
  const { link, orderId, orderRef } = paymentLink;

  // Map cart items → products payload
  const products = useMemo(
    () =>
      (orderSummary || []).map((item) => ({
        productId: item?.product?.id ?? item?.productId ?? item?.id,
        quantity: item?.count ?? item?.quantity ?? 1,
      })),
    [orderSummary]
  );

  const [deleteAllCart] = useDeleteAllCartMutation();

  // Transaction payload to your API
  const transaction = useMemo(
    () => ({
      paymentAmount: Number(paymentAmount) || 0,
      paymentStatus: "success", // client-intent; real status still verified below
      paymentType: "online",
      shippingData: {
        warehouseName: addressInfo?.warehouseName || "",
        governate: addressInfo?.governorate?.name?.en || "",
        city: addressInfo?.city?.name?.en || "",
        street: addressInfo?.street || "",
        customerName: addressInfo?.name || "",
        phoneNumber: addressInfo?.phone || "",
        address: addressInfo?.address || "",
      },
      shippingFees: Number(price?.shipping) || 0,
    }),
    [paymentAmount, addressInfo, price?.shipping]
  );

  /**
   * When the modal closes (open === false), we verify the payment with the backend:
   *  - If not paid → show error only.
   *  - If paid → create transaction, create order, clear cart, send mail, notify, and close with ok=true.
   */
  useEffect(() => {
    if (open === false && (orderId || orderRef)) {
      const run = async () => {
        try {
          const statusPayment = await getUserStatusPayment(orderId || orderRef);

          if (!statusPayment?.isPaid) {
            notifyError("Payment failed or was canceled.");
            closeModal?.({ ok: false });
            return;
          }

          // Create Transaction (optional if webhook already created it; harmless to keep)
          let transactionId = null;
          try {
            const transactionCreated = await createTransaction(transaction);
            transactionId =
              transactionCreated?.data?._id ||
              transactionCreated?.data?.id ||
              transactionCreated?._id ||
              null;
          } catch (_) {
            // If creating a transaction fails but payment succeeded, continue to create the order.
          }

          // Create Order
          const orderPayload = {
            products,
            ...(transactionId ? { transaction: transactionId } : {}),
          };

          await createOrders(orderPayload);

          // Clear cart + send receipt email (best-effort)
          try {
            await deleteAllCart();
          } catch {}
          try {
            if (email) await orderMail({ email });
          } catch {}

          notifySuccess("Payment confirmed. Order created successfully.");
          closeModal?.({ ok: true, orderId });
        } catch (e) {
          notifyError(
            e?.response?.data?.message || e?.message || "Could not finalize your order."
          );
          closeModal?.({ ok: false });
        } finally {
          // Always clean any old session
          localStorage.removeItem("paymentCheckout");
        }
      };

      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, orderId, orderRef]);

  return (
    <Modal
      open={!!open}
      onClose={() => closeModal?.({ ok: false })}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={!!open}>
        <div className={styles.modalContainer}>
          <button className={styles.closeButton} onClick={() => closeModal?.({ ok: false })}>
            X
          </button>

          {link ? (
            <iframe
              src={link}
              title="Paymob"
              className={styles.iframe}
              // You can tweak sandbox / referrerPolicy if Paymob requires:
              // sandbox="allow-scripts allow-forms allow-same-origin"
              // referrerPolicy="origin"
            />
          ) : (
            <div style={{ padding: 24 }}>
              <p style={{ color: "#b00" }}>
                Couldn’t open the payment page. Please try again.
              </p>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
