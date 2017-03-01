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
    fetchData: () => dispatch(itemsFetchData()),
    markRead: (item) => dispatch(itemMarkRead(item))
  }
}

let FeedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)

export default FeedListContainer
