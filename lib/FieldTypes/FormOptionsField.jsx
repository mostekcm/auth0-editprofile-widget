import React from 'react';

export default class FormOptionsField extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props.data;
  }

  render() {
    var {label, type, value, attribute} = this.state;
    
    // value = _.isArray(value) ? value : [value];
    value = Array.isArray(value) ? value : [value];

    var className = `field ${type}`;
    var id = this.state.id || `field_${this.state.type}_${this.state.name}`

    var options = this.state.options.map( option => ( <OptionField 
                                                        parentId={id} 
                                                        type={type} 
                                                        name={attribute} 
                                                        key={option.value} 
                                                        value={option.value} 
                                                        label={option.text} 
                                                        onChange={this.handleChange} 
                                                        selected={(value.indexOf(option.value) >= 0)} />) );

    return (
      <div className={className}>
        <label>{label}</label>
        <div className="items" id={id}>
          {options}
        </div>
      </div>
    );
  }

  onChangeHandlers = {
    radio: event => event.target.value,

    checkbox: (event, attribute) => Array.prototype.map.call(
        document.getElementsByName(attribute), 
        e => e.checked ? e.value : null
      )
      .filter(e => e !== null)
  }

  handleChange(event) {
    var newValue = this.onChangeHandlers[this.state.type](event, this.state.attribute);
    
    this.state.value = newValue;
    this.setState(this.state);

    if (this.state.onChange) {
      this.state.onChange(newValue);
    } 
  }
}

class OptionField extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = props;
  }

  render() {
    var id=`${this.props.parentId}_${this.props.value}`;

    return (
      <div>
        <label htmlFor={id} >{this.props.label}</label>
        <input id={id} type={this.props.type} name={this.props.name} value={this.state.value} checked={this.props.selected} onChange={this.handleChange} />
      </div>
    );

  }

  handleChange(event) {    
    this.state.value = event.target.value;
    this.setState(this.state);

    if (this.state.onChange) {
      this.state.onChange(event);
    } 
  }

}

