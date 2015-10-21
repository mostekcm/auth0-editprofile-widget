import React from 'react';

var FormInputField = React.createClass({
  render: function() {
    var label = this.props.data.label;
    var type = this.props.data.type;
    var value = this.props.data.value;
    var attribute = this.props.data.attribute;
    var id=`field_${attribute}`;

    return (
      <div className="field">
        <label htmlFor={id} >{label}</label>
        <input id={id} type={type} defaultValue={value} name={attribute} />
      </div>
    );
  }

});

export default FormInputField;