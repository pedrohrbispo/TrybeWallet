import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { name, handleChange, testId, type, text, value } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {text}
          <input
            data-testid={ testId }
            type={ type }
            name={ name }
            id={ name }
            value={ value }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}.isRequired;

export default Input;
