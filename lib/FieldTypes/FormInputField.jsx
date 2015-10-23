import React from 'react';

export default class FormInputField extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props.data;
  }

  render() {
    var {label, type, value, attribute} = this.state;
    var id = this.state.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    return (
      <div className={className}>
        <label htmlFor={id} >{label}</label>
        <input id={id} type={type} value={value} name={attribute} onChange={this.handleChange} />
      </div>
    );
  }

  handleChange(event) {
    this.state.value = event.target.value;

    this.setState(this.state);

    if (this.props.data.onChange) {
      this.props.data.onChange(event.target.value);
    }
  }
}
