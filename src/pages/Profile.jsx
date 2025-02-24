import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LogoutCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddressModal from "../components/checkout/AddressModal.jsx";
import Loader from "../components/Loader.jsx";
import OrderList from "../components/orders/OrderList.jsx";
import Popup from "../components/Popup";
import UpdateProfileModal from "../components/profile/UpdateProfile.jsx";
import WalletComponents from "../components/profile/WalletComponents.jsx";
import PromoCard from "../components/PromoCard";
import { userAuthAction, userInfoActions } from "../Redux/store";
import styles from "../styles/pages/Profile.module.css";
import { authorize, deleteAddress, getAddress } from "../utils/apiCalls.js";
import { notifyError, notifySuccess } from "../utils/general";
import instance from "../utils/interceptor.js";
import { faqs } from "./FAQPage.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { step } = useParams();
  const [currentId, setCurrentId] = useState("");
  const [alertType, setAlertType] = useState("");
  const [address, setAddress] = useState({});
  const [forceReload, setForceReload] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [popupType, setPopupType] = useState("");
  const [open, setOpen] = useState(false);
  const [sidebarItem, setSidebarItem] = useState("1");
  const userInfo = useSelector((state) => state.userInfo.value);
  const [alertOpen, setAlertOpen] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [EditAddress, setEditAddress] = useState(null);
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const handleClickOpen = () => {
    setAlertOpen(true);
  };
  const handleClose = () => {
    setAlertOpen(false);
  };
  useEffect(() => {
    if (step) {
      setSidebarItem(step);
    } else {
      navigate("/profile/" + "1");
    }
  }, [step]);
  const handleAgree = () => {
    setAlertOpen(false);
    switch (alertType) {
      case "delete_address":
        deleteAddress(currentId)
          .then((res) => {
            notifySuccess("Address deleted!");
            setForceReload((prev) => !prev);
          })
          .catch((err) => {
            notifyError("Error!");
          });
        break;
    }
  };

  useEffect(() => {
    // This effect runs whenever popupType is updated
    if (popupType) {
      setOpen(true);
    }
  }, [popupType]);

  // Scroll to top
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [currentOrder]);

  //get profile
  useEffect(() => {
    //* profile
    instance
      .get("/profile", {
        // params: { page: 1 },
      })
      .then((response) => {
        dispatch(userInfoActions.update(response.data?.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err === "Unauthorized") {
          authorize(setForceReload);
        }

        //   }
        // });
      });

    //* address
    getAddress()
      .then((res) => {
        // console.log(res.items[0]);
        setAddress(res);
      })
      .catch((err) => {
        console.log(err, "<<<<<<err>>>>>>");
      });
  }, [forceReload]);

  //get orders

  // get wallet

  return (
    <>
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "var(--error)" }}>
          {"Alert!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove the account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#000" }}>
            Disagree
          </Button>
          <Button onClick={handleAgree} sx={{ color: "#000" }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {popupType === "create_address" && (
        <Popup
          open={open}
          setOpen={setOpen}
          type="create_address"
          setPopupType={setPopupType}
          setForceReload={setForceReload}
        />
      )}
      {popupType === "profile" && (
        <Popup
          open={open}
          setOpen={setOpen}
          type="profile"
          setPopupType={setPopupType}
        />
      )}
      {isLoading && (
        <>
          <Loader open={true} />
          <div style={{ height: "500px" }} />
        </>
      )}
      {!isLoading && (
        <div className={`${styles.bg} padding-container`}>
          <div className={styles.row}>
            <div className={styles.header}>Profile</div>
          </div>
          <div className={styles.container}>
            <div className={styles.sidebar}>
              {/* { id: "8", title: "My Promo" }, */}
              {[
                { id: "1", title: "Profile" },
                { id: "2", title: "Wallet" },
                { id: "3", title: "Order List" },
                { id: "4", title: "Returns and Refunds" },
                { id: "5", title: "Term and Condition" },
                { id: "6", title: "Privacy Policy" },
                { id: "7", title: "Help Page" },

                { id: "9", title: "Log out" },
              ].map((item, index) => (
                <div
                  className={
                    sidebarItem === item.id
                      ? styles.sidebar_item_active
                      : styles.sidebar_item
                  }
                  key={index}
                  onClick={() => {
                    if (item?.id === "9") {
                      dispatch(userAuthAction.logout());
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("refresh_token");
                      navigate("/login");
                      return;
                    }
                    setSidebarItem(item?.id);
                    navigate("/profile/" + item?.id);
                  }}
                  style={{
                    color:
                      item?.id === "8" || item?.id === "9"
                        ? "var(--error)"
                        : "initial",
                  }}
                >
                  {item?.title}
                  {item?.id === "9" ? (
                    <LogoutCurve size="24" color="var(--error)" />
                  ) : null}
                </div>
              ))}
            </div>
            {/* "Profile" */}
            <Box
              component={"div"}
              className={styles.container}
              sx={{
                minHeight: "50vh",
                display: "flex",
                flex: 1,
                py: 0,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {sidebarItem === "1" && (
                <>
                  {/* profile details */}
                  <div className={styles.section}>
                    <div className={styles.row}>
                      <div className={styles.sub_header}>Profile Details</div>
                      <button
                        className={styles.brown_btn}
                        onClick={() => {
                          setOpenEditProfile(true);
                        }}
                      >
                        Edit
                      </button>
                      <UpdateProfileModal
                        open={openEditProfile}
                        setOpen={setOpenEditProfile}
                        ProfileData={userInfo}
                        setForceReload={setForceReload}
                      />
                    </div>
                    <div className={styles.v_line}></div>
                    <div className={styles.row_wrap}>
                      <div>
                        <div className={styles.title}>Email Address</div>
                        <div className={styles.body}>{userInfo.email}</div>
                      </div>
                      <div>
                        <div className={styles.title}>Phone Number</div>
                        <div
                          className={styles.body}
                          style={{ textAlign: "center" }}
                        >
                          {userInfo?.phone || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className={styles.title}>Name</div>
                        <div className={styles.body}>
                          {userInfo.firstName} {userInfo.lastName}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* address details */}
                  <div className={styles.section}>
                    <div className={styles.row}>
                      <div className={styles.sub_header}>Address Details</div>
                      <button
                        className={styles.brown_btn}
                        onClick={() => {
                          setOpenAddAddress(true);
                        }}
                      >
                        Add address
                      </button>
                      <AddressModal
                        open={openAddAddress}
                        setOpen={setOpenAddAddress}
                        type="add"
                        setForceReload={setForceReload}
                      />
                    </div>
                    {/* ***** */}

                    {address?.items?.map((address) => (
                      <>
                        <div className={styles.v_line}></div>
                        <div className={styles.title}>{address.name}</div>
                        <div className={styles.body}>{address.address}</div>
                        <div className={styles.row_reverse}>
                          <div
                            onClick={() => {
                              setOpenEditAddress(true);
                              setEditAddress(address);
                            }}
                            className={styles.edit_link}
                          >
                            Edit
                          </div>
                          <div
                            className={styles.delete_link}
                            onClick={() => {
                              handleClickOpen();
                              setAlertType("delete_address");
                              setCurrentId(address.id);
                            }}
                          >
                            Delete
                          </div>
                        </div>
                      </>
                    ))}
                    {EditAddress && openEditAddress ? (
                      <AddressModal
                        open={openEditAddress}
                        setOpen={setOpenEditAddress}
                        type="edit"
                        addressInfo={EditAddress}
                        setForceReload={setForceReload}
                      />
                    ) : null}
                    {/* ***** */}
                    {/* <div className={styles.v_line}></div>
                  <div className={styles.title}>Office</div>
                  <div className={styles.body}>
                    Ngringin, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah
                    Istimewa Yogyakarta 55281
                  </div>
                  <div className={styles.row_reverse}>
                    <div className={styles.edit_link}>Edit</div>
                    <div className={styles.delete_link}>Delete</div>
                  </div> */}
                  </div>
                </>
              )}
              {sidebarItem === "2" && <WalletComponents />}
              {sidebarItem === "3" && <OrderList />}
              {sidebarItem === "4" && (
                <div className={styles.text_container}>
                  <Box className={styles.sub_header}> RETURNS & REFUNDS</Box>

                  {[
                    `Our Dear Client You Can Exchange Or Return The Purchased Product\\s Only In  Case Of A Faulty,damaged Or Incorrectly Supplied Products As Soon As Possible In The Same Condition As Supplied.
You Have 48 Hours To Return Products In The Same Condition As Supplied, In Their Original Packaging.`,
                    {
                      text: "• The Returns Process Takes Simple Steps:",
                    },
                    `1. Contact Us Via Email Address Or Any Social Media Account.
2. Provide Us With Information About The Returned Item/S Including Pictures And The Returning Reason/S.
3. Once The Request Is Applied Our Team Will Evaluate The Request.
4. If The Request Is Approved We Will Send You A Carrier To Pick Up The Item/S.
5. Once We Receive The Returned Item And Evaluate It's Condition We'll Do One Of The Following:
- If The Item Is Faulted The Items Value Will Be Charged Into Your Provided Transfer Account As Soon As Possible If Not Available Any Online Payment Method You Will Get Your Cash Back By The Shipping Company’s Carrier.
- If The Item Is Not Suitable For Refund It Will Be Delivered Back To You (Redelivery Fees Applied)`,
                    {
                      text: "How Long Does The Return Process Take?",
                    },
                    "Once You’ve Submitted An Online Return Request, The Process Is Conducted In 3 Simple Steps.",
                    `Pick-up: Up To 2-5 Working Days To Arrange And Pick Up The Item(s) You’d Like To Return.
Process: Up To 2-5 Working Days To Perform A Quality Check And Issue The Refund.
Refund: The Amount Will Be Added To Your Provided Account If Not Available Any Online Payment Method You Will Get Your Cash Back By The Shipping Company’s Carrier.`,
                    {
                      text: "What Else Do I Need To Know?",
                    },
                    `An Online Return Can Only Be Requested By A Registered User.
A Registered User Can Only Raise One Return Request At A Time Per Order.
Guest Users Cannot Place An Online Return Request But Can Always Register Or Create An Account Using The Same Email Address To Do So.
If You Change Your Mind, You Can Cancel Your Online Return Request Before The Carrier Is Out For Collecting.
You’ll Have 48 Hours From The Delivery Date Of Your Order To Return Your Purchased Item(s).If You Purchased The Order Through Our Social Media Platforms Not The Website The Same Rules Applies.
Please Note That The Duration Is In Accordance To The Relevant Applicable Laws In Your Country, And In Case Of Offers, Special Conditions Are To Be Applied.`,
                    {
                      text: "Cancellation",
                    },
                    "If You Wish To Cancel Your Order, You May Do So By Calling Our Customer Services During Working Hours And Within 24h Hour Of Placing It And 1 Hour Of The Final Confirmation.",
                    "If You Paid By Credit Card Or Debit Card, Or Transferred A Deposit (Might Be Required) And You Have Cancelled In Accordance With This Clause Then We Will Reverse The Authorisation Or Process A Refund Transaction (As The Case May Be) As Soon As Possible But We Are Not Responsible For How Long This Will Take To Be Reflected On Your Account As This Is Dependent On Bank Processing Procedures.",
                    "Please Note That We Cannot Accept Cancellations Outside Of The Specified Periods As The Order Will Have Been Processed If So The Deposit Can't Be Refunded And Can Only Then Be Cancelled Through Our Returns/Refunds Process As Mentioned Above.",
                    "Refunds Will Be Done Only Through The Original Mode Of Payment.",
                  ].map((item, index) => (
                    <div
                      style={{
                        color: item.text ? "var(--brown)" : "#000",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item.text ? item.text : item}
                    </div>
                  ))}
                </div>
              )}
              {sidebarItem === "5" && (
                <div className={styles.text_container}>
                  <div className={styles.sub_header}>Term and Condition</div>

                  {[
                    "We May Modify the Terms of This User Agreement From Time to Time: We reserve the right to change the terms of this User Agreement or to modify any features of our Service at any time without notice to you and, by continuing to use our Service, you agree to be bound by such changes. Any changes to this User Agreement shall become a part of this User Agreement and shall apply as soon as they are posted. The most current version of the User Agreement can be viewed at any time at: kasual.id. Unless explicitly stated otherwise, any new features or functionality that augment or enhance our Service shall be subject to this User Agreement.",
                    "We May Terminate the Service or Your Use of the Service: We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, our Service (or any part thereof) with or without notice. You agree that we shall not be liable to you or any third party for any modification, suspension or discontinuance of our Service. Further, we may, in our sole discretion, terminate or suspend your access to and use of our Service (or any part thereof) at any time for any reason (including, without limitation, if we believe that you have violated or acted inconsistently with the terms of the following paragraph) or no reason whatsoever.",
                    "In Using Our Service You Agree to Comply with Certain Basic Rules: To the extent required you agree to provide true, accurate, current and complete information about yourself as prompted by any subscription form and/or any registration form. If any information provided by you is untrue, inaccurate, not current or incomplete, we reserve the right to terminate your subscription and refuse any and all current or future use of our Service in our sole discretion. When you register with us, you accept responsibility for all activities that occur under your account or password and you agree you will not sell, transfer or assign your membership or any membership rights.",
                    "As part of your subscription, you agree to not use our Service to:",
                  ].map((item, index) => (
                    <div>{item}</div>
                  ))}
                  <ul>
                    {[
                      "Apload, post, publish, email, reproduce, distribute or otherwise transmit any information, data, text, music, sound, photographs, graphics, video, messages or other materials that are unlawful, harmful, threatening, embarrassing, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, deceptive, fraudulent, contain explicit or graphic descriptions or accounts of sexual acts, invasive of another’s privacy, or hateful;“stalk” another;",
                      "Upload, post, publish, email, reproduce, distribute or otherwise transmit any content that victimizes, harasses, degrades, or intimidates an individual or group of individuals on the basis of religion, gender, sexual orientation, race, ethnicity, age, or disability;",
                      "Harm minors in any way;",
                      "Impersonate any person or entity, including, but not limited to, a KASUAL officer or other employee, or falsely state or otherwise misrepresent your affiliation with a person or entity;",
                      "Forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted to or through our Service;",
                      "Upload, post, publish, email, reproduce, distribute or otherwise transmit any unsolicited or unauthorized advertising, promotional materials, “junk mail,” “Spam,” “chain letters,” “pyramid schemes,” or any other form of solicitation;",
                      "Upload, post, publish, email, reproduce, distribute or otherwise transmit any material that contains software viruses, Trojan horses, worms, time bombs, cancelbots, or any other computer code, files or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment or any other similarly destructive activity, or surreptitiously intercept or expropriate any system, data or personal information;",
                      "Act in a manner that negatively affects other users’ ability to use our Service;",
                      "Interfere with or disrupt our Service or servers or networks connected to our Service, or disobey any requirements, procedures, policies or regulations of networks connected to our Service; or",
                      "Intentionally or unintentionally violate any applicable local, state, national or international law.",
                    ].map((item, index) => (
                      <li
                        style={{
                          listStylePosition: "inside",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sidebarItem === "6" && (
                <div className={styles.text_container}>
                  <div className={styles.sub_header}>Privacy Policy</div>

                  {[
                    'E-commerce Is Strongly Committed To Respecting The Privacy Of All Persons Using Our Websites And Mobile Applications ("The Web Sites/Apps") And The Protection Of Any Personally Identifiable Information Which We May Collect On Our Websites/Apps And/ Or Use As Part Of Our Data Collection Process And/ Or Which You May Choose To Share With Us In Our Stores Or Via Telephone, Email Or Otherwise (“The Other Channels”). Such Personal Information Will Be Collected And/ Or Used In Accordance With The Terms And Conditions Of This Privacy Policy, Which Is Part Of And Incorporated Into The Terms Of Use Of The Web Site.',
                    {
                      text: "Your Express Consent To Collection And Use Of Information.",
                    },
                    'E-commerce Reserves The Right To Collect Such Personally Identifiable Information As Name, Address, Telephone Number, E-mail Address, Etc., As Well As Demographic, Transactional And Profile Data Such As IP Address, Internet Domain Or Browser, Referrer Or User Agent Information Or Other Relevant Information That We Use As Part Of Our Data Collection Process On The Web Sites/Apps Or Via The Other Channels, Such As The Use Of Cookies Or Certain Other Information You May Provide To Us, Etc. ("Personal Information") As Set Forth In This Privacy Policy. We Hold All Such Personal Information On Secure Servers And Treat It As Fully Confidential.',
                    "By Choosing To Access Our Web Sites/Apps And/Or Communicating With Us Through The Other Channels, You Are Indicating Your Express Consent And Agreement To The Collection, Transfer, Processing, Use And Storage In Accordance With This Privacy Policy Of Any Personal Information Which May Be Obtained From You As A Result. If You Do Not Agree With Any Of The Terms And Conditions Set Forth In The Privacy Policy, Or Have Any Questions, Please Contact Us Directly At Webmaster@E-commerce.Com, And We Will Be Pleased To Assist You With Your Concerns. By Accessing Or Using The Web Sites/Apps And/Or Communicating With Us Through The Other Channels, You Grant E-commerce A Non-exclusive, Worldwide, Royalty-free Perpetual License To Use Your Personal Information For The Purposes Set Forth Herein.",
                    "We Will Not Sell Your Personal Information To Third Parties. We May, However, Share Selected Customer Information With The Following Third Parties:",
                    `- Our Group Companies;
- Our Franchisors;
- Companies Such As Payment Service Providers, Warehousing Service Providers And Delivery Companies For The Purposes Of Processing Your Payment And Managing Your Order, Including Delivery And Returns;
- Concessions And Cosmetics Partners Who Are Responsible For Delivering Their Products Directly To You Or Providing Services, Such As Makeovers, In Our Stores;
- Purchasers And Their Advisors Following A Sale Of All Or Part Of Our Business, So That They Can Continue To Provide Services To You;
- Third Party Databases To Which E-commerce And/Or One Of Our Brands Subscribes;
- Government Bodies Or Other Authorities If Necessary To Comply With Regulations Or Law Or To Assist With Law Enforcement, Or To Protect Our Property And Other Rights;
- Agencies Who Help Us Collate Statistics About Site Traffic, Sales, Demographics And Other Commercial Information To Enable Us To Tailor The Services We Provide To You And Other Customers.`,
                    "We Will Retain Your Personal Information For As Long As It Is Legally Required, And To Support The Business Purposes For Which It Was Obtained - We Will Then Dispose Of It Promptly And Securely.",
                    "Depending On Your Country Of Residence, We May Transfer Your Personal Information Both Inside And Outside The European Economic Area. When We Transfer Your Personal Information, We Ensure A Similar Degree Of Protection Is Afforded To It By Ensuring We Only Transfer It To Countries That Are Deemed To Provide An Adequate Level Of Protection For Personal Data And Under Contractual Terms That Provide Appropriate Data Protection.",
                    "You Have The Following Rights Which You May Exercise In Relation To The Personal Information We Process About You:",
                    `- To Access A Copy Of Your Personal Information;
- To Require Us To Correct Inaccurate Personal Information;
- To Require Us To Delete Your Personal Information;
- To Restrict Our Use Of Your Personal Information;
- To Object To Our Use Of Your Personal Information.`,
                    "Where You Wish To Exercise Any Of These Rights, You Must First Verify Your Identity To Our Satisfaction.",
                    {
                      text: "Social Media Data Collection.",
                    },
                    "When Using The Social Media Login On Our Websites And Mobile Apps, We Capture The Following Details:",
                    `- First Name & Last Name: We Capture The First & Last Names To Display Them Under The Profile Section.
- Profile Picture: Any Image Used As A Profile Picture Is Not Stored On Our Servers, Will Only Be Used As A Customer Display Picture.
- Email Address: Any Email Address Used Is Captured To Display Under The Profile Section. We Also Use It To Send Through Our Optional Promotional Campaigns And/Or Assisting The Customer In Case Of Any Queries They Might Have With The Websites/Apps.
- Facebook/Google ID: The Social Media ID Is Captured To Only Identify That The User Has Logged Into The Websites/Apps Using Their Respective Login(s). If A Customer Wishes To Delete These Details That We’ve Captured, They Can Reach Out To Our Customer Care Team Here By Submitting A Request Or Through Live Chat Which Will Be Processed Within 24 Hours.`,
                    {
                      text: "Cookies",
                    },
                    'As Part Of Our Normal Data Collection Process On Our Web Sites, The Web Site May Deposit "Cookies" In Your Device In Order To Identify You And/ Or As A Means Of Tracking The Validity Of Sessions As Well As Enhancing Your Browsing Experience. Cookies Are Small Pieces Of Data That A Website Automatically Sends To Your Computer, Tablet Or Mobile Phone While You Are Viewing The Website.',
                    "We Use Two Types Of Cookies On Our Website:",
                    `- “Session” Cookies, Which Are Used To Allow You To:
- Carry Information From One Page Of Our Website To Another Without Having To Re-enter Information; And
- Access Stored Information When You Are Logged In To Your Online Account.
- “Persistent” Cookies, Which Allow Us To Offer You Tailored Content On Our Website By Helping Us To Remember:
- Any Personal Information That You Have Provided On Previous Visits To Our Website;
- The Number Of Visits That You Have Made To Our Website; And
- Your Preferences.`,
                    {
                      text: "THird Parties Are Not Able To Identify Customers Using Cookies.",
                    },
                    "We Also Reserve The Right To Use An Outside Advertising Company To Display Ads On Our Web Sites. These Ads May Also Contain Cookies. While We May Use Cookies In Other Parts Of Our Web Sites, Cookies Received With Banner Ads Or From Other Third-party Sources May Be Collected By Any Such Third-party Companies, And We Do Not Have Direct Access To Or Control Over Such Processes. No Cookies Used By E-commerce Are Stored Permanently On Your Device. All Cookies Are Automatically Removed From Your Device Either When You Close Your Browser Or Your Session Times Out.",
                    "By Using Our Websites, You Agree To The Placing Of Cookies On Your Device. However, If You Do Not Want To Receive A Cookie From Our Website, You May Set Your Browser To Refuse Cookies Or To Notify You When You Receive A Cookie (To Find Out How To Do This, Please Consult Your Browser’s Help Section). If Cookies Aren’t Enabled On Your Device, It May Limit Your Enjoyment Of The Web Site.",
                    {
                      text: "Protection Of Personal Information Against Third-party Access Or Use.",
                    },
                    "We Store All Personal Information On A Secure Server And We Seek To Use Procedures Designed To Protect Personal Information From Accidental Or Unauthorised Access, Destruction, Use, Modification Or Disclosure. We Will Seek To Ensure That Your Personal Information.",
                  ].map((item, index) => (
                    <div
                      style={{
                        color: item.text ? "var(--brown)" : "#000",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item.text ? item.text : item}
                    </div>
                  ))}
                </div>
              )}
              {sidebarItem === "7" && (
                <div
                  className={styles.text_container}
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
              )}

              {sidebarItem === "8" && (
                <div className={styles.cards_container}>
                  {["", "", "", "", ""].map((item, index) => (
                    <PromoCard />
                  ))}
                </div>
              )}
            </Box>
          </div>
        </div>
      )}
    </>
  );
}
