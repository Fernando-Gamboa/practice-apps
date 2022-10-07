// THIS IS MY APP FILE ---
import React from "react";
// import { render } from "react-dom";
import ReactDOM from "react-dom";
import GlossaryList from './components/GlossaryList.jsx';
import GlossaryListEntry from './components/GlossaryListEntry.jsx';
import Search from './components/Search.jsx';
import FormSubmit from './components/FormSubmit.jsx';
import AllWords from './components/AllWords.jsx';
import PopupForm from './components/PopupForm.jsx';

import {useState, useEffect} from 'react';

const axios = require('axios');


const App = (props) => {

  // states ---
  const [glossary, setGlossary] = useState([]);
  const [filterGloss, setFilterGloss] = useState(glossary);
  const [change, setChange] = useState();
  const [change2, setChange2] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [editObj, setEditObj] = useState({});

  // Toggle popup ---
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  // create a post request when a new word is being added ---
  const wordPost = (value1, value2) => {
    axios.post('http://127.0.0.1:3000/lists', {
      word: value1,
      definition: value2
    })
    .then((response) => {
      let temp = glossary.slice();
      temp.push(response.data);
      setGlossary(temp);
      setFilterGloss(temp);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // create a get request for new info ---
  const getData = () => {
    axios.get('http://127.0.0.1:3000/lists')
    .then((response) => {
      setGlossary(response.data);
      setFilterGloss(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // create a delete request for info ---
  const deleteData = (wordObj) => {
    // axios delete request sends request to server line 39
    // data: allows you to pick the object you want to remove
    axios.delete('http://127.0.0.1:3000/lists', {data: wordObj})
    // finally after data is sent back from server promise is consumed
    .then((response) => {
      // refresh displayed data afer word is deleted
      getData();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // create an update request for data ---
  const updateData = (word, def, wordObj) => {
    axios.put('http://127.0.0.1:3000/lists', {
      find: wordObj,
      update: {
        word: word,
        definition: def
      }
    })
    .then((response) => {
      getData();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // trigger refresh on page load ---
  useEffect(() => {
    getData();
  }, []);

  // search for words ---
  const searchWord = (word) => {
    const filtered = [];
    // iterate through glossary
    glossary.forEach((currentValue, index, collection) => {
      // if the word matches with whatever we're typing
      if (currentValue.word.toLowerCase().includes(word.toLowerCase())) {
        // push it to array
        filtered.push(currentValue);
      }
    })
    if (filtered.length === 0) {
      filtered.push({word: 'No words found!'});
    }
    // set it to filterGloss
    setFilterGloss(filtered);
  }

  // show all words ---
  const allWords = () => {
    getData();
  }

  return (
    <div>
      <div>
        <p>Personal Dictionary!</p>
      </div>

      <div>
        <PopupForm updateData={updateData} isOpen={isOpen} togglePopup={togglePopup} wordPost={wordPost} setChange={setChange} setChange2={setChange2} change={change} change2={change2} editObj={editObj} />
      </div>

      <div>
        <AllWords allWords={allWords} />
      </div>

      <div>
        <Search searchWord={searchWord} />
      </div>

      <div>
        <FormSubmit wordPost={wordPost} setChange={setChange} setChange2={setChange2} change={change} change2={change2} />
      </div>

      <div>
        <GlossaryList filterGloss={filterGloss} deleteData={deleteData} togglePopup={togglePopup} setEditObj={setEditObj} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
