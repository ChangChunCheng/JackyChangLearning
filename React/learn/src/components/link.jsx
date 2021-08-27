import React from "react";

class Link extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mx-4 fs-2 d-flex justify-content-center">
            <li className="breadcrumb-item">
              <a href="/">首頁</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/about">關於剁手手</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/team">團隊介紹</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/message">聯絡我們</a>
            </li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default Link;
