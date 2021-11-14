import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
export default function NumberSelect({
  min,
  max,
  value,
  onChange,
  children,
  isFireOnStart
}) {
  useEffect(() => {
    if (isFireOnStart) {
      //run onchange on init
      return onChange(value)

    }
  }, [])
  const [num, setNum] = useState(value);
  return (
    <React.Fragment>
      <input
        type="number"
        onChange={({ target }) => {
          const val = clamp(parseInt(target.value, 10), min, max);
          if (onChange) {
            onChange(val);
          }
          setNum(val);
        }}
        value={num}
        style={{ marginRight: '1rem', maxWidth: '3rem' }}
      />
      {children(num)}
    </React.Fragment>
  );
}

NumberSelect.defaultProps = {
  min: 0,
  max: 100,
  value: 5,
  isFireOnStart: true,
  onChange: () => { },
  children: () => <React.Fragment />,
};
// null or error
// const x = (tt) => console.log('tt', tt)
NumberSelect.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  isFireOnStart: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
