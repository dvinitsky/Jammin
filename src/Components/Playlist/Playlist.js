import React from 'react';
import Tracklist from '.././Tracklist/Tracklist';

export class Playlist extends React.Component {
  
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  
  handleNameChange(e){
    this.props.onNameChange(e.value);
  }
  
  render() {
    return(
      <div className="Playlist">
        <input value={'New Playlist'} onChange={function(){this.handleNameChange()}}/>
            <Tracklist tracks={this.props.playlistTracks} onRemove = {this.props.onRemove}/>
        <a className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
  
}
