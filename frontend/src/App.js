/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import * as _ from 'lodash';
import ReactLoading from 'react-loading';
import './App.css';
import { getFeeds } from './actions/getFeeds';
import { getTopRatedFeeds } from './actions/getTopRatedFeeds';
import ListView from './components/listView';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:80/",
      feeds: [],
      feedType: 'general',
      active: false
    };
  }
  componentDidMount() {
    const { endpoint, } = this.state;
    getFeeds(endpoint + 'getFeeds', (err, result) => {
      if (err) {
        alert(err)
      } else {
        this.setState({ feeds: result.data })
      }
    });
  }

  getTopFeeds() {
    getTopRatedFeeds(this.state.endpoint + 'topRatedFeeds', (err, result) => {
      if (err) {
        alert(err)
      } else {
        this.setState({ active: true, feeds: result.data, feedType: "top5" })
      }
    });
  }

  callForEachFeed(feedData) {
    let feedsArray = []
    const data = feedData["data"] !== undefined ? feedData["data"] : feedData;
    if (data !== undefined) {
      for (var i in data) {
        if (data[i].items !== undefined) {
          data[i].items = _.orderBy(data[i].items, ['rating'], ['desc'])
          data[i].items.forEach((element) => {
            feedsArray.push(
              <ListView
                items={element}
                endpoint={this.state.endpoint}
                newsId={data[i].id}
                type={this.state.feedType} />)
          });
        }
      }
    }
    return feedsArray
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="button" onClick={this.getTopFeeds.bind(this)}><button>Click here to get Top 5 rated feeds</button></div>
          <div className="rightDiv">
            {this.state.active ? <p><a href="http://127.0.0.1:3000">Home</a></p> : ''}
          </div>
        </div>
        {(this.state.feeds !== undefined && Object.keys(this.state.feeds).length > 0) ?
          <ol>{this.callForEachFeed(this.state.feeds)}</ol> :
          <div className="loader"><ReactLoading type={"bars"} color={"#393318"} height={'10%'} width={'15%'} /><p>Loading Feeds</p></div>}
      </div>
    );
  }
}

export default App;
