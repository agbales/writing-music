
import React from 'react';
import {CardPanel, Chip, Button} from 'react-materialize';

export default class Cards extends React.Component {

    constructor(props) {
        super(props);
        this.getRecommendations = this.getRecommendations.bind(this);
        this.getSpotifyAuthorization = this.getSpotifyAuthorization.bind(this);
        this.getBandId = this.getBandId.bind(this);
    }

    onRecommendationsClick(artist){
        // 1) authorize’ endpoint, passing to it the client ID, scopes, and redirect URI
        // 2) /api/token’ endpoint, passing to it the authorization code returned by the first call and the client secret key.
        // --> 
        
        console.log(this.getSpotifyAuthorization)

        const getId = this.getBandId(artist);
        getId.then(id=> this.getRecommendations(id))
    }

    getSpotifyAuthorization(){
        fetch("https://accounts.spotify.com/authorize&client_id=c2e56ee7705d4d919e509dc827dfb6a9")
            .then(response => response.json())
    }

    getBandId(artist) {
        const bandLookup = 'https://api.spotify.com/v1/search?';
        let query = "q=" + artist + "&type=artist&client_id=c2e56ee7705d4d919e509dc827dfb6a9";
    
        console.log('looking up ', artist);
        
        fetch(bandLookup + query, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                // let id = json.artists.items[0].id;
                // return id;
            })
            .catch(function(error) {
                console.log('Request failed', error)
            })
    }

    getRecommendations(id) {
        fetch("https://api.spotify.com/v1/recommendations?market=US&seed_artists=" + id + "&min_energy=0.4&min_popularity=50", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer BQCHowy1iH9mJ-A_w3xlu0AjPV6YRyV_p_2pqqsudnUg2aW2SJ7LumQBFsbOnDyAWnN2_5XntLDdPZEXMhwGv8RS4zAwbw2y0V-KIb1ZLCh0YjvCiNDei7ImR_rx7SqgAuTPuN4"
            }
        })
        .then(response => response.json())
        .then(recommendations => {
            console.log('Recommendations', recommendations)
            return recommendations;
        })
        .catch(function(error) {
            console.log('Request failed', error)
        })
    }
    
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
    
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }
    
    render() {
        return(
            <ul className="flex-container">
                { this.props.listings.map( (listing, index) => {
                        return(
                            <li key={index} className="flex-item">
                                <CardPanel>
                                    <img 
                                        src={listing.albumcover} 
                                        className="shadow"
                                        style={ {maxHeight: "200px", width: "100%", objectFit: "contain"} } 
                                    />
                                    <h5>{listing.artist}</h5>
                                    <p><i>{listing.album}</i> ({listing.year})</p>
                                    <p><Chip><b>From:</b>  {listing.addedby}</Chip><Chip><b>Lyrics?</b> {listing.lyrics}</Chip></p>
                                    <Button data-video={listing.audio} onClick={this.props.updateNowPlaying}>Listen</Button>
                                    <Button onClick={() => this.getBandId(listing.artist)}>Find More</Button>
                                </CardPanel>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}


