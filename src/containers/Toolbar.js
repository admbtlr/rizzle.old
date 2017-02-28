import { connect } from 'react-redux'
import Toolbar from '../components/Toolbar.js'
import { itemDidScroll } from '../redux/actions/item.js'

const mapStateToProps = (state) => {
  return {
    toolbar: state.toolbar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showToolbar: (show) => dispatch(itemsFetchData(url)),
    markRead: (url) => dispatch(itemMarkRead(url))
  }
}

let ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)

export default ToolbarContainer
