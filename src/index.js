import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import {
  TwitterShareButton,
  TwitterIcon
} from 'react-share';

import './index.css';

const description = "テキストフォームに日本語を入力し、変換ボタンを押すと入力した日本語を英語っぽくした音声を生成します。"
const title = "英語っぽい日本語ジェネレータ";
const gitHubUrl = "https://github.com/itok01/eigoppoinihongo-generator";

const apiServer = "https://api.enja.itok01.com";
const apiSpeech = apiServer + "/speech";

class Content extends React.Component {
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
      <div className="content">
        <p>{description}</p>

        <form onSubmit={this.handleSubmit}>
          <TextField type="text" value={this.state.text} color="primary" label="変換したい日本語" fullWidth multiline variant="outlined" onChange={this.handleTextChange} />
          <RadioGroup aria-label="gender" name="gender1" value={this.state.gender} onChange={this.handleGenderChange}>
            <FormControlLabel value="female" control={<Radio />} label="女" />
            <FormControlLabel value="male" control={<Radio />} label="男" />
          </RadioGroup>
          <Button type="submit" className="get-speech-button" variant="contained" color="primary" >
            変換
          </Button>
        </form>
        <audio controls ref="speech">
          <source src={this.state.source} type="audio/mp3" />
        </audio>
        <div className="buttons">
          <TwitterShareButton title="#英語っぽい日本語ジェネレータ" url={"https://enja.itok01.com/?text=" + this.state.text + "&gender=" + this.state.gender} className="share-button">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://www.itok01.com/">
              itok01
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </footer>
    )
  }
}

class App extends React.Component {
  handleOpenGitHub() {

  }

  render() {
    return (
      <div className="app">
        <AppBar position="static">
          <Toolbar>
            <Typography className="title" variant="h6">
              {title}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={() => window.open(gitHubUrl, "_blank")}>
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Content />

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));