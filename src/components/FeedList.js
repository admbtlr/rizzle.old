import React from "react";
import styles from "./FeedList.css";
import FeedItemContainer from "../containers/FeedItem.js"
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);


class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <VirtualizeSwipeableViews
      slideRenderer={this.renderSlide.bind(this)}
      slideStyle={{height: '100vh', '-webkit-overflow-scrolling': 'touch'}}
      onChangeIndex={this.onChangeIndex.bind(this)}
    />
  }

  onChangeIndex(index, lastIndex) {
    if (index > lastIndex) {
      let item = this.props.items[lastIndex]
      this.props.markRead(item)
    }
  }

  renderSlide({key, index}) {
    let item = this.props.items[index]
    if (item) {
      return <FeedItemContainer
        className={styles.item}
        item={item}
        key={item.feed_item_id}
      />
    }
  }
}

export default FeedList