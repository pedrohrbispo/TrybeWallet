import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { testId, id, onClick, text } = this.props;
    return (
      <td>
        <button
          data-testid={ testId }
          type="button"
          id={ id }
          onClick={ onClick }
        >
          { text }
        </button>
      </td>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
}.isRequired;

export default Button;
