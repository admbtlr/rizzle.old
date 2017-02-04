import React from "react";
import styles from "./styles.css";
import FeedItemContainer from "../feedItem/container.js"
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);


class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <VirtualizeSwipeableViews slideRenderer={this.renderSlide.bind(this)} />
  }

  renderSlide({key, index}) {
    let item = this.props.items[index]
    if (item) {
      return <FeedItemContainer className={styles.item} item={item} key={item.feed_item_id} />
    }
  }
}

export default FeedList