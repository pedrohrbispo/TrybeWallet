// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  edit: false,
};

const walletReducer = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      isFetching: true,
    };
  case 'ADD_TO_WALLET':
    console.log(action);
    return {
      ...state,
      expenses: [...state.expenses, action.wallet],
    };

  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'DISABLE_EDIT':
    return {
      ...state,
      edit: false,
    };
  case 'EDIT_EXPENSE':
    console.log(action);
    return {
      ...state,
      expenses: action.expenses,
      edit: action.edit,
    };

  case 'RECEIVE_CURRENCIES_SUCCESS':
    return {
      ...state,
      currencies: Object.keys(action.currencies),
      isFetching: false,
    };
  case 'RECEIVE_CURRENCIES_FAILURE':
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
