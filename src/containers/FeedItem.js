import React from 'react';

// this can't be right...
import styles from "../components/FeedItem.css";
import FeedItem from '../components/FeedItem.js'
import 'whatwg-fetch'

class FeedItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props
    this.component = new FeedItem(this.state)
  }

  componentDidMount() {
    let that = this
    // get an image from mercury api
    let url = '/api/mercury?url=' + encodeURIComponent(this.props.item.url)

    if (window.cordova) {
      url = 'https://mercury.postlight.com/parser?url='+encodeURIComponent(this.props.item.url)
    }

    fetch(url, {
      headers: new Headers({
        'x-api-key': 'vTNatJB4JsgmfnKysiE9cOuJonFib4U9176DRF2z'
      })})
      .then(function(resp) {
        return resp.json().then(function(json) {
          console.log(json)
          let content = json.content.length && json.content.length > that.state.item.body.length
            ? json.content
            : that.state.item.body
          that.setState({
            item: {
              ...that.state.item,
              leadImg: json.lead_image_url,
              body: content
            }
          })
        })
      })
  }

  render() {
    return <FeedItem item={this.state.item} className={styles.item} />;
  }
}

export default FeedItemContainer