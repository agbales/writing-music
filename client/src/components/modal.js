import React from 'react';
import {Button, Col, Row} from 'react-materialize';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const closeBar = {
            width: "100%",
            margin: "5px",
            backgroundColor: "#fff",
            color: "#181818",
            boxShadow: "0 5 0 0"
        }

        const modalStyles = {
            position: "fixed", 
            zIndex: "9999",
            padding: "20px", 
            left: "0",
            top: "0",
            margin: "0 auto",
            width: "100%",
            height: "100%",
            overflow: "auto", 
            backgroundColor: "rgb(0,0,0)",
            backgroundColor: "rgba(0,0,0,0.8)",
            textAlign: "center"
        }

        const recStyle = {
            maxWidth: "500px",
            margin: "0 auto"
        }

        let colStyle = {
            display: "inline-block",
            backgroundColor: "#fff",
            width: "80vw",
            height: "90vh",
            overflow: "auto"
        }

        return(
            <div>
                { this.props.isOpen
                    ? (<div>
                        <Row style={modalStyles}>
                            <div style={colStyle}>
                                <a className="waves-effect waves-light btn modal-trigger" onClick={this.props.closeModal} style={closeBar}>close</a>
                                <ul className="flex-container">
                                    { this.props.recommendations.map( (rec, index) => {
                                        return(
                                            <li key={index} className="flex-item">
                                                <div className="card-panel">
                                                    <a href={rec.album.external_urls.spotify} target="_blank">
                                                        <img 
                                                            src={rec.album.images[1].url} 
                                                            className="shadow"
                                                            style={ {maxHeight: "300px", objectFit: "contain"} } 
                                                        />  
                                                    </a>                                     
                                                    <h5>{rec.album.artists[0].name}</h5>
                                                    <p><i>{rec.album.name}</i></p>
                                                </div>
                                            </li>);
                                        })
                                    }
                                </ul> 
                            </div>     
                        </Row>
                    </div>)
                    : (<div />)
                }
            </div>)
    }
}
