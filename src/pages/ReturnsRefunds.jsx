import React from "react";
import { Box } from "@mui/material";
import logo from "../images/logo.svg";
export default function ReturnsRefunds() {
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
      {/* <Box component="img" src={logo} sx={{ maxWidth: "100px" }} /> */}
      <Box
        sx={{ fontSize: "2rem", textAlign: "center", color: "var(--brown)" }}
        component={"h1"}
      >
        RETURNS & REFUNDS
      </Box>
      <Box sx={{ fontSize: "1rem", lineHeight: "1.5", pb: "2.5rem", mt: 8 }}>
        Our Dear Client You Can Exchange Or Return The Purchased Product\s Only
        In Case Of A Faulty,damaged Or Incorrectly Supplied Products As Soon As
        Possible In The Same Condition As Supplied. You Have 48 Hours To Return
        Products In The Same Condition As Supplied, In Their Original Packaging.
      </Box>
      <Box sx={{ my: 2 }}>
        <Box
          sx={{ fontSize: "1.5rem", color: "var(--brown)" }}
          component={"h3"}
        >
          • The Returns Process Takes Simple Steps:
        </Box>
        <Box
          sx={{
            fontSize: "1rem",
            lineHeight: "1.5",
            pb: "2.5rem",
            px: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px", "& p":{color:"#1b1b1b", fontSize: "1rem",},
          }}
          type="1"
          component={"ol"}
         
        >
          <li>Contact Us Via Email Address Or Any Social Media Account.</li>
          <li>
            Provide Us With Information About The Returned Item/S Including
            Pictures And The Returning Reason/S.
          </li>
          <li>
            Once The Request Is Applied Our Team Will Evaluate The Request.
          </li>
          <li>
            If The Request Is Approved We Will Send You A Carrier To Pick Up The
            Item/S.
          </li>
          <li>
            Once We Receive The Returned Item And Evaluate It's Condition We'll
            Do One Of The Following:
          </li>
          <p>
            -If The Item Is Faulted The Items Value Will Be Charged Into Your
            Provided Transfer Account As Soon As Possible If Not Available Any
            Online Payment Method You Will Get Your Cash Back By The Shipping
            Company’s Carrier. - If The Item Is Not Suitable For Refund It Will
            Be Delivered Back To You (Redelivery Fees Applied)
          </p>
        </Box>
      </Box>

      <Box sx={{ my: 2 }}>
        <Box
          sx={{ fontSize: "1.5rem", color: "var(--brown)" }}
          component={"h3"}
        >
          • How Long Does The Return Process Take?
        </Box>
        <Box
          sx={{
            fontSize: "1rem",
            px: "2rem",
            lineHeight: "1.5",
            pb: "2.5rem",
            pt: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            "& p":{color:"#1b1b1b", fontSize: "1rem",},
          }}
          
        >
          <p>
            Once You’ve Submitted An Online Return Request, The Process Is
            Conducted In 3 Simple Steps.
          </p>
          <p>
            Pick-up: Up To 2-5 Working Days To Arrange And Pick Up The Item(s)
            You’d Like To Return.
          </p>
          <p>
            Process: Up To 2-5 Working Days To Perform A Quality Check And Issue
            The Refund.
          </p>
          <p>
            Refund: The Amount Will Be Added To Your Provided Account If Not
            Available Any
          </p>
          <p>
            Online Payment Method You Will Get Your Cash Back By The Shipping
            Company’s Carrier.
          </p>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <Box
          sx={{ fontSize: "1.5rem", color: "var(--brown)" }}
          component={"h3"}
        >
          • How Long Does The Re• What Else Do I Need To Know?turn Process Take?
        </Box>
        <Box
          sx={{
            fontSize: "1rem",
            px: "2rem",
            lineHeight: "1.5",
            pb: "2.5rem",
            pt: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            "& p":{color:"#1b1b1b", fontSize: "1rem",},
          }}
          
        >
          <p>
          An Online Return Can Only Be Requested By A Registered User.

          </p>
          <p>
          A Registered User Can Only Raise One Return Request At A Time Per Order.

          </p>
          <p>
          Guest Users Cannot Place An Online Return Request But Can Always Register Or 
          Create An Account Using The Same Email Address To Do So
          </p>
          <p>
          If You Change Your Mind, You Can Cancel Your Online Return Request Before The 
Carrier Is Out For Collecting.
          </p>
          <p>
          You’ll Have 48 Hours From The Delivery Date Of Your Order To Return Your 
Purchased Item(s).If You Purchased The Order Through Our Social Media Platforms 
Not The Website The Same Rules Applies.
          </p>
          <p>
          Please Note That The Duration Is In Accordance To The Relevant Applicable Laws 
          In Your Country, And In Case Of Offers, Special Conditions Are To Be Applied.
          </p>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <Box
          sx={{ fontSize: "1.5rem", color: "var(--brown)" }}
          component={"h3"}
        >
• Cancellation.
</Box>
        <Box
          sx={{
            fontSize: "1rem",
            px: "2rem",
            lineHeight: "1.5",
            pb: "2.5rem",
            pt: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            "& p":{color:"#1b1b1b", fontSize: "1rem",},
          }}
          
        >
          <p>
          If You Wish To Cancel Your Order, You May Do So By Calling Our Customer 
Services During Working Hours And Within 24h Hour Of Placing It And 1 Hour Of 
The Final Confirmation.

          </p>
          <p>
          If You Paid By Credit Card Or Debit Card, Or Transferred A Deposit (Might Be 
Required) And You Have Cancelled In Accordance With This Clause Then We Will 
Reverse The Authorisation Or Process A Refund Transaction (As The Case May Be) 
As Soon As Possible But We Are Not Responsible For How Long This Will Take To 
Be Reflected On Your Account As This Is Dependent On Bank Processing 
Procedures. 
          </p>
    
           <p>
           Refunds Will Be Done Only Through The Original Mode Of Payment.
           </p>
           
           <Box
          sx={{ fontSize: "1.5rem", color: "var(--brown)" }}
          component={"h4"}
        >
Thank You For Choosing Us.
</Box>
              </Box>
      </Box>
    </Box>
  );
}
