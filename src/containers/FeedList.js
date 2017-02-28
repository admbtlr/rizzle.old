import { connect } from 'react-redux'
import FeedList from '../components/FeedList.js'
import { itemsFetchData, itemMarkRead } from '../redux/actions/items.js'

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    markRead: (url) => dispatch(itemMarkRead(url))
  }
}

let FeedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)

export default FeedListContainer
