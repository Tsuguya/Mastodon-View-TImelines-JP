import React, { Component } from 'react';
import Header from "./header/Header";
import Grid from './components/Grid';
import request from './request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  componentDidMount() {
    this.request(0);
  }

  handleInstanceChange() {
    return (value) => {
      this.request(value);
    };
  }

  request(number) {
    request(number).then((result) => {
      this.setState({ cards: result });
      this.grid.layout();
    });
  }

  render() {
    return (
      <div>
        <Header onInstanceChange={this.handleInstanceChange()} />
        <div id="main">
          <div id="render">
            <Grid {...this.state} ref={(grid) => { this.grid = grid; }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
