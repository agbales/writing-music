
import React from 'react';
import {Row, Col, CardPanel, Chip, Button} from 'react-materialize';

export default class Cards extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ul className="flex-container">
                { this.props.listings.map( (listing, index) => {
                        return(
                            <li key={index} className="flex-item">
                                <CardPanel>
                                    <img src={listing.albumcover} 
                                        style={ {maxHeight: "200px", width: "100%", objectFit: "contain"} } 
                                    />
                                    <h5>{listing.artist}</h5>
                                    <p><i>{listing.album}</i> ({listing.year})</p>
                                    <p><Chip><b>From:</b>  {listing.addedby}</Chip><Chip><b>Lyrics?</b> {listing.lyrics}</Chip></p>
                                    <Button data-video={listing.audio} onClick={this.props.updateNowPlaying}>Listen</Button>
                                </CardPanel>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}


