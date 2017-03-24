import { connect } from 'react-redux'
import Toolbar from '../components/Toolbar.js'
import { itemsKeepCurrentItemUnread, itemsFetchData } from '../redux/actions/items.js'

const mapStateToProps = (state) => {
  return {
    toolbar: state.toolbar,
    numItems: state.items.items.length,
    currentItem: state.items.items[state.items.index],
    currentItemIndex: state.items.index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    keepUnread: () => dispatch(itemsKeepCurrentItemUnread()),
    fetchItems: () => dispatch(itemsFetchData())
  }
}

let ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
