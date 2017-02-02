import React from "react";
import styles from "./style.css";
import FeedListContainer from "../../common/components/feedList/container.js"

export default class HomePage extends React.Component {

  render() {
    return (
      <div>
        <FeedListContainer />
      </div>
    );
  }
}
