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

export default function ModalPaymentLink(props) {
  // Robust defaults so nothing throws if props are missing
  const {
    paymentLink = {},               // <-- key fix: default to {}
    open = false,
    closeModal = () => {},
    addressInfo = {},
    paymentAmount = 0,
    orderSummary = [],
    price = {},
  } = props || {};

  const { email } = useSelector((state) => state.userInfo.value) || {};

  // Normalize fields safely (never read from undefined)
  const link =
    paymentLink?.link ||
    paymentLink?.redirectUrl ||
    paymentLink?.redirect_url ||
    "";

  const orderId = useMemo(() => {
    const candidate =
      paymentLink?.orderId ??
      paymentLink?.order_id ??
      paymentLink?.orderReference ??
      (Array.isArray(paymentLink?.orderReferences)
        ? paymentLink.orderReferences[0]
        : paymentLink?.orderReferences) ??
      null;
    return candidate == null || candidate === "" ? null : String(candidate);
  }, [paymentLink]);

  const products = useMemo(
    () =>
      (orderSummary || []).map((item) => ({
        productId: item?.product?.id ?? item?.productId ?? item?.id,
        quantity: Number(item?.count ?? item?.quantity ?? 1),
      })),
    [orderSummary]
  );

  const [deleteAllCart] = useDeleteAllCartMutation();

  const transaction = useMemo(
    () => ({
      paymentAmount: Number(paymentAmount) || 0,
      paymentStatus: "success",
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

  // On modal close, verify and finalize
  useEffect(() => {
    if (open === false && orderId) {
      (async () => {
        try {
          const verify = await getUserStatusPayment(orderId);
          if (!verify?.isPaid) {
            notifyError("Payment failed or was canceled.");
            closeModal({ ok: false });
            return;
          }

          // Create a transaction record (optional)
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
            /* continue even if this fails */
          }

          // Create the order
          try {
            await createOrders({
              products,
              ...(transactionId ? { transaction: transactionId } : {}),
            });
          } catch {
            /* If your webhook creates orders, this can be optional */
          }

          try { await deleteAllCart(); } catch {}
          try { if (email) await orderMail({ email }); } catch {}

          notifySuccess("Payment confirmed. Order created successfully.");
          closeModal({ ok: true, orderId });
        } catch (err) {
          notifyError(
            err?.response?.data?.message ||
              err?.message ||
              "Payment verification failed."
          );
          closeModal({ ok: false });
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
      onClose={() => closeModal({ ok: false })}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={!!open}>
        <div className={styles.modalContainer}>
          <button
            className={styles.closeButton}
            onClick={() => closeModal({ ok: false })}
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
