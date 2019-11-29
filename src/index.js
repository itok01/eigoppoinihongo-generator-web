import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const apiServer = "https://api.enja.itok01.com";
const apiSpeech = apiServer + "/speech";

class App extends React.Component {
  constructor(props) {
    super(props);

    let query = qs.parse(window.location.search.substr(1));
    this.state = { value: query["text"], source: apiSpeech + "?text=" + query["text"] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let speechUrl = apiSpeech + "?text=" + this.state.value;
    console.log(speechUrl);
    this.setState({ source: speechUrl })
    this.refs.speech.pause();
    this.refs.speech.load();
    this.refs.speech.play();
    event.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <TextField type="text" value={this.state.value} color="primary" label="日本語" onChange={this.handleChange} />
          <Button type="submit" className="get-speech-button" variant="contained" color="primary" >
            変換
        </Button>
        </form>
        <audio controls ref="speech">
          <source src={this.state.source} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));