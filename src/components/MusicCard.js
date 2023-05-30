import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends Component {
  state = {
    carregando: false,
    favorit: false,
  };

  async componentDidMount() {
    const { music } = this.props;
    const musica = await getFavoriteSongs();
    const favorits = musica.some(({ trackId }) => trackId === music.trackId);
    this.setState({ favorit: favorits });
  }

  favoritoSong = async (musica) => {
    this.setState({ carregando: true });
    await addSong(musica);
    this.setState(() => ({
      carregando: false,
      favorit: 'checked',
    }));
  };

  removeFavoritoSong = (musica) => {
    this.setState({ carregando: true });
    const { handleRemoveFavorite } = this.props;
    removeSong(musica).then(() => {
      handleRemoveFavorite(musica);
    }).catch((error) => error).finally(() => this.setState(() => ({
      carregando: false,
      favorit: false,
    })));
  };

  render() {
    const { music: { artworkUrl60, artistName,
      trackId, trackName, previewUrl } } = this.props;
    const { music } = this.props;
    const { carregando, favorit } = this.state;

    return (
      <div>
        {carregando && <Carregando />}
        <div>
          <img src={ artworkUrl60 } alt={ artistName } />
          <label>
            Favorita
            <input
              checked={ favorit }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ ({ target }) => {
                if (target.checked) {
                  this.favoritoSong(music);
                } else {
                  this.removeFavoritoSong(music);
                }
              } }
            />
          </label>
          <p>{trackName}</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  handleRemoveFavorite: PropTypes.func.isRequired,
};
export default MusicCard;
