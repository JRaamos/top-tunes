import { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artista: '',
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { artista } = this.state;
    const length = 2;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <form>
          <label>
            <input
              type="text"
              name="artista"
              value={ artista }
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            disabled={ (artista.length < length) }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
