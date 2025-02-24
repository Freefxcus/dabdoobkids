import React from "react";
import { Box } from "@mui/material";
export default function About() {
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
        ABOUT US
      </Box>
      <Box sx={{ fontSize: "1.5rem", color: "var(--brown)" }} component={"h3"}>
        • Our Identity
      </Box>
      <Box sx={{ fontSize: "0.8", lineHeight: "1.5", pb: "2.5rem" }}>
        E-commerce Group Is One Of Most Unique Groups In Country That
        Specializes In All The Baby Needs Since Day 1. We Offer A Special
        Service Which We Can Bring You The Highest Quality International Brands
        For All Your Baby Needs. Each With Its Own Unique Identity, All Our
        Brands Are United By A Passion For Fashion And Quality And Highest Level
        Of Comfort And The Drive To Dress Our Precious Kids In A Sustainable
        Way. The Commitment Of Our Employees Is Key To Our Success. We Are
        Dedicated To Creating A Better Accessibility To The Most Popular Brands
        And Deliver It To You In Country With The Best Pricing Possible. We Are
        Dedicated To Always Create The Best Offering And The Best Experience For
        Our Customers. We All Share A Values-driven Way Of Working, Based On A
        Fundamental Respect For The Individual. Our Shared Values Help Create An
        Open, Dynamic And Down-toearth Company Culture Where Anything Is
        Possible The E-commerce Group Is One Of The Most Unique Groups In
        Country That Specializes In All The Needs Of Both The Baby Needs Since
        Day One. We Offer A Special Service That We Can Offer You The Highest
        Quality International Brands For All Your Child's Needs.
      </Box>
      <Box sx={{ fontSize: "1.5rem", color: "var(--brown)" }} component={"h3"}>
        • Our Story
      </Box>
      <Box sx={{ fontSize: "0.8", lineHeight: "1.5", pb: "2.5rem" }}>
        3 Friends 1 Ambition Endless Spirit Of Adventure Back In 2023 When The
        Economical Crisis Hit And It Became Almost Impossible To Provide Mothers
        And Fathers In Country Who Care About Their Baby's Skin And Body With
        These Organic Soft Materials From The Most Unique UK Brands, It Came To
        Us That We Can Do So Because Babies Need The Best Care They Can Get And
        Their Skins To Touch The Softest Fabric, And Their Movement In Their
        Strollers To Be The Safest And The Easiest So We Decided To Study All
        The Baby Needs Also Of Course The Great Person Who Carried Them , Our
        Precious Mommy's Needs And Create A Space Where All Of It Is Available
        For Easy Quick Purchase. With Our Dedication And Ambition We Completed
        Our Amazing Space And We Are In Continuous Progress And Always Following
        Up With The Latest Fashion Trends And The Safest Baby Accessories And
        Also Following Up With Your Constructive Criticism To Always Do Our Best
        And More.
      </Box>

      <Box sx={{ fontSize: "1.5rem", color: "var(--brown)" }} component={"h3"}>
        • Our Goal
      </Box>
      <Box sx={{ fontSize: "0.8", lineHeight: "1.5", pb: "2.5rem" }}>
        We Want To Become The First Group In Country Dedicated To The Care And
        Health Of Mothers And Their Children. Our Priority Is To Dedicate
        Ourselves Every Day To Improving Our Offer, Through Our Careful Studies
        And The Best Choices For You And Your Children. Our Goal Is To Take Care
        Of Your Family By Providing For Each Of Your Families. With The Hope Of
        Letting You Into Our E-commerce Family
      </Box>
    </Box>
  );
}
