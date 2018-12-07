import React, { Component } from 'react';
import GetSheetDone from 'get-sheet-done';
import Cards from './components/cards.jsx';
import {Row, Col} from 'react-materialize';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { listings : [],
                   token: '',
                   nowPlaying: 'https://www.youtube.com/embed/GZh9D2nTB24' 
                  };
    this.getGoogleSheet = this.getGoogleSheet.bind(this);
    this.updateNowPlaying = this.updateNowPlaying.bind(this);
  }

  componentDidMount() {
    this.getGoogleSheet();
    this.getSpotifyToken()
      .then(response => {
        console.log('spotify token: ', response.token)
        this.setState({token: response.token})
      })
      .catch(err => console.log('Spotify Token unavailable', err));
  }

  getSpotifyToken = async () => {
    const response = await fetch('/spotifyToken');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getGoogleSheet() {
    const spreadsheetId = "1SKdOtCncMCtEr7yFrnRi9ggZxgIFOXwxTPQ47vjr0wo"
    
    GetSheetDone.labeledCols(spreadsheetId).then(sheet => {
      this.setState({ listings : sheet.data });
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    })
  }

  shuffleListings() {
    const array = this.state.listings;
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({listings: array});
  }

  updateNowPlaying(e){
    let update = e.target.dataset.video;
    this.setState({ nowPlaying : update });
  }

  render() {

    if (this.state.nowPlaying.includes('spotify')) {
      let win = window.open(this.state.nowPlaying, '_blank');
      win.focus();
    }

    let buttonStyle = {
      backgroundColor: "#feb47b",
      color: "#fff",
      boxShadow: "0 0 0 0"
    }

    return (
      <div className="App">
        <Row>
          <Col s={2}>
            { this.state.nowPlaying.includes('spotify')
                ? (<div class="redirect-msg">
                      <p>Opening music in new tab.</p>
                    </div>)
                : (<iframe id="music-player" 
                            title="now-playing"
                            allowtransparency="true"
                            src={this.state.nowPlaying}>
                    </iframe>)
            }
          </Col>
          <Col s={12} m={10}>
            <header className="App-header">
              <h1 className="App-title">Writing Music</h1>
            </header>
            <Cards listings={this.state.listings} 
                   updateNowPlaying={this.updateNowPlaying} 
                   token={this.state.token} />
          </Col>  
        </Row>
      </div>
    );
  }
}

export default App;