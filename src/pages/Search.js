import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends Component {
  state = {
    artista: '',
    name: '',
    carregando: false,
    api: false,
    albuns: [],
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
      name: value,
    }));
  };

  renderRequest = async (e) => {
    e.preventDefault();
    const { artista } = this.state;
    this.setState({ carregando: true });
    const results = await searchAlbumsAPI(artista);
    this.setState({ carregando: false, api: true, artista: '', albuns: results });
  };

  render() {
    const { artista, carregando, api, name, albuns } = this.state;
    const length = 2;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <form>
          {
            carregando ? (
              <Carregando />
            ) : (
              <div>
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
                  onClick={ this.renderRequest }
                >
                  Pesquisar
                </button>
              </div>
            )
          }
          {
            !api ? (''
            ) : (
              <p>{`Resultado de álbuns de: ${name}`}</p>
            )
          }
        </form>
        {
          albuns.length === 0 ? (<p> Nenhum álbum foi encontrado </p>) : (
            <div>
              {
                albuns.map(({ artistId, artistName, artworkUrl100,
                  collectionName, collectionId,
                }) => (
                  <div key={ artistId }>
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      Album
                    </Link>
                    <img src={ artworkUrl100 } alt={ artistName } />
                    <h3>{artistName}</h3>
                    <h3>{collectionName}</h3>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}
export default Search;
