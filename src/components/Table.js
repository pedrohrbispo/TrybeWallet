import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions/index';
import Button from './tools/button';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      showEditForm: false,
      editClick: false,
      valueConverted: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderTheadTable = this.renderTheadTable.bind(this);
  }

  onClick({ target }) {
    const { expenses, dispatchToReducer } = this.props;
    const { id } = target;
    const expensesAfterDelete = expenses.filter((expen) => expen.id !== parseInt(id, 10));
    dispatchToReducer(expensesAfterDelete);
  }

  editClick({ target }) {
    const { expenses, getState } = this.props;
    const { id } = target;
    const expensesToEdit = expenses.find((expense) => expense.id === parseInt(id, 10));
    const { currency, value, method, tag, description } = expensesToEdit;
    this.setState(() => ({
      value,
      id,
      description,
      currency,
      method,
      tag,
      showEditForm: true,
      editClick: true,
    }), () => getState(this.state));
  }

  renderTheadTable() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  renderTable() {
    const { expenses } = this.props;
    return (
      <table>
        { this.renderTheadTable() }
        <tbody>
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>
                { exp.value }
              </td>
              <td>{ exp.exchangeRates[exp.currency].name }</td>
              <td>{ parseFloat((exp.exchangeRates[exp.currency].ask)).toFixed(2) }</td>
              <td>
                {
                  parseFloat((exp.value * exp.exchangeRates[exp.currency].ask)).toFixed(2)
                }
              </td>
              <td>Real</td>
              <Button
                text="Deletar"
                onClick={ this.onClick }
                testId="delete-btn"
                id={ exp.id }
              />
              <Button
                text="Edit"
                onClick={ this.editClick }
                testId="edit-btn"
                id={ exp.id }
              />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        { this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,

});
const mapDispatchToProps = (dispatch) => ({
  dispatchToReducer: (array) => dispatch(deleteExpense(array)),
});

Table.propTypes = {
  dispatchToReducer: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
