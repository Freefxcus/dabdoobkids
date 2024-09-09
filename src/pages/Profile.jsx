import { useState, useEffect } from "react";
import styles from "../styles/pages/Profile.module.css";
import promo from "../images/promo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import trash from "../images/trash.png";
import PromoCard from "../components/PromoCard";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/interceptor.js";
import Popup from "../components/Popup";
import { userInfoActions } from "../Redux/store";
import { notifyError, notifySuccess } from "../utils/general";
import {
  authorize,
  getAddress,
  deleteAddress,
  getWallet,
  getWalletHistory,
  getPromoCode,
} from "../utils/apiCalls.js";
import Loader from "../components/Loader.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import OrderCard from "../components/OrderCard.jsx";
import Box from "@mui/material/Box";
import AddressModal from "../components/checkout/AddressModal.jsx";
import UpdateProfileUpdate from "../components/profile/UpdateProfile.jsx";
import UpdateProfileModal from "../components/profile/UpdateProfile.jsx";
import OrderList from "../components/orders/OrderList.jsx";
import { LogoutCurve } from "iconsax-react";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const [PromoCodes, setPromoCodes] = useState(null);
  const [helpOption, setHelpOption] = useState("1");
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
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [wallet, setWallet] = useState({});
  const [walletHistory, setWalletHistory] = useState({});

  const handleClickOpen = () => {
    setAlertOpen(true);
  };
  const handleClose = () => {
    setAlertOpen(false);
  };
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
  useEffect(() => {
    getWallet().then((res) => {
      setWallet(res);
    });

    getWalletHistory().then((res) => {
      setWalletHistory(res);
    });
    // getPromoCode().then((res) => {
    //   console.log("res1313213213213213213132",res);
    //   setPromoCodes(res);
    // });
  }, []);

  console.log(wallet, "wallet123123132");
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
            <div className={styles.delete_account}>
              <img src={trash} width="20px" />{" "}
              <span
                onClick={() => {
                  handleClickOpen();
                  setAlertType("delete_account");
                }}
              >
                Delete account
              </span>
            </div>
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
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("refresh_token");
                      navigate("/login");
                    }
                    setSidebarItem(item?.id);
                  }}
                  style={{
                    color: item?.id === "8"||item?.id === "9" ? "var(--error)" : "initial",
                  }}
                >
                  {item?.title}
                  {item?.id === "9" ?
                   <LogoutCurve size="24" color="var(--error)" />
                  : null }
                </div>
              ))}
            </div>
            {/* "Profile" */}
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
                      <div className={styles.body}>
                        {userInfo?.phone || "012345678"}
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
                        <AddressModal
                          open={openEditAddress}
                          setOpen={setOpenEditAddress}
                          type="edit"
                          addressInfo={address}
                        />
                      </div>
                    </>
                  ))}

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
            {sidebarItem === "2" && (
              <div
                style={{
                  width: "100%",
                }}
              >
                {false && <Loader open={true} />}
                {false && <div>No Orders Created ...</div>}
                {true && (
                  <Box
                    className={styles.text_container}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                      backgroundColor: "#fff",
                      padding: "20px",
                      borderRadius: "8px",
                      // display: "flex",
                      // flexDirection: "column",
                      // gap: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            color: "#000",
                            fontSize: "24px",
                            fontWeight: "600",
                          }}
                        >
                          wallet  
                        </Box>
                        <Box
                          sx={{
                            color: "#AD6B46",
                            fontSize: "36px",
                            fontWeight: "700",
                          }}
                        >
                          {wallet ? wallet.balance : 0} EGP
                        </Box>
                      </Box>
                      <button
                        className={styles.brown_btn}
                        onClick={() => {
                          // setPopupType("profile");
                        }}
                      >
                        Withdraw
                      </button>
                    </Box>
                    {walletHistory.items.length > 0 ? (
                      <table className={styles.my_table}>
                        <tr>
                          <th>Created</th>
                          <th>Type</th>
                          <th>Details</th>
                          <th>Amount</th>
                          <th>Balance</th>
                        </tr>
                        {walletHistory.items.map((item, index) => (
                          <tr>
                            <td>10 Feb 2024</td>
                            <td>Order Fee</td>
                            <td>Process credits against NEGG20093079663.</td>
                            <td
                              style={{
                                color: index === 2 ? "#F04438" : "#32D583",
                              }}
                            >
                              - EGP 7000
                            </td>
                            <td>EGP 500</td>
                          </tr>
                        ))}
                      </table>
                    ) : (
                      <h1>No Wallet History</h1>
                    )}
                  </Box>
                )}
              </div>
            )}
            {sidebarItem === "3" && <OrderList    />}
            {sidebarItem === "4" && (
              <div className={styles.text_container}>
                <div className={styles.sub_header}>Returns and refunds</div>

                {[
                  "Our Dear Client You Can Exchange Or Return The Purchased Products Only In Case Of A Faulty,damaged Or Incorrectly Supplied Products As Soon As Possible In The Same Condition As Supplied.",
                  "You Have 48 Hours To Return Products In The Same Condition As Supplied, In Their Original Packaging.",
                  {
                    text: "The Returns Process Takes Simple Steps:",
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
                  'Dabdoob Kidz Is Strongly Committed To Respecting The Privacy Of All Persons Using Our Websites And Mobile Applications ("The Web Sites/Apps") And The Protection Of Any Personally Identifiable Information Which We May Collect On Our Websites/Apps And/ Or Use As Part Of Our Data Collection Process And/ Or Which You May Choose To Share With Us In Our Stores Or Via Telephone, Email Or Otherwise (“The Other Channels”). Such Personal Information Will Be Collected And/ Or Used In Accordance With The Terms And Conditions Of This Privacy Policy, Which Is Part Of And Incorporated Into The Terms Of Use Of The Web Site.',
                  {
                    text: "Your Express Consent To Collection And Use Of Information.",
                  },
                  'Dabdoob Kidz Reserves The Right To Collect Such Personally Identifiable Information As Name, Address, Telephone Number, E-mail Address, Etc., As Well As Demographic, Transactional And Profile Data Such As IP Address, Internet Domain Or Browser, Referrer Or User Agent Information Or Other Relevant Information That We Use As Part Of Our Data Collection Process On The Web Sites/Apps Or Via The Other Channels, Such As The Use Of Cookies Or Certain Other Information You May Provide To Us, Etc. ("Personal Information") As Set Forth In This Privacy Policy. We Hold All Such Personal Information On Secure Servers And Treat It As Fully Confidential.',
                  "By Choosing To Access Our Web Sites/Apps And/Or Communicating With Us Through The Other Channels, You Are Indicating Your Express Consent And Agreement To The Collection, Transfer, Processing, Use And Storage In Accordance With This Privacy Policy Of Any Personal Information Which May Be Obtained From You As A Result. If You Do Not Agree With Any Of The Terms And Conditions Set Forth In The Privacy Policy, Or Have Any Questions, Please Contact Us Directly At Webmaster@dabdoobkidz.Com, And We Will Be Pleased To Assist You With Your Concerns. By Accessing Or Using The Web Sites/Apps And/Or Communicating With Us Through The Other Channels, You Grant Dabdoob Kidz A Non-exclusive, Worldwide, Royalty-free Perpetual License To Use Your Personal Information For The Purposes Set Forth Herein.",
                  "We Will Not Sell Your Personal Information To Third Parties. We May, However, Share Selected Customer Information With The Following Third Parties:",
                  `- Our Group Companies;
- Our Franchisors;
- Companies Such As Payment Service Providers, Warehousing Service Providers And Delivery Companies For The Purposes Of Processing Your Payment And Managing Your Order, Including Delivery And Returns;
- Concessions And Cosmetics Partners Who Are Responsible For Delivering Their Products Directly To You Or Providing Services, Such As Makeovers, In Our Stores;
- Purchasers And Their Advisors Following A Sale Of All Or Part Of Our Business, So That They Can Continue To Provide Services To You;
- Third Party Databases To Which Dabdoob Kidz And/Or One Of Our Brands Subscribes;
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
                  "We Also Reserve The Right To Use An Outside Advertising Company To Display Ads On Our Web Sites. These Ads May Also Contain Cookies. While We May Use Cookies In Other Parts Of Our Web Sites, Cookies Received With Banner Ads Or From Other Third-party Sources May Be Collected By Any Such Third-party Companies, And We Do Not Have Direct Access To Or Control Over Such Processes. No Cookies Used By Dabdoob Kidz Are Stored Permanently On Your Device. All Cookies Are Automatically Removed From Your Device Either When You Close Your Browser Or Your Session Times Out.",
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
                }}
              >
                {helpOption === "1" && (
                  <>
                    <div
                      className={styles.sub_header}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setHelpOption("3");
                      }}
                    >
                      <img src="./back.png" height="25px" />
                      <div>Refund Order</div>
                    </div>
                    <ol>
                      {[
                        "Confirm the reason for returning, if you experience problems with the product you purchased, please confirm with the Customer Service Team from Erigo via chat on the Official Erigo Product Sales Account available on the marketplace you used when purchasing the product.",
                        "The Team Contacts You After you confirm, the team will immediately contact you via telephone / Whatsapp via the telephone number listed in your order details to ensure that the return requirements for the product you confirmed are complete, such as product tags that are still hanging and products that have not been used / washed. then will provide the exchange / return procedure.",
                        "Attach Return Label Next, prepare your package to send back to us. Make sure the Product, the product tag that is still hanging and the return procedure form you attach to the package.",
                        "Attach Return Label Next, prepare your package to send back to us. Add your items and securely attach your package. Be sure to remove or cover the original shipping label and attach your new return label to the package. You're all set! Simply schedule a pick-up or drop-off at any authorized facility for the courier service designated on your shipping label. Please allow approximately 7 - 14 days for return processing. You will receive a notification from us when your return has been received and is ready to be processed. The last stage, you just have to wait for the notification of the receipt number which will be informed by our team.",
                      ].map((item, index) => (
                        <li
                          style={{
                            listStylePosition: "inside",
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ol>
                    <div className={styles.sub_header}>Shipping</div>
                    <div>
                      We package and ship your order as soon as possible. We
                      will continue to process according to your order. Orders
                      that are processed continue to adjust the order of
                      incoming orders and there may be delays if order traffic
                      is very high. However, we will do everything we can to
                      ensure your order is delivered on time, and Erigo is not
                      responsible for conditions beyond our control such as bad
                      weather, service interruptions, etc. You can check
                      periodically for the delivery status of your order through
                      your order details page found on the marketplace or the
                      official Erigo website page that you used when placing
                      your order.
                    </div>
                  </>
                )}
                {helpOption === "2" && (
                  <>
                    <div
                      className={styles.sub_header}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setHelpOption("1");
                      }}
                    >
                      <img src="./back.png" height="25px" />
                      <div>Payment Information</div>
                    </div>
                    {[
                      {
                        title: "Card",
                        array: [
                          "./cards/a1.svg",
                          "./cards/a2.svg",
                          "./cards/a3.svg",
                        ],
                      },
                      {
                        title: "Virtual Account",
                        array: [
                          "./cards/b1.svg",
                          "./cards/b2.svg",
                          "./cards/b3.svg",
                          "./cards/b4.svg",
                          "./cards/b5.svg",
                          "./cards/b6.svg",
                          "./cards/b7.svg",
                        ],
                      },
                    ].map(({ title, array }) => (
                      <>
                        <div>{title}</div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {array.map((card) => (
                            <img src={card} style={{ width: "50px" }} />
                          ))}
                        </div>
                      </>
                    ))}
                  </>
                )}
                {helpOption === "3" && (
                  <div>
                    <div
                      className={styles.sub_header}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                        marginBottom: "10px",
                      }}
                      onClick={() => {
                        setHelpOption("2");
                      }}
                    >
                      <img src="./back.png" height="25px" />
                      <div>Frequently asked questions</div>
                    </div>
                    {[
                      {
                        title: "WHAT DELIVERY OPTION DO YOU OFFER?",
                        description: `We Offer A Home Delivery Option As Well As A Click And Collect Service For Selected Stores. Times And Cost For Deliveries Will Vary Depending On The Location. For More Information, Please See Our Delivery Information Page.`,
                      },
                      {
                        title:
                          "WHAT TIME DOES THE DABDOOB KIDZ CUSTOMER CARE TEAM OPERATE, AND HOW CAN I GET IN CONTACT?",
                        description: `You Can Contact Our Customer Care Team On The Following Number :`,
                      },
                      {
                        title: "DABDOOB KIDZ CUSTOMER SERVICE:",
                        description: `We Are Open Saturday To Thursday 12 p.m. to 21 p.m. & Friday 12 p.m. to 21 p.m. (Including Public Holidays).
You Can Also Contact Us Using Our Quick Form And Our Team Will Get Back To You As Soon As Possible.`,
                      },
                      {
                        title: "CAN I VIEW MY ORDER HISTORY?",
                        description: `You Can View Your Orders At Any Time Using Our Website. Simply Follow The Steps Below.
Log In To Our Website And Click On 'My Account' At The Top Of The Page.
Click On The Link ‘View Orders’ On The Left Of The Page. This Will Show You Your Order History.`,
                      },
                      {
                        title: "CAN I TRACK MY ORDER ONLINE?",
                        description: `Yes, You Will Receive A Unique Tracking Via Email Once Your Order Is Packed. 
This Link Will Allow You To Track Your Order At Any Time Letting You Know When Your Order Will Be Delivered.`,
                      },
                      {
                        title:
                          "WHEN I PLACE AN ORDER, HOW LONG DOESE DELIVERY TAKE?",
                        description: `Your Order Confirmation Email Will Inform You Of The Expected Lead Time For Delivery. 
Our Courier Company Will Attempt To Call You Should They Not Have Enough Delivery Information To Deliver Your Order. 
Please Visit Our Delivery Information Page For Full Details.`,
                      },
                      {
                        title:
                          "I’VE RECEIVED MY ORDER, BUT IT’S NOT SUITABLE. HOW DO I RETURN IT?",
                        description: `Dabdoob Kidz Is Dedicated To Offering The Highest Levels Of Quality And Service. 
We Will Be Happy To Refund Or Exchange Any Item(s)* That You Are Not Completely Satisfied With, As Long As They Are Returned In An Unused Condition And In Their Original Packaging, Within 14 Days Of Receipt Of Your Order With A Copy Of The Invoice. Please Visit Our Returns And Refunds Page For Full Details.`,
                      },
                      {
                        title:
                          " I’VE RECEIVED A DISCOUNT VOUCHER, BUT THE CODE DOESN’T WORK ONLINE, WHY THIS?",
                        description: `Please Be Aware That Once You’ve Applied The Voucher Code, It Cannot Be Used Again, So Please Do Not Apply It Until You’re Sure That You’re Ready To Place And Pay For Your Order.
Most Common Reasons For Promotion Codes Not Working Are Being Out Of Date; Being Applied To Products That Are Not Eligible Or The Set Order Limit Not Being Reached.
If You’re Still Having Problems, You Can Also Contact Us Using Our Quick Form And We'll Be Happy To Explain How You Can Redeem Your Discount Online.`,
                      },
                      {
                        title:
                          "HOW CAN I REMOVE MY DETAILS FROM YOUR MAILING LIST?",
                        description: `We’re sorry to hear you’re thinking about unsubscribing. Simply login to your 
account on our website and follow the quick steps below.
Click on the 'My Account' link at the top of the website.
Click on the 'Communication Preferences'
Simply un-tick the email check box and click 'Save'.
You will see a message telling you that the subscription has been removed.
If you wish to subscribe to the newsletters again at any time, simply navigate to this section, tick the check box and click 'Save'.
You can also unsubscribe by clicking on the unsubscribe link at the end of any promotional email. On click, you will navigate to the un-subscription page on the website where once you enter the reason for un-subscription and click 'Unsubscribe', you can start a new shopping journey.`,
                      },
                      {
                        title: "WHY HAS MY ORDER BEEN CANCELLED?",
                        description: `Your Order May Be Cancelled For A Number Of Reasons. The Most Common Reasons For This Are: -
High Demand Of Goods – In This Event, You Will Receive An Email Confirming The Cancellation And What To Do Next.
If You Requested A Cancellation. You’ll Receive A Confirmation Email Once This Has Been Done.
]If We’ve Been Unsuccessful In Delivering The Order To Your Chosen Delivery Address.
If Payment Was Not Successful If The Order Was Not Collected From The Selected Store Within The Collection Period Of 14 Days.`,
                      },
                      {
                        title:
                          "I’VE PLACED AN ORDER ONLINE AND IT LOOKED AS THOUGH IT WAS PROCESSED; YET I HAVEN’T RECEIVED A CONFIRMATION EMAIL. WHY?",
                        description: `We’re Sorry That You Haven't Received Your Confirmation Email. If Our Email Address Is Not In Your Address Book Or Safe List, It May Have Been Classed As Spam Mail, Meaning That It Might Not Have Appeared In Your Inbox. It Is Also Worth Checking That Your Email Address Has Been Entered Into Your Account Correctly.
Usually Our Confirmation Emails Are Sent Within A Few Minutes Of An Order Being Placed. However, When Our Site Is Very Busy, You May Have To Wait A Little Bit Longer Before You Receive Your Email.`,
                      },
                      {
                        title: "HOW DO I CHANGE MY DELIVERY ADRESS?",
                        description: `You May Update Your Dabbdob Kidz Address Book By Clicking The 'My Account' Link At The Top Of The Page, Logging In Using Your Username And Password And Selecting 'Address Book' From Where You Can Add, Remove And Amend Your Addresses.
If You Have Already Placed An Order Changes Made In This Area Will Not Alter Their Delivery Details. Once An Order Has Been Placed It Is Often Not Possible For Us To Change The Delivery Address.`,
                      },
                      {
                        title:
                          "HOW DO I KNOW IF MY ONLINE ORDER HAS BEEN SUCCESFUL?",
                        description: `When You Place An Order On Our Website, We Will Reply To You With An Email Confirming Your Order And All Delivery And Billing Address Details, Including All The Items You Have Ordered.
Please Check That All The Information Is Correct On This Confirmation Email As Incorrect Information Can Cause Delays On Your Order.`,
                      },
                      {
                        title:
                          "I HAVE FORGOTTEN MY PASSWORD. WHAT SHOULD I DO?",
                        description: `If You Have An Existing Account With Us And Have Forgotten Your Password, Please Click Here 'Sign In / Register'. Click The 'Forgotten Your Password?' Link. 
We Will Then Send You An Email With Instructions To Reset Your Password.
If You Don't Receive Your Password Reset Email Within 1 Hour, Please Check Your Spam Folder. If The Email Is Not In Your Spam Folder, Please Request Another By Contacting Our Customer Care Team Number:`,
                      },
                      {
                        title: "CAN I CHANGE MY PAYMENT INFORMATION?",
                        description: `Once An Order Has Been Placed, We Are Unable To Change Your Payment Information. By Default, We Do Not Store Any Payment Information On Our Systems.
To Update Or Change Your Personal Information Please Log-in To Dabdoobkidz.Com Using The 'Sign In / Register' Link. If You Are Already Signed In, Please Click The 'My Account' Link At The Top Of The Page. Then Select 'My Details And Contact Preferences'. From This Section You May View And Amend Your Password, Address, Wish List And Contact Details Including Choosing How You Would Like Us To Contact You.`,
                      },
                      {
                        title: "WASHING INSTRUCTIONS:",
                        description: `Paying Some Extra Attention To How You Wash Your Clothes Will Not Only Prolong Their Life, But Also Help Minimize The Environmental Impact And Save Our Natural Resources. The Washing Instructions On The Label Will Give You Advise On How To Best Care For Your Garment, And Here Are Some Other Resourceful Advices.`,
                      },
                      {
                        title: "CONSCIOUS WASHING:",
                        description: `Washing, Drying And Ironing Your Clothes Accounts For 36% Of The Total Environmental Impact Of The Average Garment During Its Lifetime! This Can Be More Than Halved If We Make Smarter Choices. You Can Help The Planet And Your Wardrobe By Washing Your Clothes Less Frequently, Reducing The Washing Temperature, Ironing Less And Avoiding Tumble-drying.
Choosing Smart Care Methods Can Help You To Extend The Life Of Your Wardrobe Favourites While Also Reducing Your Environmental Impact, And Your Clothes Will Be Just As Clean.
Don’t Wash Clothes Unnecessarily.
Don’t Wash Clothes That Are Not Dirty. Often, Airing And Brushing Clothes Is Enough.
Lower The Washing Temperature Dabdoob Kidz Recommends That Heavily Soiled Clothes And Underwear Are Always Washed At The Highest Temperature Allowed. Do Not Wash Your Clothes At Temperatures Hotter Than Those Stated In The Care Instructions.
Sort The Clothes By Colour And Washing Temperature. Fill Up Your Washing Machine, But Don’t Stuff Too Much In. A Washing Machine Is Full When You Can Place A Clenched Fist On Top Of The Washing Without Compressing The Clothes. 
Use An Energy Saving Programme – Most Modern Washing Machines Have One.
Choose An Eco-friendly Laundry Detergent Use An Environmentally Friendly Detergent That Is Free From Optical Whiteners And Phosphates, Since These Have A Negative Environmental Impact When Released Into Nature. Dose The Detergent As Stated On The Packaging. Overdosing Detergent Will Not Make Your Clothes Cleaner. To Get The Dose Right, You Need To Know Whether You Have Hard Or Soft Water.
Leave Your Washing Out To Dry It Is Preferable To Leave Your Washing Out To Dry Since Tumble Drying And Drying Cabinets Use A Lot Of Energy. To Reduce Drying Time, Gentle Cycle The Clothes Well Before Taking Them Out Of The Washing Machine.`,
                      },
                      {
                        title: "Give Away Your Clothes!!!!!!!",
                        description: `When You No Longer Have A Use For Clothes, Give Them To An Organisation That Can Extend The Garment’s Life.`,
                      },
                    ].map(({ title, description }) => (
                      <div
                        style={{
                          border: "1px solid #F4F4F4",
                          borderRadius: "8px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ fontWeight: "bold" }}
                          >
                            {title}
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {description}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {sidebarItem === "8" && (
              <div className={styles.cards_container}>
                {["", "", "", "", ""].map((item, index) => (
                  <PromoCard />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
