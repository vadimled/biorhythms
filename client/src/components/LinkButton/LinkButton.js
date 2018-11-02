import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import Button from '../Button';

const LinkButton = (props) => {
  const { history, to, onClick, children, ...rest } = props;
  
  return (
    <Button {...rest} onClick={(event) => {
      onClick && onClick(event);
      history.push(to)
    }}>{children}</Button>
  )
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default withRouter(LinkButton)
