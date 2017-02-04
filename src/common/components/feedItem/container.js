import React from 'react';
import styles from "./styles.css";
import FeedItem from './component.js'
import 'whatwg-fetch'

class FeedItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props
    this.component = new FeedItem(this.state.item)
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
          that.setState({
            item: {
              ...that.state.item,
              leadImg: json.lead_image_url
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