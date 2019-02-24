import React, { Component } from 'react';
import './App.css';
import { getFeeds } from './actions/getFeeds';
import { getTopRatedFeeds } from './actions/getTopRatedFeeds';
import MediumItem from './components/medium';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4000/",
      feeds: [],
      feedType: 'general'
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
      console.log(result)
      if (err) {
        alert(err)
      } else {
        this.setState({ feeds: result.data, feedType: "top5" })
      }
    });
  }

  callForEachFeed(feedData) {
    let feedsArray = []
    const data = feedData["data"] !== undefined ? feedData["data"] : feedData;
    if (data !== undefined) {
      for (var i in data) {
        if (data[i].items !== undefined) {
          data[i].items.forEach((element) => {
            feedsArray.push(
              <MediumItem
                items={element}
                endpoint={this.state.endpoint}
                newsId={data[i].id}
                type={this.state.feedType}
              />
            )
          })
        }
      }
    }
    return feedsArray
  }
  render() {
    let feedData = this.state.feeds;
    console.log(feedData)
    return (
      <div className="App">
        <div className="button" onClick={this.getTopFeeds.bind(this)}><button>Click here to get Top 5 rated feeds</button></div>
        {feedData.length <= 0 ? '' : <ol>{this.callForEachFeed(feedData)}</ol>}
      </div>
    );
  }
}

export default App;
