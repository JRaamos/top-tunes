import { Component } from 'react';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    carregando: false,
    music: [],
  };

  async componentDidMount() {
    this.adicionarFavorit();
  }

  adicionarFavorit = async () => {
    this.setState({ carregando: true });
    const results = await getFavoriteSongs();
    this.setState({ carregando: false });
    this.setState({ music: results });
  };

  handleRemoveFavorite = (musics) => {
    const { music } = this.state;
    const filterFavorites = music.filter(
      (song) => song.trackId !== musics.trackId,
    );
    this.setState({ music: filterFavorites });
  };

  render() {
    const { music } = this.state;
    const { carregando } = this.state;
    return (
      <div
        data-testid="page-favorites"
      >
        <Header />
        {carregando && <Carregando />}
        {
          music.map((musicas) => (

            <MusicCard
              key={ musicas.trackId }
              music={ musicas }
              handleRemoveFavorite={ this.handleRemoveFavorite }
            />
          ))
        }
      </div>
    );
  }
}
export default Favorites;
