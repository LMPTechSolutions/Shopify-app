import React from "react";
import { TextField } from "@shopify/polaris";

export default class TextFieldExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0",
    };
  }

  handleChange = value => {
    this.setState({ value });    
  };

  render(){
    return (
      <TextField
        type="number"
        label="Item cost"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}