import { Component } from 'react';
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
        {
          carregando ? <Carregando />
            : <p data-testid="header-user-name">{ name }</p>
        }
      </header>
    );
  }
}
export default Header;
