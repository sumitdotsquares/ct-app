import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import CheckoutHosted from "./CheckoutHosted";
import CheckoutUPE from "./CheckoutUPE";
import Customer from "./Customer";
import parse from "html-react-parser";
import CheckoutSuperPay from "./CheckoutSuperPay";

export default function Checkout(props) {
  // If you want to only show one way to checkout, turn one of the following 3 variable to default to true
  const [showHosted, setShowHosted] = useState(false);
  const [showUPE, setShowUPE] = useState(false);
  const [custId, setCustId] = useState("");
  const [superPay, setSuperPay] = useState("Loading...");
  const [checkoutData, setCheckoutData] = useState(props.cart);
  const [custInfo, setCustInfo] = useState({ name: "bob", city: "chicago" });

  const styles = {
    header: {
      marginBottom: 15,
      marginTop: 25,
    },
    selector: {
      marginBottom: 20,
    },
  };

  const handleChange = (e) => {
    e.preventDefault();
    setShowHosted(e.target.value === "hosted");
    setShowUPE(e.target.value === "upe");
  };

  const lineItems = [];
  if (props.cart.lineItems) {
    props.cart.lineItems.forEach((element) => {
      const obj = {};
      obj.name = element.name.en;
      obj.quantity = element.quantity;
      obj.minorUnitAmount = element.price.value.centAmount;
      obj.url = "http://commercetools.24livehost.com";
      lineItems.push(obj);
    });
  }

  useEffect(() => {
    setSuperPay("Loading...");
    fetch(process.env.REACT_APP_BASE_URL + "/super-pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: props.cart.id,
        lineItem: lineItems,
      }),
    })
      .then((res) => res.json())
      .then((obj) => {
        setSuperPay(obj);
      });
  }, []);

  return (
    <>
      {props.cart && (
        <div className="row">
          {superPay.content && (
            <div className="col-12">
              {parse(superPay.content.title)}
              {parse(superPay.content.banner)}
              {parse(superPay.content.description)}
            </div>
          )}
          <div className="col-6">
            <Cart cart={props.cart} currency={props.currency} />
          </div>
          <div className="col-6">
            <Customer
              setCustId={setCustId}
              setCustInfo={setCustInfo}
              setCart={props.setCart}
              cart={props.cart}
              custId={custId}
            />
            {custId && (
              <>
                <h4 style={styles.header}>Checkout ddsds</h4>
                {/* If you want to only show one way to checkout, remove or comment out this <select> element  */}
                <select
                  className="form-control"
                  style={styles.selector}
                  disabled={custId === ""}
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="">How would you like to check out?</option>
                  <option value="hosted">Via Stripe-hosted page</option>
                  <option value="upe">Via custom form (Next Generation)</option>
                </select>
              </>
            )}

            {custId(
              <CheckoutSuperPay
                cart={props.cart}
                custId={custId}
                custInfo={custInfo}
                brandColor={props.brandColor}
                currency={props.currency}
              />
            )}
            {custId && showHosted && (
              <CheckoutHosted
                cart={props.cart}
                custId={custId}
                brandColor={props.brandColor}
                currency={props.currency}
              />
            )}
            {custId && showUPE && (
              <CheckoutUPE
                cart={props.cart}
                custId={custId}
                custInfo={custInfo}
                brandColor={props.brandColor}
                currency={props.currency}
              />
            )}
          </div>
        </div>
      )}
      {!props.cart && (
        <div className="row">
          <div className="col">Your cart is empty</div>
        </div>
      )}
    </>
  );
}
