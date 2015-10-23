import React from 'react';

var FormTextareaField = React.createClass({
  render: function() {
    var label = this.props.data.label;
    var value = this.props.data.value;
    var type = this.props.data.type;
    var attribute = this.props.data.attribute;
    var id=this.props.data.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <textarea name={attribute} id={id} defaultValue={value} onChange={this.handleChange} ></textarea>
      </div>
    );
  },

  handleChange: function(event) {
    if (this.props.data.onChange) {
      this.props.data.onChange(event.target.value);
    }
  }

});

export default FormTextareaField;