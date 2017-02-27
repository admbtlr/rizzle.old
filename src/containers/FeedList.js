import { connect } from 'react-redux'
import FeedList from '../components/FeedList.js'
import addItem from '../redux/actions.js'
import 'whatwg-fetch'

const accessToken = '07de039941196f956e9e86e202574419'

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

let FeedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList)

FeedListContainer.componentDidMount = () => {
  this.loadItems()
}

  // render () {
  //   return <FeedList items={this.state.items} markRead={this.markRead.bind(this)}/>;
  // }

FeedListContainer.loadItems = () => {
  let that = this
  let url = '/api/unread'

  if (window.cordova) {
    url = 'https://feedwrangler.net/api/v2/feed_items/list?read=false&access_token=' + this.accessToken
  }

  fetch(url)
    .then(function(resp) {
      return resp.json().then(function (json) {
        let items = json.feed_items
        let smeti = new Array(items.length)
        // reverse the items
        items.forEach((item, index, items) =>
          smeti[items.length - index - 1] = item
        )
        smeti.each((item) => {
          addItem(item)
        })
        // that.setState({items: smeti})
      })
    })
}

FeedListContainer.markRead = (item) => {
  let url = '/api/markread?'
  if (window.cordova) {
    url = 'https://feedwrangler.net/api/v2/feed_items/update?'
  }
  url += 'access_token=' + this.accessToken
  url += '&feed_item_id=' + item.feed_item_id
  url += '&read=true'

  fetch(url)
    .then(function(resp) {
    })
    .catch(function(e) {
      console.log(e)
    })
}

export default FeedListContainer