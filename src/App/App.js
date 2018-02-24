import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '.././Components/SearchBar/SearchBar';
import {SearchResults} from '.././Components/SearchResults/SearchResults';
import {Playlist} from '.././Components/Playlist/Playlist';
import {Spotify} from '.././util/Spotify';

class App extends Component {
  
  constructor(props){
    super(props);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [],            
      playlistName: 'New Playlist',
      playlistTracks: []
    }
  }
  
  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }
  
  addTrack(track){
    let tracks = this.state.playlistTracks;
    track.id = 'spotify:track:' + track.id;
    
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
        return;
    }
    
    tracks.push(track);
    this.setState({playlistTracks: tracks});    
  }
  
  removeTrack(track){
    let tracks = this.state.playlistTracks;

    for(let i = 0; i < tracks.length; i++){
      if(tracks[i].id === track.id){

        let firstPart = tracks.slice(0, i);
        let lastPart = tracks.slice(i+1, tracks.length);

        let newTracks = firstPart.concat(lastPart);
        
        this.setState({playlistTracks: newTracks});
      }
    }
  }
  
  savePlaylist(){
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks);
    this.setState({playlistName: 'New Playlist'});
    this.setState({searchResults: []});
  }
  
  search(term){
    
    Spotify.searchSpotify(term).then(newResults => {      this.setState({searchResults: newResults});  
    });
    
  }
  
  
  render() {
    return (
       <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch = {this.search}/>
        <div className="App-playlist">
          
        <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>    

        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>

        </div>
      </div>
    </div>
    );
  }
}

export default App;
