import React, { Component } from 'react';
import './App.css';
import {SearchBar} from '.././Components/SearchBar/SearchBar';
import {SearchResults} from '.././Components/SearchResults/SearchResults';
import {Playlist} from '.././Components/Playlist/Playlist';
import {searchSpotify} from '.././util/Spotify';

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
    playlistTracks: [ {
      id: '005',
      name: 'Jungle',
      artist: 'Nesto',
      album: 'Earless'
    },
    {
      id: '006',
      name: 'Go for it!',
      artist: 'Okay Go',
      album: 'OKay Go'
    },
    {
      id: '008',
      name: 'Who dat bi***?',
      artist: 'Bri',
      album: 'Rip Volume 3'
    }]
                 
    }
  }
  
  updatePlaylistName(newName){
    this.setState({playlistName: newName});
  }
  
  addTrack(track){
    for(let i = 0; i < this.state.playlistTracks.length; i++){
      if(this.state.playlistTracks[i].id === track.id){
        return
      }
    }
    
    this.setState({playlistTracks: this.state.playlistTracks.push(track)});
    
  }
  
  removeTrack(track){
     for(let i = 0; i < this.state.playlistTracks.length; i++){
      if(this.state.playlistTracks[i].id === track.id){
        this.setState({playlistTracks: this.state.playlistTracks.splice(i,1)});

      }
    }
    
  }
  
  savePlaylist(){
    let trackURIs = [];
    
    for(let i = 0; i < this.props.playlistTracks.length; i++){
      trackURIs.push(this.props.playlistTracks[i].uri);
    }
    
    return trackURIs;
  }
  
  search(term){
    
    searchSpotify(term).then(newResults => {      this.setState({searchResults: newResults});  
    });
    
  }
  
  
  render() {

    return (
       <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch = {this.search}/>
        <div className="App-playlist">
        
      {    console.log('Passing into SearchResults module: ' + this.state.searchResults)}
  
        <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>    

        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName}/>

        </div>
      </div>
    </div>
    );
  }
}

export default App;
