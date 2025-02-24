import axios from "axios";
import { baseUrl } from "./baseUrl";
import { store } from "../Redux/store";
import instance from "../utils/interceptor.js";
import { notifySuccess, notifyError, navigate } from "./general.js";

// client_id: redux("userInfo").id,
// ----------------------------------------------------------------
const redux = (slice) => {
  // to get updated slice
  return store.getState()[slice].value;
};
// ----------------------------------------------------------------

export const getProducts = async (
  page,
  items = 12,
  category,
  subcategory,
  brand,
  query,
  sale
) => {
  let returnedValue;
  const params = {
    page,
    items,
    // items: 2, // example default value for item
    category,
    subcategory,
    brand,
    query,
    sale,
  };
  Object.keys(params).forEach((key) =>
    !params[key] ? delete params[key] : params[key]
  );
  await instance
    .get("/products", {
      params,
    })
    .then((response) => {
      console.log(response?.data?.data);
      returnedValue = response?.data?.data;
    })
    .catch((error) => {
      console.log(error, "responseeeefromproducts");
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};
export const getProductsSale = async (
  page,
  all,
  category,
  brand,
  query,
  sale
) => {
  let returnedValue;
  const params = {
    page,
    all,
    // items: 2, // example default value for item
    category,
    brand,
    query,
    sale,
    items: 12,
  };
  Object.keys(params).forEach((key) =>
    !params[key] ? delete params[key] : params[key]
  );
  console.log("paramsparamsparams", params, sale);
  await instance
    .get("/products/sale", {
      params,
    })
    .then((response) => {
      console.log(response?.data?.data);
      returnedValue = response?.data?.data;
    })
    .catch((error) => {
      console.log(error, "responseeeefromproducts");
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};
export const getProductById = async (id) => {
  let returnedValue;

  await instance
    .get(`/products/${id}`, {
      // params: { page: 1 },
    })
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getRelatedProducts = async (id) => {
  let returnedValue;

  await instance
    .get(`/products/${id}/related`)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getWishlistItems = async () => {
  let returnedValue;

  await instance
    .get("/wishlists")
    .then((response) => {
      returnedValue = response.data.data.length
        ? response.data.data[0].items
        : [];
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const addToWishlist = async (id) => {
  let returnedValue;

  await instance
    .post("/wishlists", {
      product: id,
    })
    .then((response) => {
      console.log(response);
      notifySuccess("Added to wishlist!");
      // returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const removeFromWishlist = async (id) => {
  let returnedValue;
  await instance
    .put("/wishlists", {
      product: id,
    })
    .then((response) => {
      console.log(response);
      notifySuccess("Removed from wishlist!");
      // returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getBanners = async () => {
  let returnedValue;

  await instance
    .get("/banners")
    .then((response) => {
      returnedValue = response?.data?.data;
    })
    .catch((error) => {
      console.log(error, "banners");
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getCart = async () => {
  let returnedValue;

  await instance
    .get("/cart")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      console.log(error, "cartresponseeee");
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const updateCart = async (productId, variantId, body) => {
  let returnedValue;

  await instance
    .put("/cart", {
      product: productId,
      variant: variantId,
    })
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const addToCart = async (data) => {
  let returnedValue;

  await instance
    .post("/cart", { items: data })
    .then((response) => {
      notifySuccess("Added to cart!");
      returnedValue = response.data.data;
    })
    .catch((error) => {
      console.log(error, "add Cartttttt");
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const emptyCart = async (id) => {
  let returnedValue;
  await instance
    .delete("/cart")
    .then((response) => {
      console.log(response);

      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const removeFromCart = async (ProductId) => {
  let returnedValue;
  await instance
    .delete("/cart/" + ProductId)
    .then((response) => {
      console.log(response);
      notifySuccess("Removed from cart!");
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const orderCheckout = async (data) => {
  let returnedValue;

  // promocode  ,
  const body = {
    useWallet:
      data?.useWallet === "true"
        ? true
        : data?.useWallet === "false"
        ? false
        : data?.useWallet,
    paymentMethod: data?.paymentMethod,
    address: data?.address,
    promocode: data?.promocode,
    phone: data?.phone,

    // example default value for item
  };
  console.log(body);
  Object.keys(body).forEach((key) => body[key] === "" && delete body[key]);
  console.log(body);
  await instance
    .post("/orders/checkout", body)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const orderSummary = async (data) => {
  let returnedValue;
  console.log(data);
  const body = {
    useWallet:
      data?.useWallet === "true"
        ? true
        : data?.useWallet === "false"
        ? false
        : data?.useWallet,
    paymentMethod: data?.paymentMethod,
    address: data?.address,
    promocode: data?.promocode,
    phone: data?.phone,

    // example default value for item
  };
  console.log(body);
  Object.keys(body).forEach((key) => body[key] === "" && delete body[key]);
  console.log(body);
  await instance
    .post("/orders/summary", body)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {});

  return returnedValue; // caught by .then()
};

export const getInvoiceOrder = async (id) => {
  let returnedValue;

  await instance
    .get(`orders/${id}/invoice`, {
      responseType: "file",
    })
    .then((response) => {
      returnedValue = response.data;
      console.log(response);
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const getSingleOrder = async (id) => {
  let returnedValue;

  await instance
    .get(`/profile/orders/${id}`)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const authorize = async (setForceReload) => {
  window.stop();
  if (localStorage.getItem("refresh_token")) {
    instance
      .post("/auth/refresh", {
        refreshToken: localStorage.getItem("refresh_token"),
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.data.accessToken);
        // location.reload();
        setForceReload((prev) => !prev);
      })
      .catch((error) => {
        notifyError(error);
      });
  } else {
    notifyError("Please Log In!");
    navigate("/login");
  }
};

export const AddAddress = async (body) => {
  const governorate = +body.governorate;
  const city = +body.city;
  body = { ...body, governorate, city };
  console.log(body, "bodyacxssadasds");
  let returnedValue;
  await instance
    .post("/addresses", body)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getAddress = async () => {
  let returnedValue;

  await instance
    .get("/addresses")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const updateAddress = async (id, body) => {
  const governorate = +body.governorate;
  const city = +body.city;
  body = { ...body, governorate, city };
  console.log(body, "bodyacxssadasds");
  let returnedValue;

  await instance
    .put(`/addresses/${id}`, body)
    .then((response) => {
      // notifySuccess("Address Updated!");
      returnedValue = response.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const deleteAddress = async (id) => {
  let returnedValue;

  await instance
    .delete(`/addresses/${id}`)
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const googleAuth = async () => {
  let returnedValue;

  await instance
    .get("/auth/google")
    .then((response) => {
      console.log(response, "<<<<googleAuth");
      // localStorage.setItem("access_token", response.data.data.accessToken);
      // localStorage.setItem("refresh_token", response.data.data.refreshToken);
      // returnedValue = response.data.data;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const googleCallback = async (code) => {
  let returnedValue;

  await instance
    .get(`/auth/google/callback?${code}`, {
      code,
    })
    .then((response) => {
      console.log(response);

      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getCategories = async () => {
  let returnedValue;

  await instance
    .get("/categories?items=50")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })

    .catch((error) => {
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};

export const getTestimonials = async () => {
  let returnedValue;

  await instance
    .get("/testimonials??order=asc&items=50")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })

    .catch((error) => {
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};

export const getBrands = async () => {
  let returnedValue;

  await instance
    .get("/brands?items=50")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })

    .catch((error) => {
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};

export const getSubCategories = async (params) => {
  let returnedValue;

  await instance
    .get(`/subcategories${params ? `?${params}` : ""}`)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })

    .catch((error) => {
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};
export const getWishList = async () => {
  let returnedValue;

  await instance
    .get("/wishlists")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })
    .catch((error) => {
      // notifyError(error);
    });
  return returnedValue; // caught by .then()
};

export const updateProfile = async (data) => {
  let returnedValue;

  await instance
    .post(`/profile`, data)
    .then((response) => {
      console.log(response);
      returnedValue = response.data.status;
    })
    .catch((error) => {
      notifyError(error);
    });
  return returnedValue;
};

export const getWallet = async () => {
  let returnedValue;

  await instance
    .get("/wallets")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      console.log(error, "responseeeefromwallet");
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const getWalletHistory = async () => {
  let returnedValue;

  await instance
    .get("/wallets/history")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      console.log(error, "responseeeefromwallet");
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const getPromoCode = async () => {
  let returnedValue;

  await instance
    .get("/promocode")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      console.log(error, "responseeeefromwallet");
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const checkPromoCode = async (code) => {
  let returnedValue;

  await instance
    .post("/promocodes/validate", {
      promocode: code,
    })
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const ordersCallback = async () => {
  let returnedValue;

  await instance
    .post("/orders/callback")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const orderRefund = async (data) => {
  let returnedValue;

  await instance
    .post(`/order-request`, data)
    .then((response) => {
      returnedValue = response;
      notifySuccess(
        " you order request has " + data?.requestType + " Success "
      );
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue;
};

export const orderCancel = async (id, data) => {
  let returnedValue;

  await instance
    .post(`/orders/${id}/ship/cancel`)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue;
};
export const orderReturn = async (id) => {
  let returnedValue;

  await instance
    .post(`/orders/${id}/return`)
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue;
};
export const getPlans = async () => {
  let returnedValue;

  await instance
    .get("/plans")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const resetPassword = async (data) => {
  let returnedValue;

  await instance
    .post("/auth/reset-password", data)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getOrderInvoice = async (id) => {
  let returnedValue;

  await instance
    .get(`/orders/${id}/invoice`)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getGovernorates = async () => {
  let returnedValue;

  await instance
    .get("/governorate")
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getCitites = async (id) => {
  let returnedValue;
  if (!id) return;
  await instance
    .get(`/city?governorate=${id}`)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      // notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getUserPlan = async () => {
  let returnedValue;
  if (localStorage.getItem("access_token"))
    await instance
      .get(`/profile/subscription`)
      .then((response) => {
        returnedValue = response;
      })
      .catch((error) => {
        // notifyError(error);
      });

  return returnedValue; // caught by .then()
};

export const subscribeToPlan = async (planId) => {
  let returnedValue;
  console.log(planId, "planid");
  await instance
    .post(`/subscriptions`, {
      plan: +planId,
    })
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

// New

export async function getSizes(params) {
  const res = await fetch(
    `https://dabdoob-api-service.onrender.com/api/size${
      params ? `?${params}` : ""
    }`
  );

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const sizes = await res.json();
  return sizes;
}

export async function getUserPaymentLink(amount) {
  const userTransactions = await axios.get(
    `https://dabdoob-api-service.onrender.com/api/payment/${amount}`,
    {
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    }
  );

  return userTransactions.data;
}

export async function createTransaction(data) {
  const userTransactions = await axios.post(
    `https://dabdoob-api-service.onrender.com/api/transactions`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    }
  );

  return userTransactions.data;
}

export async function getUserStatusPayment(orderId) {
  const paymentStatus = await axios.get(
    `https://dabdoob-api-service.onrender.com/api/payment/verify/${orderId}`,
    {
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    }
  );

  return paymentStatus.data;
}

export async function createOrders(data) {
  const order = await axios.post(
    `https://dabdoob-api-service.onrender.com/api/orders`,
    data
  );

  return order.data;
}

export async function orderMail(data) {
  const order = await axios.post(
    `https://dabdoob-api-service.onrender.com/api/orders/mail`,
    data
  );

  return order.data;
}

export async function resetUserEmail(data) {
  const reset = await axios.post(
    `https://dabdoob-api-service.onrender.com/api/users/reset-password`,
    data
  );

  return reset.data;
}

export async function resetUserPassword(data, token) {
  const password = await axios.put(
    `https://dabdoob-api-service.onrender.com/api/users/change-password`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return password.data;
}
