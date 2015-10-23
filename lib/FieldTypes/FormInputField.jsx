import React from 'react';

var FormInputField = React.createClass({
  render: function() {
    var label = this.props.data.label;
    var type = this.props.data.type;
    var value = this.props.data.value;
    var attribute = this.props.data.attribute;
    var id=this.props.data.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    return (
      <div className={className}>
        <label htmlFor={id} >{label}</label>
        <input id={id} type={type} defaultValue={value} name={attribute} onChange={this.handleChange} />
      </div>
    );
  },

  handleChange: function(event) {
    if (this.props.data.onChange) {
      this.props.data.onChange(event.target.value);
    }
  }


});

export default FormInputField;