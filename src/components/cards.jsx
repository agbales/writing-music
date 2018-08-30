import React from 'react';
import ReactDOM from 'react-dom';
import {CardPanel, Chip, Button, Collection, CollectionItem} from 'react-materialize';
import queryString from 'query-string';
import Modal from './modal';

export default class Cards extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            recommendations: {
                tracks : [{ 
                    album : {
                        artists: [{ name: '' }], 
                        name: '',
                        external_urls: { spotify : '' },
                        images: [{},{},{url: ''}]
                    }
                }]
            },
            recommendationsId : 0
        }

        this.getBandId = this.getBandId.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onRecommendationsClick(artist, cardId) {
        this.openModal()

        const parsed = queryString.parse(window.location.search);
        const access_token = parsed.access_token;

        // use access token to get band ID, then get recs
        const bandLookup = 'https://api.spotify.com/v1/search?';
        const query = "q=" + artist + "&type=artist&client_id=c2e56ee7705d4d919e509dc827dfb6a9";
        console.log('looking up ', artist);
        
        fetch(bandLookup + query, {
                headers: {
                    "Authorization": 'Bearer ' + access_token,
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                let id = json.artists.items[0].id;
                console.log('id', id);
                return id;
            })
            .catch(function(error) {
                console.log('Request failed', error)
            })
        .then(id => {
            fetch("https://api.spotify.com/v1/recommendations?market=US&seed_artists=" + id + "&min_energy=0.4&min_popularity=50", {
                headers: {
                    "Authorization": "Bearer " + access_token
                }
            })
            .then(response => response.json())
            .then(recommendations => {
                console.log('Recommendations', recommendations)
                this.setState({ 
                    recommendations : recommendations,
                    recommendationsId : cardId
                })
            })
            .catch(function(error) {
                console.log('Request failed', error)
            })
        })
        .catch(err => console.log(err))
    }

    getBandId(artist, accessToken) {
        const bandLookup = 'https://api.spotify.com/v1/search?';
        let query = "q=" + artist + "&type=artist&client_id=c2e56ee7705d4d919e509dc827dfb6a9";
    
        console.log('looking up ', artist);
        
        fetch(bandLookup + query, {
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                let id = json.artists.items[0].id;
                console.log('id', id);
                return id;
            })
            .catch(function(error) {
                console.log('Request failed', error)
            })
    }

    getRecommendations(id) {
        console.log('got ID', id);
    //     fetch("https://api.spotify.com/v1/recommendations?market=US&seed_artists=" + id + "&min_energy=0.4&min_popularity=50", {
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer BQCHowy1iH9mJ-A_w3xlu0AjPV6YRyV_p_2pqqsudnUg2aW2SJ7LumQBFsbOnDyAWnN2_5XntLDdPZEXMhwGv8RS4zAwbw2y0V-KIb1ZLCh0YjvCiNDei7ImR_rx7SqgAuTPuN4"
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(recommendations => {
    //         console.log('Recommendations', recommendations)
    //         return recommendations;
    //     })
    //     .catch(function(error) {
    //         console.log('Request failed', error)
    //     })
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
        let recs = this.state.recommendations.tracks;
        console.log('recs', recs);

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
                                <Button onClick={() => {this.onRecommendationsClick(listing.artist, index)} }>Get Recommendations</Button>

                                {/* { this.state.recommendationsId == index && typeof this.state.recommendations.tracks != undefined && recs.length > 1
                                    ? (<div>
                                            <Collection header='Recommendations'>
                                            {recs.map( (track, index) => {
                                                return(<div key={index}>
                                                            <CollectionItem href={track.album.external_urls.spotify} target="_blank">
                                                                <img src={track.album.images[2].url} style={ {margin: "5px", float: "left"} }/>
                                                                <p>{track.album.artists[0].name}</p>
                                                                <p><i>{track.album.name}</i></p>
                                                            </CollectionItem>
                                                        </div>)
                                            })}
                                            </Collection>
                                        </div>)
                                    : (<div />)
                                } */}

                                
                                { this.state.recommendationsId == index && typeof this.state.recommendations.tracks != undefined
                                    ? (<Modal
                                            isOpen={this.state.modalIsOpen}
                                            closeModal={this.closeModal}
                                            contentLabel="Recommendations"
                                            recommendations={this.state.recommendations.tracks}
                                        />)
                                    : (<div />)
                                }
                            </CardPanel>
                        </li>);
                    })
                }
            </ul>
        )
    }
}


