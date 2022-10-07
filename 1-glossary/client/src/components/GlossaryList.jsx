import React from 'react';
import GlossaryListEntry from './GlossaryListEntry.jsx';

const GlossaryList = (props) => {
  return (
    <div>
      {/* REMEMBER: USE () NOT {} BECAUSE IT NEEDS TO BE INVOKED W/O A RETURN STATEMENT */}
      {props.filterGloss.map((gloss, index) => (
        <GlossaryListEntry gloss={gloss} key={index} deleteData={props.deleteData} togglePopup={props.togglePopup} setEditObj={props.setEditObj} />
      ))}
    </div>
  )
};

export default GlossaryList;