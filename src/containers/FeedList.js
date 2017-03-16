import { connect } from 'react-redux'
import FeedList from '../components/FeedList.js'
import { itemsFetchData, itemsLoadMercuryStuff, itemMarkRead, itemsUpdateCurrentIndex } from '../redux/actions/items.js'
import { itemDidScroll } from '../redux/actions/item.js'

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
    index: state.items.index,
    currentItem: state.currentItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(itemsFetchData()),
    updateCurrentIndex: (index) => dispatch(itemsUpdateCurrentIndex(index)),
    markRead: (item) => dispatch(itemMarkRead(item)),
    fetchMercuryStuff: (item) => dispatch(itemsLoadMercuryStuff(item)),
    scrollHandler: (e) => dispatch(itemDidScroll(e))
  }
}

let FeedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)

export default FeedListContainer
