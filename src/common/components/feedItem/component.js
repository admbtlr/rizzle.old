import React from "react";
import styles from "./styles.css";
// import

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    let {feed_item_id, feed_name, url, title, author, body} = this.props.item
    let bodyHtml = { __html: body }
    return (
      <article>
        <div className={styles.heading}>
          <aside>{feed_name}</aside>
          <h1><a href={url || ''}>{title}</a></h1>
          <h2>{author}</h2>
        </div>
        <div className={styles.body} dangerouslySetInnerHTML={bodyHtml}></div>
      </article>
    )
  }
}

export default FeedItem