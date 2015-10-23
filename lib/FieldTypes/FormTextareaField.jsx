import React from 'react';

export default class FormTextareaField extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props.data;
  }

  render() {
    var {label, value, type, attribute} = this.state;

    var id = this.props.data.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <textarea name={attribute} id={id} value={value} onChange={this.handleChange} ></textarea>
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