import React from 'react';

const PopupForm = (props) => (
  // if isOpen state is true or false then set display to hide or show
  // on submit of form it'll also invoke the update data func with both inputs and the clicked obj
    <div style={props.isOpen ? {display: ''} : {display: 'none'}} className="popup-box">
        <span className="close-icon" onClick={() => props.togglePopup()}>x</span>

        {page === 1 ? }
        <div className="form-popup" id="myForm" >
        <form onSubmit={(e) => {
          e.preventDefault();
          e.target.word2.value = '';
          e.target.definition2.value = '';
          props.updateData(props.change, props.change2, props.editObj);
        }} className="form-container">
          <h1>Edit</h1>

          <label ><b>Word</b></label>
          <input type="text" name='word2' placeholder="Enter word..." onChange={(e) => props.setChange(e.target.value)} required />

          <label ><b>Definition</b></label>
          <input type="text" name='definition2' placeholder="Enter definition..." onChange={(e) => props.setChange2(e.target.value)} required />

          <button type="submit" className="btn cancel">Submit</button>
        </form>
        </div>

    </div>
);

export default PopupForm;