import React from 'react';

var SelectOption = React.createClass({

  render: function() {

    return (
      <option 
        value={this.props.data.value} >
          
          {this.props.data.text}

      </option>
    );

  }

});

var FormSelectField = React.createClass({
  render: function() {
    var label = this.props.data.label;
    var type = this.props.data.type;
    var value = this.props.data.value;
    var attribute = this.props.data.attribute;
    var id=this.props.data.id || `field_${type}_${attribute}`;
    var className = `field ${type}`;

    var options = this.props.data.options.map( option => {
      return ( <SelectOption key={option.value} data={option} />);
    } );

    return (
      <div className={className}>
        <label htmlFor={id} >{label}</label>
        <select id={id} name={attribute} defaultValue={value} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  },

  handleChange: function(event) {
    if (this.props.data.onChange) {
      this.props.data.onChange(event.target.value);
    }
  }
});

export default FormSelectField;