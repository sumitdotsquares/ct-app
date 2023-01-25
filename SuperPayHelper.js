import axios from "axios";

async function getOffer(cartId, lineItem) {
  const SP_BASE_URL = process.env.SUPER_PAY_API_URL;
  const SP_API_KEY = process.env.SUPER_PAY_CHECKOUT_API_KEY;
  var data = JSON.stringify({
    minorUnitAmount: 10000,
    cart: {
      id: cartId,
      items: lineItem,
    },
    page: "Checkout",
    output: "both",
    test: true,
  });

  var config = {
    method: "post",
    url: SP_BASE_URL + "/offers",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://www.staging.superpayments.com",
      "checkout-api-key": SP_API_KEY,
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

async function getPaymentLink(cashbackOfferId) {
  const SP_BASE_URL = process.env.SUPER_PAY_API_URL;
  const SP_API_KEY = process.env.SUPER_PAY_CHECKOUT_API_KEY;
  var data = JSON.stringify({
    "cashbackOfferId": "1fed4780-233f-4bc4-8a00-e40d95caa3c6",
    "successUrl": "https://www.merchant.com/success.html",
    "cancelUrl": "https://www.merchant.com/cancel.html",
    "failureUrl": "https://www.merchant.com/fail.html",
    "minorUnitAmount": 10000,
    "currency": "GBP",
    "externalReference": "order_id_123450"
  });

  var config = {
    method: "post",
    url: SP_BASE_URL + "/payments",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://www.staging.superpayments.com",
      "checkout-api-key": SP_API_KEY,
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

export default { getOffer, getPaymentLink };