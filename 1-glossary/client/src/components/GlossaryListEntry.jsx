import React from 'react';

const GlossaryListEntry = (props) => (
  <div>
    <div>
      {/* this is each individual word */}
      {(props.gloss.definition !== undefined) ? `${props.gloss.word}: ${props.gloss.definition}` : `${props.gloss.word}`}
      <button onClick={(e) => {
        props.setEditObj(props.gloss);
        props.togglePopup();
      }}>edit</button>
      <button onClick={() => props.deleteData(props.gloss)}>X</button>
    </div>
  </div>
);

export default GlossaryListEntry;