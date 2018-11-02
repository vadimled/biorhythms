import React from 'react';
import './style.scss';

const Button = (props) => (
    <button
        disabled={props.disabled || false}
        className={props.className}
        onClick={props.onClick}>{props.children}</button>
);

export default Button;
