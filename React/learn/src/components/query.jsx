import React from "react";

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <form>
          <div className="row justify-content-center">
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="搜尋商品"
                  name="q"
                  value={this.state.q}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default QueryForm;
