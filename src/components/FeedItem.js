import React from "react"
import classNames from "classnames"
import styles from "./FeedItem.css"

class FeedItem extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.fontClass = this.getFontClass()
    this.multiply = this.isMultiply()
    this.gradient = this.getGradient()
    // this.bgColor = this.multiply ? this.getBGColor() : 'rgba(0,0,0,0.35)'
    this.headerClasses = classNames(this.getHeaderClasses())
  }

  // componentWillReceiveProps(props) {
  //   console.log('Received props')
  // }

  componentDidMount () {
    this.loadMercuryStuff()
    this.resizeTitleFontToFit()
  }

  loadMercuryStuff () {
    // let url = '/api/mercury?url=' + encodeURIComponent(this.props.item.url)
    // if (window.cordova) {
    //   url = 'https://mercury.postlight.com/parser?url='+encodeURIComponent(this.props.item.url)
    // }
    this.props.loadMercuryStuff(this.props.item)
  }

  resizeTitleFontToFit () {
    let windowWidth = window.innerWidth
    let titleEl = document.getElementById('js-title')
    let titleWidth = this.calculateElementWidth(titleEl)

    if (titleWidth > windowWidth) {
      let titleFontSize = window.getComputedStyle(titleEl).getPropertyValue('font-size')
      let fontSizeNum = this.removePx(titleFontSize)

      while (titleWidth > windowWidth && fontSizeNum > 10) {
        fontSizeNum--
        titleEl.style.fontSize = fontSizeNum + 'px'
        titleWidth = this.calculateElementWidth(titleEl)
      }
    }
  }

  removePx(size) {
    return size.substr(0, size.length - 2)
  }

  render () {
    let {feed_item_id, feed_name, url, title, author, body, leadImg} = this.props.item
    let bodyHtml = { __html: body }
    let articleClasses = classNames(styles[this.fontClass], styles.itemArticle)
    let coverImageClasses = classNames(styles.coverImage, styles.coverImageFixed)
    let coverClasses = classNames(styles.cover)
    if (this.multiply) {
      coverClasses = classNames(styles.cover, styles.coverMultiply)
    }

    return (
      <article className={articleClasses} onClick={this.openLinksExternally}>
        <div className={coverClasses}>
          <div
            className={coverImageClasses}
            style={{ backgroundImage: 'url(' + leadImg + ')' }} />
          <div className={styles.coverCover} style={{ background: (this.multiply || !leadImg) ? this.gradient : '' }}/>
          <div className={this.headerClasses} id='js-header'>
            <h1 id='js-title'><a href={url || ''}>{title}</a></h1>
          </div>
        </div>
        <h2>{author}</h2>
        <aside>{feed_name}</aside>
        <div className={styles.body} dangerouslySetInnerHTML={bodyHtml}></div>
      </article>
    )
  }

  openLinksExternally = (e) => {
    let el = e.target
    // TODO don't rely on this
    while (el.tagName !== 'ARTICLE') {
      if (el.tagName === 'A') {
        e.stopPropagation()
        e.preventDefault()
        let url = el.getAttribute('href')
        window.open(url, '_system')
        break
      }
      el = el.parentElement

    }
    console.log(e)
  }

  getFontClass () {
    return 'fonts' + (Math.round((Math.random()*8))+1)
  }

  getBGColor () {
    let colors = ['#31a171', '#341537', '#da9524', '#5eb9bf', '#a8001b']
    let index = Math.round(Math.random() * 5)
    return colors[index]
  }

  getGradient () {
    let gradients = [
      'linear-gradient(to left, #B3FFAB , #12FFF7)',
      'linear-gradient(to left, #34e89e , #0f3443)',
      'linear-gradient(to left, #30E8BF , #FF8235)',
      'linear-gradient(to left, #D66D75 , #E29587)',
      'linear-gradient(to left, #C33764 , #1D2671)',
      'linear-gradient(to left, #F7971E , #FFD200)',
      'linear-gradient(to left, #F3904F , #3B4371)',
      'linear-gradient(to left, #4568DC , #B06AB3)',
      'linear-gradient(to left, #43C6AC , #F8FFAE)'
    ]
    return gradients[Math.round(Math.random() * gradients.length)]
  }

  isMultiply () {
    return Math.random() > 0.5
  }

  getHeaderClasses = () => {
    let classes = [styles.header]
    if (Math.random() > 0.5) {
      classes.push(styles.headerBottom)
    } else /*if (Math.random() > 0.2)*/ {
      classes.push(styles.headerMiddle)
    }
    if (Math.random() > 0.5) {
      classes.push(styles.headerCentered)
    }
    if (Math.random() > 0.7) {
      classes.push(styles.headerUnderlined)
    }
    if (Math.random() > 0.5) {
      classes.push(styles.headerItalic)
    }
    if (Math.random() > 0.8) {
      classes.push(styles.headerBlock)
    } else if (Math.random() > 0.8) {
      classes.push(styles.headerBlockInverse)
    }
    if (this.props.item.title.length > 80) {
      classes.push(styles.headerSmall)
    } else if (Math.random() > 0.6 &&
        classes.indexOf(styles.headerBlock) === -1 &&
        classes.indexOf(styles.headerBlockInverse) === -1) {
      classes.push(styles.headerSmall)
      classes.push(styles.headerSheepStealer)
    }
    return classes
  }

  calculateElementWidth = (titleEl) => {
    let titleWidth = titleEl.getBoundingClientRect().width

    // TODO calculate padding/margin + padding of parent
    titleWidth += 28

    return titleWidth
  }


}

export default FeedItem