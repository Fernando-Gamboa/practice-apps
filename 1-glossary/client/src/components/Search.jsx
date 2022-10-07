import React from 'react';

const Search = (props) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    e.target.search.value = '';
  }}>
    <div>
      <input type='text' name='search' placeholder='Search word...' onChange={(e) => props.searchWord(e.target.value)} ></input>
      <button type='submit'>Search</button>
    </div>
  </form>
);

export default Search;