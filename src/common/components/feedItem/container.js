import React from 'react';
import styles from "./styles.css";
import FeedItem from './component.js'

class FeedItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props
    this.component = new FeedItem(this.state.item)
  }

  componentDidMount() {
    let that = this
    // get an image from
    fetch('/api/mercury?url=' + encodeURIComponent(this.props.item.url))
      .then(function(resp) {
        return resp.json().then(function(json) {
          console.log(json)
          that.setState({
            item: {
              ...that.state.item,
              leadImg: json.lead_image_url
            }
          })
          // that.component.props = that.state
          // that.render()
        })
      })
  }

  render() {
    return <FeedItem item={this.state.item} className={styles.item} />;
  }
}

export default FeedItemContainer