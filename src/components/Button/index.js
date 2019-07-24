import React from 'react';

import './styles.sass';

const Button = props => {
  let classes = 'button ';
  classes += props.operation ? 'operation' : '';
  classes += props.double ? 'double' : '';
  classes += props.triple ? 'triple' : '';

  const handleBtnLabel = (e) => props.click && props.click(e.target.innerHTML);

  return (
    <button className={classes} onClick={handleBtnLabel}>
      {props.btnLabel}
    </button>
  );
};

export default Button;
