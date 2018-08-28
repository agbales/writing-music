import React from 'react';
import {Col, Button, Collection, CollectionItem} from 'react-materialize';

export default class Cards extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let recs = this.props.recommendations;
        const modalStyles = {
            position: "fixed", 
            zIndex: "9999",
            padding: "20px", 
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto", 
            backgroundColor: "rgb(0,0,0)",
            backgroundColor: "rgba(0,0,0,0.8)"
        }

        const recStyle = {
            maxWidth: "500px",
            margin: "0 auto"
        }

        const colStyle = {
            backgroundColor: "#fff",
            width: "100%"
        }

        return(
            <div>
                { this.props.isOpen
                    ? (<div style={modalStyles}>
                            <Col m={7} s={12} style={colStyle}> 
                                <Button onClick={this.props.closeModal}>close</Button>
                                <Collection header='Recommendations'>
                                    {typeof recs != undefined && recs.length > 1
                                        ? (<div>
                                                {recs.map( (track, index) => {
                                                    return(<div key={index} style={recStyle}>
                                                                <CollectionItem href={track.album.external_urls.spotify} target="_blank">
                                                                    <img src={track.album.images[2].url} style={ {margin: "5px", float: "left"} }/>
                                                                    <p>{track.album.artists[0].name}</p>
                                                                    <p><i>{track.album.name}</i></p>
                                                                </CollectionItem>
                                                            </div>)
                                                })}
                                            </div>)
                                        : (<div>Loading...</div>)
                                    }

                                </Collection>
                            </Col>
                        </div>)
                    : (<div />)
                }
            </div>)
    }
}


