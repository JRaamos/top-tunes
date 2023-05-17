import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    carregando: false,
    musicas: [],
  };

  favoritoSong = async (musica) => {
    this.setState({ carregando: true });
    await addSong(musica);
    this.setState((prev) => ({
      ...prev,
      musicas: musica,
      carregando: false,
    }));
  };

  render() {
    const { albunsFilter } = this.props;
    const { carregando } = this.state;

    return (
      <div>
        {carregando && <Carregando /> }

        {
          albunsFilter.map((element, index) => (
            <div
              key={ index }
            >
              <img
                src={ element.artworkUrl60 }
                alt={ element.artistName }
              />

              <label>
                Favorito

                <input
                  onChange={ ({ target }) => target.checked
                  && this.favoritoSong(element) }
                  type="checkbox"
                  data-testid={ `checkbox-music-${element.trackId}` }
                />

              </label>
              <p>{element.trackName}</p>
              <audio data-testid="audio-component" src={ element.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>

          ))
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  albunsFilter: PropTypes.arrayOf(PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  })).isRequired,
};
export default MusicCard;
