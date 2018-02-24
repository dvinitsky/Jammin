import React from 'react';


export class SearchBar extends React.Component {
  
  constructor(props){
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.state= {
      
    };
  }
  
  handleTermChange(e){
    this.setState({term: e.target.value});
  }
  
  search(){
    this.props.onSearch(this.state.term);
  }

  keyPressHandler(event){
    if(event.keyCode === 13){
      this.search();
    }
  }
  
  render(){
    return(
      <div className="SearchBar">
        <input onKeyDown={this.keyPressHandler} placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    
    );
    
  }
  
}