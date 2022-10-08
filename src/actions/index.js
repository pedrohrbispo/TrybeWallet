import getCurrencies from '../api/currencyAPI';

export const login = (user) => ({ type: 'LOGIN', user });
export const addToWallet = (wallet) => ({ type: 'ADD_TO_WALLET', wallet });
export const disableEdit = () => ({ type: 'DISABLE_EDIT' });
export const deleteExpense = (expenses) => (
  {
    type: 'DELETE_EXPENSE',
    expenses,
  });
export const editExpenses = (expenses, edit) => (
  {
    type: 'EDIT_EXPENSE',
    expenses,
    edit,
  });

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const receiveCurrenciesFailure = (error) => ({
  type: 'RECEIVE_CURRENCIES_FAILURE',
  error,
});

const receiveCurrenciesSuccess = (data) => ({
  type: 'RECEIVE_CURRENCIES_SUCCESS',
  currencies: data,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return getCurrencies()
      .then(
        (data) => dispatch(receiveCurrenciesSuccess(data)),
        (error) => dispatch(receiveCurrenciesFailure(error.message)),
      );
  };
}
