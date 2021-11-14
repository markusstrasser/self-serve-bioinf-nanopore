import React, { useState } from 'react';
import { head } from 'ramda';
import PropTypes from 'prop-types';

export default function Selectable({ options = ['a', 'b'], children, onUpdate }) {
  // console.log(options, 'options')

  const [selection, setSelection] = useState(head(options));
  return (
    <React.Fragment>
      <select
        name="select"
        id=""
        onChange={({ target }) => {
          const { value } = target;
          setSelection(value)
          onUpdate(value)
        }
        }
      >
        {options.map(b => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      {children(selection)}
    </React.Fragment>
  );
}
// options: ['No Options'],

Selectable.defaultProps = {
  children: () => <React.Fragment />,
};

Selectable.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
