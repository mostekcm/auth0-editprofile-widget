import React from 'react';
import formSerialize from 'form-serialize';
import FieldTypeMapper from './FieldTypes/FieldTypeMapper'


var FormFieldList = React.createClass({
  render: function() {

    var fieldNodes = this.props.data.map(function (data) {
      var field = FieldTypeMapper(data.type);
      return field(data);
    });

    return (
      <div>
        {fieldNodes}
      </div>
    );
  }
});

var ErrorItem = React.createClass({
  render: function() {
    return (
      <li key={this.props.message}>
        {this.props.message}
      </li>
    );
  }
});

var ErrorControl = React.createClass({
  render: function() {
    var errors = this.props.data.map(function (error) {
      return (
        <ErrorItem message={error} />
      );
    });

    return (
      <ul className="error">
        {errors}
      </ul>
    );
  }
});

var FormControl = React.createClass({

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} ref="editProfileForm">

          <ErrorControl data={this.props.data.errors} />

          <FormFieldList data={this.props.data.fields} />

          <input type="submit" value="Save" />

      </form>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var form = this.refs.editProfileForm.getDOMNode();
    var data = formSerialize(form, {hash: true});

    this.props.onSubmit(data);

    return;
  }

});

export default class EditProfileForm {

  render(container, data, onSubmit) {

    React.render( <FormControl data={data} onSubmit={onSubmit} />, container );

  }

}