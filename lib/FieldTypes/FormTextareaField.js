import React from 'react';

var FormTextareaField = React.createClass({
  render: function() {
    var label = this.props.data.label;
    var value = this.props.data.value;
    var attribute = this.props.data.attribute;
    var id=`field_${attribute}`;

    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        <textarea name={attribute} id={id} defaultValue={value} ></textarea>
      </div>
    );
  }

});

export default FormTextareaField;