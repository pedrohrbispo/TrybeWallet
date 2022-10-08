import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { disableEdit } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
    };

    this.getTotalPrice = this.getTotalPrice.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { expenses, edit, disableEditReducer } = this.props;
    if ((prevProps.expenses !== expenses) || edit) {
      this.getTotalPrice();
      disableEditReducer();
    }
  }

  getTotalPrice() {
    const { expenses } = this.props;
    if (expenses.length === 0) {
      this.setState({
        totalPrice: 0,
      });
      return;
    }

    const { exchangeRates } = expenses[0];
    let total = 0;
    expenses.forEach((expense) => {
      total += (expense.value * exchangeRates[expense.currency].ask);
    });
    this.setState({
      totalPrice: total,
    });
  }

  render() {
    const { email } = this.props;
    const { totalPrice } = this.state;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {totalPrice.toFixed(2)}
        </p>
        <p data-testid="header-currency-field"> BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  disableEditReducer: () => dispatch(disableEdit()),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
