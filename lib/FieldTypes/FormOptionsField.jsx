import React  from 'react';
import _      from 'lodash';

var onChangeHandlers = {
  radio: function(event, data) {
    return event.target.value;
  },

  checkbox: function(event, data) {
    return _.toArray(document.getElementsByName(data.attribute))
            .map(e => e.checked ? e.value : null)
            .filter(e => e !== null);
  }
}

var OptionField = React.createClass({

  render: function() {
    var id=`${this.props.parentId}_${this.props.value}`;

    return (
      <div>
        <label htmlFor={id} >{this.props.label}</label>
        <input id={id} type={this.props.type} name={this.props.name} value={this.props.value} defaultChecked={this.props.selected} onChange={this.props.onChange} />
      </div>
    );

  }

});

var FormOptionsField = React.createClass({

  getInitialState: function() {
    return this.props.data;
  },

  render: function() {
    var label = this.state.label;
    var type = this.state.type;
    var value = _.isArray(this.state.value) ? this.state.value : [this.state.value];
    var attribute = this.state.attribute;
    var className = `field ${type}`;
    var id = this.state.id || `field_${this.state.type}_${this.state.name}`

    var options = this.state.options.map( option => {
      let selected = (value.indexOf(option.value) >= 0);
      return ( <OptionField parentId={id} type={type} name={attribute} key={option.value} value={option.value} label={option.text} onChange={this.handleChange} selected={selected} />);
    } );

    return (
      <div className={className}>
        <label>{label}</label>
        <div className="items" id={id}>
        {options}
        </div>
      </div>
    );
  },

  handleChange: function(event) {

    var newValue = onChangeHandlers[this.props.data.type](event, this.props.data);
    
    this.props.data.value = newValue;

    this.setState(this.props.data);

    if (this.props.data.onChange) {
      this.props.data.onChange(newValue);
    }  
  }
});

export default FormOptionsField;