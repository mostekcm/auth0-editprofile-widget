import React from 'react';

export default class FormSelectField extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props.data;
  }

  render() {
    var {label, type, value, attribute} = this.state;

    var id = this.state.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    var options = this.state.options.map( option => ( <SelectOption key={option.value} data={option} /> ) );

    return (
      <div className={className}>
        <label htmlFor={id} >{label}</label>
        <select id={id} name={attribute} value={value} onChange={this.handleChange}>
          {options}
        </select>
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


class SelectOption extends React.Component {

  render() {
    return (
      <option value={this.props.data.value} >
          {this.props.data.text}
      </option>
    );
  }

}