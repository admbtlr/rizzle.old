import React from 'react';
import FeedList from './component.js'
import 'whatwg-fetch'

class FeedListContainer extends React.Component {
  constructor() {
    super();
    this.state = { items: [] }
  }

  componentDidMount() {
    let that = this
    let url = '/api/unread'

    if (window.cordova) {
      url = 'https://feedwrangler.net/api/v2/feed_items/list?access_token=07de039941196f956e9e86e202574419'
    }

    fetch(url)
      .then(function(resp) {
        return resp.json().then(function(json) {
          let items = json.feed_items
          let smeti = new Array(items.length)
          items.forEach((item, index, items) =>
            smeti[items.length - index - 1] = item
          )
          that.setState({items: smeti})
        })
      })
  }

  render() {
    return <FeedList items={this.state.items} />;
  }
}

export default FeedListContainer