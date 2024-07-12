import axios from "axios";
import { baseUrl } from "./baseUrl";
import { store } from "../Redux/store";
import instance from "../utils/interceptor.js";
import { notifySuccess, notifyError, navigate } from "./general.js";
import { t } from "i18next";
// client_id: redux("userInfo").id,
// ----------------------------------------------------------------
const redux = (slice) => {
  // to get updated slice
  return store.getState()[slice].value;
};
// ----------------------------------------------------------------

export const getProducts = async (page, all, category, brand, query) => {
  let returnedValue;
  const params = {
    page,
    all,
    items: 2, // example default value for item
    category,
    brand,
    query,
  };
  Object.keys(params).forEach((key) => !params[key] ? delete params[key] : params[key]);
  console.log(params);
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
      notifyError(error);
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
      notifyError(error);
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
      notifyError(error);
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

export const getCart = async () => {
  let returnedValue;

  await instance
    .get("/cart")
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      console.log(error, "cartresponseeee");
      notifyError(error);
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

export const addToCart = async (id, count, variant) => {
  let returnedValue;

  await instance
    .post("/cart", {
      product: id,
      count: count,
      variant: variant,
    })
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
export const removeFromCart = async (ProductId, variantId) => {
  let returnedValue;
  await instance
    .put("/cart", {
      product: ProductId,
      variant: variantId,
    })
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

export const orderCheckout = async (paymentMethod, address) => {
  let returnedValue;
  const body = {
    // promocode  ,

    useWallet: paymentMethod === "wallet" ? true : false,
    paymentMethod: paymentMethod,
    address: address,

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
    useWallet: data?.useWallet,
    paymentMethod: data?.paymentMethod,
    address: data?.address,
    promocode: data?.promocode,

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
export const getSingleOrder = async (id) => {
  let returnedValue;

  await instance
    .get(`/orders/${id}`)
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
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
      notifyError(error);
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
      notifySuccess("Address Updated!");
      returnedValue = response.data.data;
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
      notifyError(error);
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
    .get("/categories")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })

    .catch((error) => {
      notifyError(error);
    });
  return returnedValue; // caught by .then()
};

export const getSubCategories = async () => {
  let returnedValue;

  await instance
    .get("/subcategories")
    .then((response) => {
      console.log(response);
      returnedValue = response;
    })

    .catch((error) => {
      notifyError(error);
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
      notifyError(error);
    });
  return returnedValue; // caught by .then()
};

export const updateProfile = async (data) => {
  let returnedValue;

  await instance
    .post(`/auth/profile`, data)
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
      notifyError(error);
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
      notifyError(error);
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
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};
export const checkPromoCode = async (code) => {
  let returnedValue;

  await instance
    .post("/promocode/validate", {
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

export const orderRefund =  async (id,data) => {
  let returnedValue;

  await instance
    .post(`/orders/${id}/refund`,data)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue;
};


export const orderCancel =  async (id,data) => {
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
export const orderReturn =  async (id) => {
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
      notifyError(error);
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
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getCitites = async () => {
  let returnedValue;

  await instance
    .get(`/city`)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const getUserPlan = async () => {
  let returnedValue;

  await instance
    .get(`/auth/profile/plan`)
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};

export const subscribeToPlan = async (planId) => {
  let returnedValue;
  console.log(planId, "planid");
  await instance
    .post(`/subscription`, {
      plan: planId,
    })
    .then((response) => {
      returnedValue = response;
    })
    .catch((error) => {
      notifyError(error);
    });

  return returnedValue; // caught by .then()
};
