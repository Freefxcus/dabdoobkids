import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export const faqs = [
  {
    question: "WHAT DELIVERY OPTION DO YOU OFFER?",
    answer: `We offer a home delivery option as well as a Click and Collect service for selected stores. Times and cost for deliveries will vary depending on the location. For more information, please see our Delivery Information page.`,
  },
  {
    question:
      "WHAT TIME DOES THE E-commerce CUSTOMER CARE TEAM OPERATE, AND HOW CAN I GET IN CONTACT?",
    answer: `We are open Saturday to Thursday 12 p.m. to 21 p.m. & Friday 12 p.m. to 21 p.m. (including public holidays). You can also contact us using our quick form and our team will get back to you as soon as possible.`,
  },
  {
    question: "CAN I VIEW MY ORDER HISTORY?",
    answer: `You can view your orders at any time using our website. Simply log in to our website and click on 'My Account' at the top of the page, then click on 'View Orders' on the left of the page.`,
  },
  {
    question: "CAN I TRACK MY ORDER ONLINE?",
    answer: `Yes, you will receive a unique tracking number via email once your order is packed. This link will allow you to track your order at any time.`,
  },
  {
    question: "WHEN I PLACE AN ORDER, HOW LONG DOES DELIVERY TAKE?",
    answer: `Your order confirmation email will inform you of the expected lead time for delivery.`,
  },
  {
    question:
      "I’VE RECEIVED MY ORDER, BUT IT’S NOT SUITABLE. HOW DO I RETURN IT?",
    answer: `We will be happy to refund or exchange any items you are not completely satisfied with, as long as they are returned in an unused condition and in their original packaging, within 14 days of receipt of your order with a copy of the invoice.`,
  },
  {
    question:
      "I’VE RECEIVED A DISCOUNT VOUCHER, BUT THE CODE DOESN’T WORK ONLINE, WHY?",
    answer: `Most common reasons for promotion codes not working include being out of date; being applied to products that are not eligible, or the set order limit not being reached. If you’re still having problems, you can contact us using our quick form.`,
  },
  {
    question: "HOW CAN I REMOVE MY DETAILS FROM YOUR MAILING LIST?",
    answer: `Simply login to your account on our website and follow the steps below. Click on 'My Account' link, then 'Communication Preferences' and un-tick the email check box and click 'Save'.`,
  },
  {
    question: "WHY HAS MY ORDER BEEN CANCELLED?",
    answer: `Your order may be cancelled for a number of reasons, including high demand of goods, cancellation request, unsuccessful delivery, or unsuccessful payment.`,
  },
  {
    question:
      "I’VE PLACED AN ORDER ONLINE AND IT LOOKED AS THOUGH IT WAS PROCESSED, YET I HAVEN’T RECEIVED A CONFIRMATION EMAIL. WHY?",
    answer: `If our email address is not in your address book or safe list, it may have been classed as spam mail. It's also worth checking that your email address has been entered correctly.`,
  },
  {
    question: "HOW DO I CHANGE MY DELIVERY ADDRESS?",
    answer: `You may update your address book by logging into 'My Account', then selecting 'Address Book'. Changes made here will not alter the delivery details of orders already placed.`,
  },
  {
    question: "HOW DO I KNOW IF MY ONLINE ORDER HAS BEEN SUCCESSFUL?",
    answer: `When you place an order, we will reply to you with an email confirming your order and all details, including items ordered.`,
  },
  {
    question: "I HAVE FORGOTTEN MY PASSWORD. WHAT SHOULD I DO?",
    answer: `Click 'Sign In / Register' on our website, then 'Forgotten Your Password?' link. Follow the instructions to reset your password.`,
  },
  {
    question: "CAN I CHANGE MY PAYMENT INFORMATION?",
    answer: `Once an order has been placed, we are unable to change your payment information. For future orders, you can update your details in 'My Account'.`,
  },
  {
    question: "WASHING INSTRUCTIONS",
    answer: `Paying attention to how you wash your clothes can prolong their life and minimize environmental impact. Follow the washing instructions on the label and consider eco-friendly practices.`,
  },
];
const FAQ = () => {
  return (
    <Box
      className="padding-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        mt: "50px",
        mb: "80px",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {faqs.map((faq, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "1rem",
              marginBottom: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              padding: "10px 16px",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default FAQ;
