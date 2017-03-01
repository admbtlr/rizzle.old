import { connect } from 'react-redux'
import FeedItem from '../components/FeedItem.js'
import { itemLoadMercuryStuff }  from '../redux/actions/item.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMercuryStuff: (item) => dispatch(itemLoadMercuryStuff(item))
  }
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