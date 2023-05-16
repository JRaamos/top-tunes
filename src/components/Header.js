import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends Component {
  state = {
    name: '',
    carregando: true,
  };

  renderHeader = async () => {
    const result = await getUser();
    this.setState({ carregando: false, name: result.name });
  };

  render() {
    this.renderHeader();
    const { name, carregando } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        {
          carregando ? <Carregando />
            : <p data-testid="header-user-name">{ name }</p>
        }
      </header>
    );
  }
}
export default Header;
