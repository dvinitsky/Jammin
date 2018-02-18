import React from 'react';


export class SearchBar extends React.Component {
  
  constructor(props){
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.state= {
      
      
    };
  }
  
  handleTermChange(e){
    this.setState({term: e.target.value});
    this.search();
  }
  
  search(){
    this.props.onSearch(this.state.term);
  }

  
  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
        <a>SEARCH</a>
      </div>
    
    );
    
  }
  
}