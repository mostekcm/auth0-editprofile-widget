import React from 'react';
import FormSelectField from './FormSelectField'
import FormInputField from './FormInputField'

export default function FieldTypeMapper(type) {
  switch (type) {

    case 'text': 
    case 'date': return function(data) {
      return (
        <FormInputField key={data.attribute}  data={data} />
      );
    }; break;
    case 'select': return function(data) {
      return (
        <FormSelectField key={data.attribute}  data={data} />
      );
    }; break;

  }
}