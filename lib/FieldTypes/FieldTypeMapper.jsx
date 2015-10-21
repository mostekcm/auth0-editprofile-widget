import React from 'react';
import FormSelectField from './FormSelectField'
import FormInputField from './FormInputField'
import FormOptionsField from './FormOptionsField'

export default function FieldTypeMapper(type) {
  switch (type) {

    case 'select': return function(data) {
      return (
        <FormSelectField key={data.attribute}  data={data} />
      );
    }; break;

    case 'radio': 
    case 'checkbox': return function(data) {
      return (
        <FormOptionsField key={data.attribute}  data={data} />
      );
    }; break;

    case 'text': 
    case 'date': 
    default: return function(data) {
      return (
        <FormInputField key={data.attribute}  data={data} />
      );
    }; break;

  }
}