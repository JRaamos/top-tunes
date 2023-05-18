import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albuns: [],
    albunsFilter: [],
  };

  async componentDidMount() {
    const { match: {
      params: { id },
    } } = this.props;
    const results = await getMusics(id);
    const resultsFilter = results.filter((_element, index) => index !== 0);
    this.setState({ albuns: results[0], albunsFilter: resultsFilter });
  }

  render() {
    const { albuns, albunsFilter } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <div>
            <img src={ albuns.artworkUrl60 } alt={ albuns.artistName } />
            <p data-testid="artist-name">{albuns.artistName}</p>
            <p data-testid="album-name">{albuns.collectionName}</p>
          </div>
          {
            albunsFilter.map((musicas) => (
              <MusicCard
                key={ musicas.trackId }
                music={ musicas }
              />
            ))
          }
        </div>
      </div>

    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
