import React, { useState, useEffect } from "react";
import getSymbolFromCurrency from "currency-symbol-map";

export default function CheckoutSuperPay(props) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const styles = {
    button: {
      color: "white",
      backgroundColor: props.brandColor,
      border: 0,
    },
    checkout: {
      border: "1px solid silver",
      borderRadius: 4,
      padding: 20,
      boxShadow: "silver 0px 0px 6px 0px",
    },
    error: {
      color: "tomato",
      marginTop: 20,
    },
  };

  let total = props.cart.totalPrice.centAmount;
  total = `${getSymbolFromCurrency(props.currency)} ${(total / 100).toFixed(
    2
  )}`;

  const appearance = {
    rowGap: "10px",
    columnGap: "20px",
    rules: {
      "*": {
        fontFamily: "Roboto, sans-serif",
        fontSize: "16px",
        color: "#425466",
      },
      ".Label": {
        fontWeight: "500",
      },
      ".Input--invalid": {
        color: "tomato",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        borderRadius: "4px",
      },
      ".Input": {
        borderRadius: "4px",
      },
      ".Error": {
        color: "tomato",
      },
    },
  };

  return (
    <a
      className="form-control btn btn-primary"
      href="https://checkout.staging.superpayments.com/PaymentSummary/992c9559-8d73-4207-ad84-c4f7ee9d8941"
      style={styles.button}
    >
      Pay with Super Pay {total} now
    </a>
  );
}
