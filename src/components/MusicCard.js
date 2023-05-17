import { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { albunsFilter } = this.props;
    return (
      <div>
        {
          albunsFilter.map(({ artistName, artworkUrl60, trackName, previewUrl,
          }, index) => (
            <div
              key={ index }
            >
              <img
                src={ artworkUrl60 }
                alt={ artistName }
              />
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
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
  })).isRequired,
};
export default MusicCard;
