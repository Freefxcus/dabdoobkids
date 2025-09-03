// src/components/checkout/ModalPaymentLink.jsx
import { Backdrop, Fade, Modal } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useDeleteAllCartMutation } from "../../Redux/cartApi";
import { getUserStatusPayment, orderMail } from "../../utils/apiCalls";
import { notifyError, notifySuccess } from "../../utils/general";
import styles from "../../styles/components/ModalPaymentLink.module.css";

export default function ModalPaymentLink({
  paymentLink = {},          // safe default so no destructure crash
  open = false,
  closeModal = () => {},
  addressInfo = {},          // kept for parity; not used here
  paymentAmount = 0,         // kept for parity; not used here
  orderSummary = [],         // kept for parity; not used here
  price = {},                // kept for parity; not used here
}) {
  // Pull email for the "thanks" email after success (best effort)
  const { email } = useSelector((s) => s.userInfo.value) || {};

  // ---- Normalize inputs safely ----
  const link =
    paymentLink?.link ||
    paymentLink?.url ||                 // sometimes backend returns { url }
    paymentLink?.redirectUrl ||
    paymentLink?.redirect_url ||
    "";

  // Prefer one stable identifier to verify with
  const orderId = useMemo(() => {
    const candidate =
      paymentLink?.orderId ??
      paymentLink?.order_id ??
      paymentLink?.orderReference ??
      (Array.isArray(paymentLink?.orderReferences)
        ? paymentLink.orderReferences[0]
        : paymentLink?.orderReferences);
    return candidate == null || candidate === "" ? null : String(candidate);
  }, [paymentLink]);

  const [deleteAllCart] = useDeleteAllCartMutation();

  // Prevent double-running the verify flow if React StrictMode replays effects
  const verifiedRef = useRef(false);

  /**
   * When the modal closes (open -> false) and we have an orderId,
   * verify the payment once. If paid: cleanup cart & email (best effort),
   * then notify parent via closeModal({ ok: true, orderId }).
   */
  useEffect(() => {
    if (open === false && orderId && !verifiedRef.current) {
      verifiedRef.current = true;

      (async () => {
        try {
          const verify = await getUserStatusPayment(orderId);

          if (!verify?.isPaid) {
            notifyError("Payment failed or was canceled.");
            closeModal({ ok: false, orderId });
            return;
          }

          // Best-effort cleanup; ignore failures
          try { await deleteAllCart(); } catch {}
          try { if (email) await orderMail({ email }); } catch {}

          notifySuccess("Payment confirmed. Thank you!");
          closeModal({ ok: true, orderId });
        } catch (err) {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Payment verification failed.";
          notifyError(msg);
          closeModal({ ok: false, orderId });
        } finally {
          localStorage.removeItem("paymentCheckout");
        }
      })();
    }

    // Reset the guard when the modal re-opens for a new attempt
    if (open === true) {
      verifiedRef.current = false;
    }
  }, [open, orderId, email, deleteAllCart, closeModal]);

  return (
    <Modal
      open={!!open}
      onClose={() => closeModal({ ok: false, orderId })}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={!!open}>
        <div className={styles.modalContainer}>
          <button
            className={styles.closeButton}
            onClick={() => closeModal({ ok: false, orderId })}
            aria-label="Close payment"
            type="button"
          >
            ×
          </button>

          {/* Render the Paymob iframe only when we actually have a URL */}
          {link ? (
            <iframe
              src={link}
              title="Paymob Payment"
              className={styles.iframe}
            />
          ) : (
            <div style={{ padding: 16 }}>Preparing payment…</div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
