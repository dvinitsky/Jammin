let userAccessToken;
let appClientId = '35b6b50d55e74216a51d6c7e7cce881a';
let redirectURI = "http://localhost:3000/";


export function searchSpotify(searchTerm){
  
  return fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm,
      {headers: {
             'Authorization': 'Bearer ' + getAccessToken()
  }}).then(response => {  
             if(response.ok) {
                return response.json();         
             } throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
         return 
         jsonResponse.tracks.items.map(function(track){
            console.log('Track: ' + track);
 
           return {
              ID: track.id,
              Name: track.name,
              Artist: track.artists[0].name,
              Album: track.album.name,
              URI: track.uri
            };
          });          
  });
    
  //return [{ID: '001', Name: 'Hi', Artist: 'Go', Album: 'bo', URI: 'bbb'}];
}


  function getAccessToken(){
    if(typeof userAccessToken !== 'undefined'){
      return userAccessToken;
    } 
    else if (
      (window.location.href.match(/access_token=([^&]*)/) !== null) && (window.location.href.match(/expires_in=([^&]*)/) !== null)) {
        
      userAccessToken = window.location.href.substring(window.location.href.indexOf('access_token=') + 13,window.location.href.indexOf('&token_type'));
      
      let expirationTime = 3600;      
      
      //given from instructions
      window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      //
      
      return userAccessToken;
    }
    
    else {
      window.location = 'https://accounts.spotify.com/authorize?client_id=' + appClientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI;

    }
  }
  
