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

function ModalPaymentLink({
  paymentLink,   // may be undefined/null initially
  open,
  closeModal,
  addressInfo = {},
  paymentAmount = 0,
  orderSummary = [],
  price = {},
}) {
  const { email } = useSelector((state) => state.userInfo.value) || {};

  // ---- Normalize inputs safely ----
 const link =
    paymentLink.link || paymentLink.redirectUrl || "";

  // Prefer orderId; fall back to orderReference / orderReferences if provided
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

  // Map cart items → products payload safely
  const products = useMemo(
    () =>
      (orderSummary || []).map((item) => ({
        productId: item?.product?.id ?? item?.productId ?? item?.id,
        quantity: Number(item?.count ?? item?.quantity ?? 1),
      })),
    [orderSummary]
  );

  const [deleteAllCart] = useDeleteAllCartMutation();

  // Transaction payload (optional, if your backend also creates transactions via webhook you can skip this)
  const transaction = useMemo(
    () => ({
      paymentAmount: Number(paymentAmount) || 0,
      paymentStatus: "success", // intent; real status is verified below
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

  // When modal closes (open === false), verify payment and finalize
  useEffect(() => {
    if (open === false && orderId) {
      (async () => {
        try {
          // 1) Verify payment result
          const verify = await getUserStatusPayment(orderId);
          if (!verify?.isPaid) {
            notifyError("Payment failed or was canceled.");
            closeModal?.({ ok: false });
            return;
          }

          // 2) Optionally create a transaction record
          let transactionId = null;
          try {
            const created = await createTransaction(transaction);
            transactionId =
              created?.data?._id ||
              created?.data?.id ||
              created?._id ||
              created?.id ||
              null;
          } catch {
            // If this fails but verify succeeded, continue to create the order
          }

          // 3) Create order using collected products
          try {
            await createOrders({
              products,
              ...(transactionId ? { transaction: transactionId } : {}),
            });
          } catch (e) {
            // If your webhook already creates orders, this may not be needed.
            // Uncomment to surface a message:
            // notifyError(e?.response?.data?.message || e?.message || "Could not create order.");
          }

          // 4) Cleanup + email (best effort)
          try { await deleteAllCart(); } catch {}
          try { if (email) await orderMail({ email }); } catch {}

          notifySuccess("Payment confirmed. Order created successfully.");
          closeModal?.({ ok: true, orderId });
        } catch (err) {
          notifyError(
            err?.response?.data?.message ||
              err?.message ||
              "Payment verification failed."
          );
          closeModal?.({ ok: false });
        } finally {
          localStorage.removeItem("paymentCheckout");
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, orderId]);

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
          <button
            className={styles.closeButton}
            onClick={() => closeModal?.({ ok: false })}
          >
            X
          </button>

          {/* Only render iframe when we have a link */}
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
