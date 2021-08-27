import React from "react";

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: null,
    };
  }

  async componentDidMount() {
    const logo_req = await fetch("https://duohand2.hopto.org/api/v1/logo");
    let logo_json = {};
    if (logo_req.status === 200) {
      logo_json = await logo_req.json();
    } else {
      alert("Service error!");
      return;
    }
    const logo = `data:image/png;base64, ${logo_json.img}`;
    this.setState({
      logo: logo,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <a href="/">
          <img src={this.state.logo} alt="logo" className="img-fluid" />
        </a>
      </div>
    );
  }
}

export default Logo;
