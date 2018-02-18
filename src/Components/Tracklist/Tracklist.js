import React from 'react';
import Track from '../Track/Track';

class Tracklist extends React.Component {
  render(){
    console.log('Props passed in to Tracklist module: ' + this.props.tracks);
      if(this.props.tracks === undefined){
            return (
              
              <div className="TrackList">Search did not retrieve results.</div>
              
            )
      } 
    
      else {
      return(
        <div className="TrackList">
          
        {this.props.tracks.map(currentTrack => {      
          return <Track key={currentTrack.id} track = {currentTrack} onAdd = {this.props.onAdd} onRemove = {this.props.onRemove}/>
        })
        }
        
      </div>
      )
    }   
  }
}
  

export default Tracklist;