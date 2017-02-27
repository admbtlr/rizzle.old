import React from "react"
import classNames from "classnames"
import styles from "./Toolbar.css"

class Toolbar extends React.Component {

  render() {
    return (
      <div className={styles.toolbar}>
        <button className={styles.mercurify}>M</button>
        <button className={styles.markUnread}>U</button>
        <button className={styles.saveForLater}>S</button>
      </div>)
  }

}

export default Toolbar