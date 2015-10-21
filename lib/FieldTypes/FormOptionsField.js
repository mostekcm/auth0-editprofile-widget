import React  from 'react';
import _      from 'lodash';

var OptionField = React.createClass({

  render: function() {
    var id=`field_${this.props.name}_${this.props.value}`;

    return (
      <div>
        <label htmlFor={id} >{this.props.label}</label>
        <input id={id} type={this.props.type} name={this.props.name} value={this.props.value} defaultChecked={this.props.selected} />
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

    var options = this.props.data.options.map( option => {
      let selected = (value.indexOf(option.value) >= 0);
      return ( <OptionField type={type} name={attribute} key={option.value} value={option.value} label={option.text} selected={selected} />);
    } );

    return (
      <div className="field">
        <label>{label}</label>
        <div className={type}>
        {options}
        </div>
      </div>
    );
  }
});

export default FormOptionsField;