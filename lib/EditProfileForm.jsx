import React            from 'react';
import formSerialize    from 'form-serialize';
import FieldTypeMapper  from './FieldTypes/FieldTypeMapper'

class FormFieldList extends React.Component {
  render() {
    var fieldNodes = this.props.data.map( data => FieldTypeMapper(data.type)(data) );
    return ( <div>{fieldNodes}</div> );
  }
}

class ErrorItem extends React.Component {
  render() {
    return ( <li>{this.props.message}</li> );
  }
}

class ErrorControl extends React.Component {
  render() {
    var errors = this.props.data.map( error => ( <ErrorItem key={error} message={error} /> ) );
    var style = {};

    if (errors.length === 0) {
      style.display = 'none';
    }

    return ( <ul className="error" style={style}>{errors}</ul> );
  }
}

class FormControl extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = props.data;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} ref="editProfileForm">

          <ErrorControl data={this.state.errors} />

          <FormFieldList data={this.state.fields} />

          <input type="submit" value="Save" />

      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    var form = this.refs.editProfileForm.getDOMNode();
    var data = formSerialize(form, {hash: true});

    this.props.onSubmit(data);
  }
}

export default class EditProfileForm {
  constructor(container, data, onSubmit) {
    this.form = React.render( <FormControl data={data} onSubmit={onSubmit} />, container );
  }
  render(data) {
    this.form.setState(data);
  }
}