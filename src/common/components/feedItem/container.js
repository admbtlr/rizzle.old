import React from 'react';
import FeedItem from './component.js'

class FeedItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
  }

  componentDidMount() {
    // get an image
  }

  render() {
    return <FeedItem item={this.props.item} />;
  }
}

export default FeedItemContainer