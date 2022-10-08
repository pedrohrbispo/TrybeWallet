import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleChange({ target }) {
    const LENGTH_PASSWORD = 6;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    const { email, password } = this.state;
    const isValidEmail = this.validateEmail(email);
    if ((password.length + 1) >= LENGTH_PASSWORD && isValidEmail) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { email, isDisable } = this.state;
    const { login: loginUser } = this.props;
    return (
      <div className="form-login">
        <input
          data-testid="email-input"
          name="email"
          type="text"
          placeholder="Email"
          onChange={ this.handleChange }
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="Senha"
          name="password"
          onChange={ this.handleChange }
        />

        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisable }
            onClick={ () => loginUser({ email }) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
