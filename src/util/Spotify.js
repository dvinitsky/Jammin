let userAccessToken;
let appClientId = '35b6b50d55e74216a51d6c7e7cce881a';
let redirectURI = "http://daniel_v_jammin.surge.sh";


export const Spotify = {
  getAccessToken(){
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
  },
 searchSpotify(searchTerm){
  const accessToken = Spotify.getAccessToken();
  return fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm,
      {headers: {
             'Authorization': 'Bearer ' + accessToken
  }}).then(response => {  
             if(response.ok) {
                return response.json();         
             } throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
         return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }));
      });
 },
savePlaylist(name, trackList){
  if(name === undefined || name === '' || trackList === undefined || trackList === []){
    return;
  }
  
  let trackArray = [];
  for(let i = 0; i < trackList.length; i++){
    trackArray.push(trackList[i].id);
  };
  
  const accessToken = userAccessToken;
  const headers = {
      'Authorization':  'Bearer ' + accessToken,
    };
  let userID = '';
  
    fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
      if(response.ok) {
          return response.json();
      }  
      throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
      return jsonResponse.id;
  }).then(id => {
      userID = id;
     const urlString = 'https://api.spotify.com/v1/users/' + userID + '/playlists'; 
      return fetch(urlString, {
	method: 'POST',
    body: JSON.stringify({name: name}),
    headers: headers
  }).then(response => {
      if(response.ok) {
          return response.json();
      }  
      throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
     return jsonResponse.id;
  }).then(playlistID => {
        let newUrlString = 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks';
                
        return fetch(newUrlString, {
        method: 'POST',
        body: JSON.stringify({uris: trackArray}),
        headers: headers
  }).then(response => {
      if(response.ok) {
          return response.json();
      }  
      throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)
  ).then(x => {
          return x;
        })});
  
  });
  
 }
  
};





