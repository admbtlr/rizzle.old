import React from 'react';
import FeedList from '../components/FeedList.js'
import 'whatwg-fetch'

class FeedListContainer extends React.Component {
  constructor() {
    super();
    this.state = { items: [] }

    this.accessToken = '07de039941196f956e9e86e202574419'
  }

  componentDidMount() {
    this.loadItems()
  }

  render () {
    return <FeedList items={this.state.items} markRead={this.markRead.bind(this)}/>;
  }

  loadItems () {
    let that = this
    let url = '/api/unread'

    if (window.cordova) {
      url = 'https://feedwrangler.net/api/v2/feed_items/list?read=false&access_token=' + this.accessToken
    }

    fetch(url)
      .then(function(resp) {
        return resp.json().then(function (json) {
          let items = json.feed_items
          let smeti = new Array(items.length)
          // reverse the items
          items.forEach((item, index, items) =>
            smeti[items.length - index - 1] = item
          )
          that.setState({items: smeti})
        })
      })
  }

  markRead (item) {
    let url = '/api/markread?'
    if (window.cordova) {
      url = 'https://feedwrangler.net/api/v2/feed_items/update?'
    }
    url += 'access_token=' + this.accessToken
    url += '&feed_item_id=' + item.feed_item_id
    url += '&read=true'

    fetch(url)
      .then(function(resp) {
      })
      .catch(function(e) {
        console.log(e)
      })
  }
}

export default FeedListContainer