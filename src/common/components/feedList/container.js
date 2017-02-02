import React from 'react';
import FeedList from './component.js'

class FeedListContainer extends React.Component {
  constructor() {
    super();
    this.state = { items: [] }
  }

  componentDidMount() {
    let that = this
    fetch('/api/unread')
      .then(function(resp) {
        return resp.json().then(function(json) {
          that.setState({items: json.feed_items})
        })
      })
  }

  render() {
    return <FeedList items={this.state.items} />;
  }
}

export default FeedListContainer