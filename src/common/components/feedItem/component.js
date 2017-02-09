import React from "react";
import classNames from "classnames"
import styles from "./styles.css";

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  // componentWillReceiveProps(props) {
  //   console.log('Received props')
  // }

  render() {
    let {feed_item_id, feed_name, url, title, author, body, leadImg} = this.props.item
    let bodyHtml = { __html: body }
    let coverClasses = classNames(styles.coverImage, styles.coverImageFixed)

    return (
      <article>
        <div className={styles.cover}>
          <div
            className={coverClasses}
            style={{ backgroundImage: 'url(' + leadImg + ')' }} />
          <div className={styles.header}>
            <h1><a href={url || ''}>{title}</a></h1>
            <h2>{author}</h2>
            <aside>{feed_name}</aside>
          </div>
        </div>
        <div className={styles.body} dangerouslySetInnerHTML={bodyHtml}></div>
      </article>
    )
  }
}

export default FeedItem