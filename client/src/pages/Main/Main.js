import React, {Component, Fragment} from 'react';
import './style.scss';
import chart from '../../images/chart.png';
// import PropTypes from 'prop-types';
import LoginContainer from "../../containers/LoginContainer";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <article className="main-wrapper">
          <section className="main-showcase">
            <img src={chart} alt="Biorhythms showcase of Chart"/>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur debitis deleniti deserunt dicta
              earum, enim ex fugiat illo impedit labore neque nobis, nulla optio quibusdam quis quisquam, saepe sed
              temporibus? </p>
          </section>
          <section>
            <LoginContainer/>
          </section>
        </article>
      </Fragment>
    );
  }
}

// Biorhythms.propTypes = {};

export default Main;
