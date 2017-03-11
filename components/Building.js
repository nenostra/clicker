import React from 'react';

export const Building = (props) => {
  const onClick = props.onClick.bind(null, props.name)
  return (
  <div>   
    <button onClick={onClick}>Buy 1 {props.name.name} for {props.name.price}</button>: {props.name.num}
  </div>
  );
  
}