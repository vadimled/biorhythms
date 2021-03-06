import React from 'react';
import './style.scss'

const CustomCard = props => {
  return (
    <div className={"wrapper"}>
      <div className="card">
        <div className="card-title">{props.title}</div>
        <div className="card-body">
          {props.children}
        </div>
      </div>
    </div>
  )
};

export default CustomCard;
