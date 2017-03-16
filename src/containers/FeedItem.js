import { connect } from 'react-redux'
import FeedItem from '../components/FeedItem.js'
import { itemDidScroll }  from '../redux/actions/item.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    // scrollHandler: () => dispatch(itemDidScroll(true))
  }
  // return {
  //   loadMercuryStuff: (item) => dispatch(itemLoadMercuryStuff(item))
  // }
  return {}
}

let FeedItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedItem)

//   render() {
//     return <FeedItem item={this.state.item} className={styles.item} />;
//   }
// }

export default FeedItemContainer
