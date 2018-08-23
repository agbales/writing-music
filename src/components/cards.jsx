
import React from 'react';
import {CardPanel, Chip, Button} from 'react-materialize';

export default class Cards extends React.Component {

    constructor(props) {
        super(props);
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
                                </CardPanel>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}


