import axios from "axios";
import React, { useState, useEffect } from "react";
const SP_BASE_URL = process.env.SUPER_PAY_API_URL;
const SP_API_KEY = process.env.SUPER_PAY_CHECKOUT_API_KEY;
let headers = {
  "Content-Type": "application/json",
  Referer: "https://www.staging.superpayments.com",
  "checkout-api-key": SP_API_KEY,
};

async function getOffer() {
  var data = JSON.stringify({
    minorUnitAmount: 10000,
    cart: {
      id: "cart101",
      items: [
        {
          name: "Im a product",
          quantity: 2,
          minorUnitAmount: 10000,
          url: "https://www.dev-site-2x6137.wixdev-sites.org/product-page/i-m-a-product-8",
        },
        {
          name: "Amazing boots",
          quantity: 3,
          minorUnitAmount: 10000,
          url: "https://www.merchant.com/product1.html",
        },
      ],
    },
    page: "Checkout",
    output: "both",
    test: true,
  });

  var config = {
    method: "post",
    url: "https://api.staging.superpayments.com/v2/offers",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://www.staging.superpayments.com",
      "checkout-api-key": "PSK_V6FrAxwm4T8lhnLwiPoM-xNSZnDKTYEUSLNme6v2",
    },
    data: data,
  };

  const rsp = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    return await rsp;
}

export default { getOffer };
