import React from 'react';

var FormInputField = React.createClass({
  render: function() {
    var label = this.props.data.label;
    var type = this.props.data.type;
    var value = this.props.data.value;
    var attribute = this.props.data.attribute;

    return (
      <div>
        <label>{label}</label>
        <input type={type} defaultValue={value} name={attribute} />
      </div>
    );
  }

});

export default FormInputField;