import React from 'react';

var FormInputField = React.createClass({

  getInitialState: function() {
    return this.props.data;
  },

  render: function() {
    var label = this.state.label;
    var type = this.state.type;
    var value = this.state.value;
    var attribute = this.state.attribute;
    var id=this.state.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    return (
      <div className={className}>
        <label htmlFor={id} >{label}</label>
        <input id={id} type={type} value={value} name={attribute} onChange={this.handleChange} />
      </div>
    );
  },

  handleChange: function(event) {
    this.props.data.value = event.target.value;

    this.setState(this.props.data);

    if (this.props.data.onChange) {
      this.props.data.onChange(event.target.value);
    }
  }


});

export default FormInputField;