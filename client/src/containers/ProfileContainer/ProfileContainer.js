import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Popover, PopoverBody, PopoverHeader} from "reactstrap";
import './style.scss'

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      popoverOpen: false
    };
    
  }
  
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };
  
  
  render() {
    const {img, name} = this.props;
    return (
      <div>
        <div id="private-picture" className="private-picture-wrapper" onClick={this.toggle}>
          <img className="private-picture" src={img} alt=""/>
        </div>
        
        <Popover placement="bottom-end" isOpen={this.state.popoverOpen} target="private-picture" toggle={this.toggle}>
          <PopoverHeader>Signed in as <strong>{name}</strong></PopoverHeader>
          <PopoverBody>
            <a className="Button Button--success" href="/api/logout">Logout</a>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string
};

const mapStateToProps = state => {
  return {
    img: state.user.data.image,
    name: state.user.data.name
  }
};

/*
const mapDispatchToProps = dispatch => {
  return {
    mode: (data) => dispatch(actions.setHeaderButtonsMode(data)),
    onRegistered: (mode) => dispatch(userRegisteredSuccess(mode))
  }
};
*/

export default withRouter(connect(mapStateToProps)(ProfileContainer));

