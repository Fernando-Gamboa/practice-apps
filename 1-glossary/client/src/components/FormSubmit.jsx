import React from 'react';


const FormSubmit = (props) => (
  // on submit we invoke the function to post
  <form onSubmit={(e) => {
    e.preventDefault();
    e.target.word.value = '';
    e.target.definition.value = '';
    props.wordPost(props.change, props.change2);
  }}>
    <div>Let's add a definition!</div>
    <label >Word: </label>
    <input type="text" name='word' onChange={(e) => props.setChange(e.target.value)} />
    <br></br>
    <label >Definition: </label>
    <input type="text" name='definition' onChange={(e) => props.setChange2(e.target.value)} />
    <br></br>
    <button type='submit'>Submit</button><br></br>
  </form>
);

export default FormSubmit;