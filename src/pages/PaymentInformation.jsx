import React from 'react';
import { Box, Typography } from '@mui/material';

const PaymentInformation = () => {
  return (
    <Box className="padding-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        mt: "50px",
        mb: "80px",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem", textAlign: "center", color: "var(--brown)" }}>
        PAYMENT INFORMATION
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: "var(--brown)" }}>
        Payment
      </Typography>
      <Typography paragraph>
        By placing an order, you authorize us or our third-party payment processor to process your credit/debit card details for the amount of your order.
      </Typography>
      <Typography paragraph>
        We accept payment by:
      </Typography>
      <ul>
        <li>Credit/Debit Card</li>
        <li>Via your wallet</li>
        <li>Cash on Delivery (A deposit of 30% of the order amount is required, and you will be contacted via WhatsApp by one of our operators)</li>
      </ul>

      <Typography variant="h6" gutterBottom sx={{ color: "var(--brown)" }}>
        Your Order
      </Typography>
      <Typography paragraph>
        By placing an order for products through our website, you are confirming that you intend to enter into a contract with us for the purchase of those products. You place the order by clicking the ‘Confirm Order’ button at the end of the checkout process.
      </Typography>
      <Typography paragraph>
        During the checkout process, you will be asked to complete your payment details. All fields indicated as compulsory must be completed, including providing a valid phone number and email address. We will then send you an email confirming receipt of your order along with delivery costs, if applicable.
      </Typography>
      <Typography paragraph>
        We reserve the right to change product prices from time to time, particularly when applying promotions or if the products are incorrectly priced. If the actual price is higher than at the time of ordering, we will contact you for instructions before accepting your order.
      </Typography>
      <Typography paragraph>
        If we cannot supply the products for any reason, we will inform you and process a refund on the card used for the purchase as soon as possible.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: "var(--brown)" }}>
        Promotional Offers
      </Typography>
      <Typography paragraph>
        From time to time, we may make promotional offers available on the website. Such offers may be time-limited and may not qualify if not fully processed by you within the stated time. Offers may not be combined with other promotions unless otherwise specified.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: "var(--brown)" }}>
        Authorized Card Holder
      </Typography>
      <Typography paragraph>
        By using a credit or debit card, you confirm that the card being used is yours or that you are authorized to use it. All credit/debit cardholders are subject to validation checks and authorization by the card issuer.
      </Typography>
      <Typography paragraph>
        If the issuer of your payment card refuses to authorize payment, we are not liable for any delay or non-delivery.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: "var(--brown)" }}>
        Online Order Cancellations
      </Typography>
      <Typography paragraph>
        If you wish to cancel your order, you may do so by calling our customer services department during working hours (12 p.m. to 9 p.m.) within 1 hour of the final confirmation.
      </Typography>
      <Typography paragraph>
        Refunds will be done only through the original mode of payment. For more details, please visit our Returns & Refunds page.
      </Typography>

      <Typography paragraph>
        Thank you for choosing us.
      </Typography>
    </Box>
  );
};

export default PaymentInformation;
