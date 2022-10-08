import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editClick: false,
      state: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.getState = this.getState.bind(this);
    this.returnState = this.returnState.bind(this);
  }

  getState(object) {
    this.setState({
      state: object,
      editClick: true,
    });
  }

  returnState(id) {
    const state = {
      id,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.setState({
      state,
      editClick: false,
    });
  }

  render() {
    const { editClick, state } = this.state;
    return (
      <div>
        TrybeWallet
        <Header />
        { editClick === false && <Form
          type="initial"
          state={ state }
        /> }
        <Table getState={ this.getState } />
        { editClick && <Form
          type="edit"
          returnState={ this.returnState }
          state={ state }
        /> }

      </div>
    );
  }
}

export default Wallet;
