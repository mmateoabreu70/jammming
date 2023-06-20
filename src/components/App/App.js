import React, { useCallback, useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { data } from '../../services/data';

function App() {
  const [searchResults, setSearchResults] = useState(data);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const playlistName = 'New playlist';

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some(savedTrack => savedTrack.id === track.id))
        return;
      
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
    }, 
    [playlistTracks]
  );

  return (
    <div>
      <h1>
        Ja<span className='highlight'>mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
