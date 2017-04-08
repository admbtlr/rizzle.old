import React from 'react'
import styles from './FeedList.css'
import FeedItemContainer from '../containers/FeedItem.js'
import SwipeableViews from 'react-swipeable-views'
import { virtualize } from 'react-swipeable-views-utils'

const VirtualizeSwipeableViews = virtualize(SwipeableViews)

class FeedList extends React.Component {
  // componentWillReceiveProps (nextProps) {
  //   nextProps.items.forEach((item) => {
  //     if (!item.hasLoadedMercuryStuff) {
  //       this.props.fetchMercuryStuff(item)
  //     }
  //   })
  // }

  render () {
    if (this.currentItemKey) {
      // get the index of the item with this key and set the index prop of VirtualizeSwipeableViews
    }
    return <VirtualizeSwipeableViews
      slideRenderer={this.renderSlide.bind(this)}
      slideStyle={{height: '100vh', WebkitOverflowScrolling: 'touch'}}
      onChangeIndex={this.onChangeIndex.bind(this)}
      slideCount={this.props.items.length}
      onScroll={this.props.scrollHandler}
      index={this.props.index}
    />
  }

  onChangeIndex (index, lastIndex) {
    if (index > lastIndex) {
      this.markRead(this.props.items[lastIndex])
    }

    this.loadMercuryForSurroundingItems(index)

    this.props.updateCurrentIndex(index)
  }

  markRead (item) {
    if (!item.keepUnread) {
      this.props.markRead(item)
    }
  }

  loadMercuryForSurroundingItems (index) {
    let from = index - 5 >= 0 ? index - 5 : 0
    let to = index + 5 < this.props.items.length ? index + 5 : this.props.items.length

    for (let i = from; i < to; i++) {
      this.loadMercuryIfNecessary(this.props.items[i])
    }
  }

  loadMercuryIfNecessary (item) {
    if (!item.hasLoadedMercuryStuff) {
      this.props.fetchMercuryStuff(item)
    }
  }

  renderSlide ({key, index}) {
    let item = this.props.items[index]
    if (item) {
      return <FeedItemContainer
        className={styles.item}
        item={item}
        key={item.feed_item_id}
      />
    }
  }

  componentDidMount () {
    this.props.fetchData()
  }
}

export default FeedList
