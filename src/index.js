import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const apiServer = "https://api.enja.itok01.com";
const apiSpeech = apiServer + "/speech";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

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
      <div>
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

function App() {
  return (
    <div className="app">
      <Form />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));