import React from 'react';
import ReactDOM from 'react-dom';
import {CardPanel, Button } from 'react-materialize';
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
            modalIsOpen: false,
            recommendationsId : 0
        }

        this.clearRecommndations = this.clearRecommndations.bind(this);
        this.getBandId = this.getBandId.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    clearRecommndations() {
        const empty = { tracks : [{ 
                            album : {
                                artists: [{ name: '' }], 
                                name: '',
                                external_urls: { spotify : '' },
                                images: [{},{},{url: ''}]
                            }
                        }] 
                    };
        this.setState({ recommendations : empty});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    onRecommendationsClick(artist, cardId) {
        this.clearRecommndations();
        this.openModal()

        const access_token = this.props.token;
        // use access token to get band ID, then get recs
        // console.log('token? ', access_token)
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
                let id = json.artists.items[0].id;
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
                // console.log('Recommendations', recommendations)
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
    
        // console.log('looking up ', artist);
        
        fetch(bandLookup + query, {
                headers: {
                    "Authorization": 'Bearer ' + accessToken,
                }
            })
            .then(response => response.json())
            .then(json => {
                let id = json.artists.items[0].id;
                return id;
            })
            .catch(function(error) {
                console.log('Request failed', error)
            })
    }
    
    render() {
        let recs = this.state.recommendations.tracks;
        
        let buttonStyle = {
            backgroundColor: "#fff",
            color: "#181818",
            boxShadow: "0 5 0 0"
        }

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
                                <p><div className="chip"><b>From:</b>  {listing.addedby}</div><div className="chip"><b>Lyrics?</b> {listing.lyrics}</div></p>
                                <Button className="waves-effect waves-light btn" 
                                        data-video={listing.audio} 
                                        onClick={this.props.updateNowPlaying} 
                                        style={buttonStyle}>Listen</Button>
                                <Button className="waves-effect waves-light btn" 
                                        onClick={() => {this.onRecommendationsClick(listing.artist, index)} } 
                                        style={buttonStyle}>Similar</Button>
     
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


