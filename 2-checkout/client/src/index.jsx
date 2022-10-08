import React from "react";
import ReactDOM from "react-dom";
import {useState, useEffect} from 'react';
import Checkout from './components/Checkout.jsx';
import PopupForms from './components/PopupForms.jsx';
import ResponseList from './components/ResponseList.jsx';
import ResponseListEntry from './components/ResponseListEntry.jsx';
const axios = require('axios');

const App = (props) => {

  // setting states for popup forms ---
  const [popup, setPopup] = useState(false);
  const [nextForm, setNextForm] = useState(1);
  const [confirmation, setConfirmation] = useState({});
  const [data, setData] = useState([]);


  const getRequest = ()=> {
    axios.get('http://127.0.0.1:3000/account')
    .then((response) => {
      let temp = [...response.data];
      setData(temp);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const postRequest = (response) => {
    axios.post('http://127.0.0.1:3000/account', response)
    .then((response) => {
      let temp = [];
      temp.push(response.data);
      setData(temp);
      getRequest();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getRequest();
  }, []);


  return (
    <div>
      <p>Enter response!</p>

      <div>
        <Checkout popup={popup} setPopup={setPopup} />
      </div>

      <div>
        <PopupForms postRequest={postRequest} popup={popup} nextForm={nextForm} setNextForm={setNextForm} confirmation={confirmation} setConfirmation={setConfirmation} getRequest={getRequest} />
      </div>

      <p>
        <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
      </p>
      <br></br>

      <div>
        <ResponseList data={data} />
      </div>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));