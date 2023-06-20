import React, { useCallback, useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { data } from '../../services/data';

function App() {
  const [searchResults, setSearchResults] = useState(data);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some(savedTrack => savedTrack.id === track.id))
        return;
      
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
    }, 
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map(track => track.uri);
    let newPlaylist = {
      name: playlistName,
      tracks: trackUris
    };

    console.log(newPlaylist);
  }, [playlistName, playlistTracks]);

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
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
