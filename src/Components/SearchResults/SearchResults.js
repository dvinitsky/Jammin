import React from 'react';
import Tracklist from '.././Tracklist/Tracklist';

export class SearchResults extends React.Component {
  
  render() {
    return (
    <div className="SearchResults">
      <h2>Results</h2>
      {console.log('Passing from SearchResults module to Tracklist module: ' + this.props.searchResults)}
        <Tracklist tracks = {this.props.searchResults} onAdd = {this.props.onAdd}/>
      </div>
    
    );
    
  }
}