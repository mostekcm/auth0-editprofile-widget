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
  render: function() {
    var label = this.props.data.label;
    var type = this.props.data.type;
    var value = _.isArray(this.props.data.value) ? this.props.data.value : [this.props.data.value];
    var attribute = this.props.data.attribute;
    var className = `field ${type}`;
    var id = this.props.data.id || `field_${this.props.type}_${this.props.name}`

    var options = this.props.data.options.map( option => {
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
    if (this.props.data.onChange) {
      this.props.data.onChange(onChangeHandlers[this.props.data.type](event, this.props.data));
    }  
  }
});

export default FormOptionsField;