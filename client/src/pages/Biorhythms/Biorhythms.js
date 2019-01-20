import React, {Component, Fragment} from 'react';
import './style.scss';
import chart from '../../images/chart.png';
// import PropTypes from 'prop-types';
import LoginContainer from "../../containers/LoginContainer";

class Biorhythms extends Component {
  render() {
    return (
      <Fragment>
        <article className="biorhythms-wrapper">
          <section className="biorhythms-showcase">
            <h1>Biorhythms page</h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur debitis deleniti deserunt dicta
              earum, enim ex fugiat illo impedit labore neque nobis, nulla optio quibusdam quis quisquam, saepe sed
              temporibus? </p>
          </section>
        </article>
      </Fragment>
    );
  }
}

// Biorhythms.propTypes = {};

export default Biorhythms;
