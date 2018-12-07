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
            backgroundColor: "#fff",
            width: "50vw",
            height: "90vh",
            overflow: "auto"
        }

        return(
            <div>
                { this.props.isOpen
                    ? (<div>
                        <Row style={modalStyles}>
                            <Col s={12} m={10} style={colStyle}> 
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
                            </Col>
                        </Row>
                    </div>)

                    // OLD LIST STYLE...
                    // ? (<div style={modalStyles}>
                    //         <div class="m6 s12" offset="m3 s2" style={colStyle}> 
                    //             <a class="waves-effect waves-light btn modal-trigger" onClick={this.props.closeModal}>close</a>
                    //             <ul class="collection" header="Recommendations">
                    //                 {typeof recs != undefined && recs.length > 1
                    //                     ? (<div>
                    //                             {recs.map( (track, index) => {
                    //                                 return(<div key={index} style={recStyle}>
                    //                                             <li className="collection-item">
                    //                                                 <a href={track.album.external_urls.spotify} target="_blank">
                    //                                                     <img src={track.album.images[2].url} style={ {margin: "5px", float: "left"} }/>
                    //                                                 </a>
                    //                                                 <p>{track.album.artists[0].name}</p>
                    //                                                 <p><i>{track.album.name}</i></p>
                    //                                             </li>
                    //                                         </div>)
                    //                             })}
                    //                         </div>)
                    //                     : (<div>Loading...</div>)
                    //                 }

                    //             </ul>
                    //         </div>
                    //     </div>)
                    : (<div />)
                }
            </div>)
    }
}


