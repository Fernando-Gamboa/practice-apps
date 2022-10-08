import React from 'react';
import ResponseListEntry from './ResponseListEntry.jsx';


const ResponseList = (props) => (
  <div>
    {props.data.map((res, index) => (
      <ResponseListEntry res={res} key={index} />
    ))}
  </div>
)

export default ResponseList;