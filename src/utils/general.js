import instance from "../utils/interceptor.js";
import { toast } from "react-toastify";

import CheckIcon from "../images/CheckCircle.svg";
import WarningIcon from "../images/WarningCircle.svg";

export const isValidUser = async () => {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const firstEndpoint = pathSegments[0];

  if (
    // ["profile"].includes(firstEndpoint) &&
    !localStorage.getItem("access_token")
  ) {
    // window.location.href = `${window.location.protocol}//${window.location.host}/login`;
    return true;
  } else {
    await instance
      .post("/auth/refresh", {
        refreshToken: localStorage.getItem("access_token"),
      })
      .then((response) => {
        console.log(response);
        // returnedValue = response.data.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
};

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "bottom-left",
    autoClose: 1000, // Auto close the notification after 3000 milliseconds (3 seconds)
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: <img src={CheckIcon} alt="CheckIcon" width={24} height={24} />,
    style: { background: "#F7FDF3" },
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: <img src={WarningIcon} alt="WarningIcon" width={24} height={24} />,
    style: { background: "#FFF3F2" },
  });
};

export const navigate = (endpoint) => {
  window.location.href = `${window.location.protocol}//${window.location.host}${endpoint}`;
};

export const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
export const calcDiscount = (selectedVariantObject, productDetails) => {
  // Get the base price and ensure it's a valid number
  const price =
    selectedVariantObject && !isNaN(+selectedVariantObject?.price)
      ? +selectedVariantObject?.price
      : !isNaN(+productDetails?.price)
      ? +productDetails?.price
      : 0; // Return 0 if price is invalid

  if (!price || price <= 0) {
    return 0; // Return 0 if the price is invalid or zero
  }

  const discountType = productDetails?.discountType;
  const discountAmount = +productDetails?.discount || 0;

  // Apply discount based on discountType
  if (discountType === "percentage" && discountAmount) {
    return {
      priceAfter: Math.trunc(price - (price * discountAmount) / 100).toFixed(),
      price: price.toFixed(),
      discount: true,
    };
  } else if (discountType !== "percentage" && discountAmount) {
    return {
      priceAfter: Math.trunc(price - discountAmount).toFixed(),
      price: price.toFixed(),
      discount: true,
    };
  } else {
    return { priceAfter: null, discount: false, price: price }; // Return original price if no valid discount type is provided
  }
};

export const newCalcDiscount = (item = {}) => {
  const { count, product } = item || {};

  const { price, discount = 0, discountType = "", sale = {} } = product;

  const saleStatus = !!Object.keys(sale).length;

  const finalPrice = saleStatus
    ? sale.discountType === "percentage"
      ? +price - (+price * +sale?.discountAmount) / 100
      : +price - +sale.discountAmount
    : discountType?.toLowerCase?.() !== "amount"
    ? +price - (price * +discount) / 100
    : +price - +discount;

  const discountStatus = +discount || sale?.discountAmount || false;

  return {
    totalPrice: count * finalPrice,
    priceAfter: finalPrice,
    price: +price,
    discountStatus,
  };
};
