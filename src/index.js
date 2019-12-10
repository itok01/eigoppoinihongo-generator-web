import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const apiServer = "https://api.enja.itok01.com";
const apiSpeech = apiServer + "/speech";

class App extends React.Component {
  constructor(props) {
    super(props);

    let query = qs.parse(window.location.search.substr(1));
    this.state = { text: query["text"], gender: query["gender"], source: apiSpeech + "?text=" + query["text"] };

    if (this.state.text === undefined) {
      this.state.text = "";
    }

    if (this.state.gender === undefined) {
      this.state.gender = "female";
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleGenderChange(event) {
    this.setState({ gender: event.target.value });
  }

  handleSubmit(event) {
    let speechUrl = apiSpeech + "?text=" + this.state.text + "&gender=" + this.state.gender;
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
          <TextField type="text" value={this.state.text} color="primary" label="日本語" onChange={this.handleTextChange} />
          <Button type="submit" className="get-speech-button" variant="contained" color="primary" >
            変換
          </Button>
          <RadioGroup aria-label="gender" name="gender1" value={this.state.gender} onChange={this.handleGenderChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </form>
        <audio controls ref="speech">
          <source src={this.state.source} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));