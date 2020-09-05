import React from 'react';
import PropTypes from 'prop-types';
import createMathComponent from './createMathComponent';

const InlineMath = ({ html, ...rest }) => {
  return <span dangerouslySetInnerHTML={{__html: html}} {...rest}/>;
};

InlineMath.propTypes = {
  html: PropTypes.string.isRequired
};

export default createMathComponent(InlineMath, { displayMode: false });
