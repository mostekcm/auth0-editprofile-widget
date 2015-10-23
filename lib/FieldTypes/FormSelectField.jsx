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

    var options = this.state.options.map( option => {
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
    this.props.data.value = event.target.value;

    this.setState(this.props.data);

    if (this.props.data.onChange) {
      this.props.data.onChange(event.target.value);
    }
  }
});

export default FormSelectField;