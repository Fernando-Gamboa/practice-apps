import React from 'react';

const Checkout = (props) => (
  <button onClick={() => props.setPopup(!props.popup)}>Checkout</button>
)

export default Checkout;