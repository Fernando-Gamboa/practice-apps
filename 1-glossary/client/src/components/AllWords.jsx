import React from 'react';

const AllWords = (props) => (
  // on click invoke show all data
  <div>
    <button type='submit' onClick={() => props.allWords()}>All Words</button>
  </div>

);

export default AllWords;