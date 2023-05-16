import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends Component {
  state = {
    nameLogin: '',
    carregando: false,
  };

  disablebutton = async (e) => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    e.preventDefault();
    this.setState({ carregando: true });
    await createUser({ name: nameLogin });
    this.setState({ carregando: false });
    history.push('/search');
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState(() => ({
      [name]: target.value,
    }));
  };

  render() {
    const { nameLogin, carregando } = this.state;
    const length = 3;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="nameLogin"
              value={ nameLogin }
              onChange={ this.onInputChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            disabled={ (nameLogin.length < length) }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.disablebutton }
          >
            Entrar
          </button>
          {
            carregando ? <Carregando /> : <div />
          }
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
Login.defaultProps = {
  history: {
    push: () => {},
  },
};
export default Login;
