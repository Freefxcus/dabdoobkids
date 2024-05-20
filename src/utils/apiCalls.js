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

export const getProducts = async (page, all, category, brand, query) => {
  let returnedValue;
  const params = {
    page,
    all,
    item: 10, // example default value for item
    category,
    brand,
    query,
  };
  Object.keys(params).forEach((key) => params[key] == "" && delete params[key]);
  console.log(params);
  await instance
    .get("/products", {
      params,
    })
    .then((response) => {
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error.message);
      //throw new Error(error);
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
      notifyError(error.message);
      //throw new Error(error);
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
      notifyError(error.message);
      // throw new Error(error);
      // throw new Error(
      //   error.response?.data?.errors?.[0].message || error.response.data.message
      // );
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
      notifyError(error.message);
      //throw new Error(error);
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
      notifyError(error.message);
      //throw new Error(error);
    });

  return returnedValue; // caught by .then()
};

export const getCart = async () => {
  let returnedValue;

  await instance
    .get("/cart")
    .then((response) => {
      console.log(response);
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error.message);
      //throw new Error(error);
    });

  return returnedValue; // caught by .then()
};

export const addToCart = async (id, count) => {
  let returnedValue;

  await instance
    .post("/cart", {
      product: id,
      count: count,
    })
    .then((response) => {
      console.log(response);
      notifySuccess("Added to cart!");
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error.message);
      //throw new Error(error);
    });

  return returnedValue; // caught by .then()
};

export const emptyCart = async (id) => {
  let returnedValue;
  await instance
    .delete("/cart")
    .then((response) => {
      console.log(response);
      notifySuccess("Cart is empty now!");
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error.message);
      //throw new Error(error);
    });

  return returnedValue; // caught by .then()
};
export const removeFromCart = async (id) => {
  let returnedValue;
  await instance
    .put("/cart", {
      product: id,
    })
    .then((response) => {
      console.log(response);
      notifySuccess("Removed from cart!");
      returnedValue = response.data.data;
    })
    .catch((error) => {
      notifyError(error.message);
      //throw new Error(error);
    });

  return returnedValue; // caught by .then()
};

export const orderCheckout = async (promocode, useWallet, paymentMethod) => {
  let returnedValue;
  const body = {
    promocode,
    useWallet,
    paymentMethod, // example default value for item
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
      notifyError(error.message);
      // throw new Error(
      //   error.response.data.errors?.[0].message ||
      //     error.response.data.message ||
      //     "Error!"
      // );
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
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        notifyError("Session Expired!");
        navigate("/login");
        //throw new Error(error);
      });
  } else {
    notifyError("Please Log In!");
    navigate("/login");
  }
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
      notifyError(error.message);
      //throw new Error(error);
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
      notifyError(error.message);
      //throw new Error(error);
    });

  return returnedValue; // caught by .then()
};
