import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.renderSelect = this.renderSelect.bind(this);
  }

  renderSelect(options) {
    const { handleSelectChange, arrayOptions, testId, value, text, name } = options;
    return (
      <div>
        <label htmlFor={ name }>
          { text }
          <select
            id={ name }
            data-testid={ testId }
            onChange={ handleSelectChange }
            name={ name }
            value={ value }
          >
            {arrayOptions.map((option) => (
              <option value={ option } key={ option } data-testid={ option }>
                { option}
              </option>))}
          </select>
        </label>

      </div>
    );
  }

  render() {
    const { handleSelectChange, currNames, currency, method, tag } = this.props;
    const options = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <div>
        { this.renderSelect({
          handleSelectChange,
          arrayOptions: currNames,
          testId: 'currency-input',
          value: currency,
          text: 'Moeda Utilizada',
          name: 'currency',
        })}
        { this.renderSelect({
          handleSelectChange,
          arrayOptions: paymentMethod,
          testId: 'method-input',
          value: method,
          text: 'Escolha o método de Pagamento',
          name: 'method',
        })}

        <label htmlFor="tag">
          Tipo de Despesa
          <select
            id="tag"
            value={ tag }
            name="tag"
            onChange={ handleSelectChange }
            data-testid="tag-input"
          >
            {options.map((option) => (
              <option value={ option } key={ option }>
                { option }
              </option>))}
          </select>
        </label>
      </div>
    );
  }
}

Select.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  currNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}.isRequired;

export default Select;
