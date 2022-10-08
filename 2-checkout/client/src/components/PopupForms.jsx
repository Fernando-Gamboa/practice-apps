import React from 'react';

const PopupForms = (props) => (
  <div style={props.popup ? {display: ''} : {display: 'none'}} className='popup-box'>

    {props.nextForm === 1 ?
    // Create user form --------------------------------------------
      <div className='form-popup'>
        <form onSubmit={(e) => {
            e.preventDefault();
            props.setConfirmation(props.confirmation['user'] = e.target.user.value);
            props.setConfirmation(props.confirmation['password'] = e.target.password.value);
            props.setConfirmation({...props.confirmation});
            props.setNextForm(props.nextForm + 1);
            e.target.user.value = '';
            e.target.password.value = '';
          }} className='form-container'>
          <h1>Create account</h1>
          <label><b>User</b></label>
          <input type='text' name='user' placeholder='Enter username...'></input>
          <label><b>Password</b></label>
          <input type='text' name='password' placeholder='Enter password...'></input>

          <button type='submit'>Next</button>
        </form>
      </div> :
    // Shipping form -----------------------------------------------
    (props.nextForm === 2) ?
      <div className='form-popup'>
        <form onSubmit={(e) => {
            e.preventDefault();
            props.setConfirmation(props.confirmation['address'] = e.target.address.value);
            props.setConfirmation(props.confirmation['state'] = e.target.state.value);
            props.setConfirmation(props.confirmation['zip'] = e.target.zip.value);
            props.setConfirmation({...props.confirmation});
            props.setNextForm(props.nextForm + 1);
            e.target.address.value = '';
            e.target.state.value = '';
            e.target.zip.value = '';
          }} className='form-container'>
          <h1>Shipping address</h1>
          <label><b>Address</b></label>
          <input type='text' name='address' placeholder='Enter address...'></input>
          <label><b>State</b></label>
          <input type='text' name='state' placeholder='Enter state...'></input>
          <label><b>Zip code</b></label>
          <input type='text' name='zip' placeholder='Enter zip code...'></input>

          <button type='submit'>Next</button>
        </form>
      </div> :
    // Billing form --------------------------------------------
    (props.nextForm === 3) ?
      <div className='form-popup'>
        <form onSubmit={(e) => {
            e.preventDefault();
            props.setConfirmation(props.confirmation['card'] = e.target.card.value);
            props.setConfirmation(props.confirmation['security'] = e.target.security.value);
            props.setConfirmation({...props.confirmation});
            props.setNextForm(props.nextForm + 1);
            e.target.card.value = '';
            e.target.security.value = '';
          }} className='form-container'>
          <h1>Billing information</h1>
          <label><b>Card number</b></label>
          <input type='text' name='card' placeholder='Enter card number...'></input>
          <label><b>Security code</b></label>
          <input type='text' name='security' placeholder='Enter security code...'></input>

          <button type='submit'>Next</button>
        </form>
      </div> :
      // Confirmation form --------------------------------------------
      <div className='form-popup'>
        <form onSubmit={(e) => {
            // e.preventDefault();
            props.postRequest(props.confirmation);
            props.getRequest();
          }} className='form-container'>
          <h1>Confirmation Page</h1>

          <div>{`User: ${props.confirmation.user}`}</div>
          <div>{`Password: ${props.confirmation.password}`}</div>
          <br></br>
          <div>{`Address: ${props.confirmation.address}`}</div>
          <div>{`State: ${props.confirmation.state}`}</div>
          <div>{`Zip Code: ${props.confirmation.zip}`}</div>
          <br></br>
          <div>{`Card Number: ${props.confirmation.card}`}</div>
          <div>{`Security Code: ${props.confirmation.security}`}</div>
          <br></br>

          <button type='submit'>Purchase</button>
        </form>
    </div>}

  </div>
);

export default PopupForms;