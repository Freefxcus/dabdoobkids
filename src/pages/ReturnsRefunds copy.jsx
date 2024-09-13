import React from 'react';
import { Box, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box className="padding-container"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      mt: "50px",
      mb: "80px",
      minHeight: "80vh",
    }}>
      <Typography variant="h4" gutterBottom   sx={{ fontSize: "2rem", textAlign: "center", color: "var(--brown)" }}>
        PRIVACY POLICY
      </Typography>

      <Typography paragraph>
        Dabdoob Kidz is strongly committed to respecting the privacy of all persons using our websites and mobile applications ("The Web Sites/Apps") and the protection of any personally identifiable information which we may collect on our Websites/Apps and/or use as part of our data collection process and/or which you may choose to share with us in our stores or via telephone, email, or otherwise (“The Other Channels”).
      </Typography>

      <Typography paragraph>
        Such personal information will be collected and/or used in accordance with the terms and conditions of this Privacy Policy, which is part of and incorporated into the terms of use of the website.
      </Typography>

      <Typography variant="h6" gutterBottom   sx={{  color: "var(--brown)" }}>
        Your Express Consent to Collection and Use of Information
      </Typography>

      <Typography paragraph>
        Dabdoob Kidz reserves the right to collect such personally identifiable information as name, address, telephone number, e-mail address, etc., as well as demographic, transactional, and profile data such as IP address, internet domain or browser, referrer or user agent information or other relevant information that we use as part of our data collection process. 
        We hold all such personal information on secure servers and treat it as fully confidential.
      </Typography>

      <Typography paragraph>
        By choosing to access our Web Sites/Apps and/or communicating with us through the Other Channels, you are indicating your express consent and agreement to the collection, transfer, processing, use and storage in accordance with this Privacy Policy of any personal information which may be obtained from you as a result.
      </Typography>

      <Typography paragraph>
        If you do not agree with any of the terms and conditions set forth in the Privacy Policy, or have any questions, please contact us directly at Webmaster@dabdoobkidz.com, and we will be pleased to assist you with your concerns.
      </Typography>

      <Typography paragraph>
        By accessing or using the Web Sites/Apps and/or communicating with us through the Other Channels, you grant Dabdoob Kidz a non-exclusive, worldwide, royalty-free perpetual license to use your personal information for the purposes set forth herein.
      </Typography>

      <Typography variant="h6" gutterBottom   sx={{  color: "var(--brown)" }}>
        We Will Not Sell Your Personal Information
      </Typography>

      <Typography paragraph>
        We will not sell your personal information to third parties. We may, however, share selected customer information with the following third parties:
      </Typography>

      <ul>
        <li>Our group companies</li>
        <li>Our franchisors</li>
        <li>Payment service providers, warehousing service providers, and delivery companies</li>
        <li>Concessions and cosmetics partners for product delivery and services</li>
        <li>Purchasers and advisors in case of business sale</li>
        <li>Third-party databases to which Dabdoob Kidz subscribes</li>
        <li>Government bodies if required by law</li>
        <li>Agencies for site traffic and sales statistics</li>
      </ul>

      <Typography variant="h6" gutterBottom  sx={{  color: "var(--brown)" }}>
        Data Retention
      </Typography>

      <Typography paragraph>
        We will retain your personal information for as long as it is legally required and to support the business purposes for which it was obtained. We will then dispose of it promptly and securely.
      </Typography>

      <Typography variant="h6" gutterBottom  sx={{  color: "var(--brown)" }}>
        Social Media Data Collection
      </Typography>

      <Typography paragraph>
        When using the social media login on our websites and mobile apps, we capture the following details:
      </Typography>

      <ul>
        <li>First Name & Last Name</li>
        <li>Profile Picture (not stored on our servers)</li>
        <li>Email Address (for profile and promotional campaigns)</li>
        <li>Facebook/Google ID for login identification</li>
      </ul>

      <Typography paragraph>
        If a customer wishes to delete these details, they can reach out to our customer care team, and the request will be processed within 24 hours.
      </Typography>

      <Typography variant="h6" gutterBottom  sx={{  color: "var(--brown)" }}>
        Cookies
      </Typography>

      <Typography paragraph>
        As part of our normal data collection process, our website may deposit "cookies" on your device to identify you and enhance your browsing experience. We use two types of cookies:
      </Typography>

      <ul>
        <li><strong>Session Cookies</strong>: Used to carry information from one page to another without re-entering information and access stored info when logged in.</li>
        <li><strong>Persistent Cookies</strong>: Used to offer tailored content by remembering your previous visits and preferences.</li>
      </ul>

      <Typography paragraph>
        Third parties are not able to identify customers using cookies. By using our websites, you agree to the placing of cookies on your device.
      </Typography>

      <Typography variant="h6" gutterBottom  sx={{  color: "var(--brown)" }}>
        Protection of Personal Information
      </Typography>

      <Typography paragraph>
        We store all personal information on a secure server and use procedures designed to protect personal information from accidental or unauthorized access, destruction, use, modification, or disclosure.
      </Typography>

      <Typography paragraph>
        Thank you for choosing Dabdoob Kidz.
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;
