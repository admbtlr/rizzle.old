import React from "react"
import classNames from "classnames"
import styles from "./Toolbar.css"

class Toolbar extends React.Component {

  render () {
    let classes = classNames(styles.toolbar, this.props.toolbar.isVisible ? styles.visible : '')
    return (
      <div className={classes}>
        <button className={styles.mercurify}>M</button>
        <button className={styles.markUnread}
          onClick={this.props.keepUnread}>{this.props.currentItem && this.props.currentItem.keepUnread ? 'R' : 'U'}</button>
        <span>{Number(this.props.currentItemIndex)+1}/{this.props.numItems}</span>
      </div>)
  }

}

export default Toolbar