import React              from 'react';
import FormSelectField    from './FormSelectField'
import FormInputField     from './FormInputField'
import FormOptionsField   from './FormOptionsField'
import FormTextareaField  from './FormTextareaField'

export default function FieldTypeMapper(type) {
  switch (type) {

    case 'custom': return function(data) {
      var html = data.render(data);
      var id = data.id || `field_${data.type}_${data.attribute}`;

      return ( 
        <div key={id} dangerouslySetInnerHTML={{__html: html}} />
      );
    }; break;
      
    case 'select': return function(data) {
      var id = data.id || `field_${data.type}_${data.attribute}`;

      return (
        <FormSelectField key={id}  data={data} />
      );
    }; break;

    case 'textarea': return function(data) {
      var id = data.id || `field_${data.type}_${data.attribute}`;

      return (
        <FormTextareaField key={id}  data={data} />
      );
    }; break;

    case 'radio': 
    case 'checkbox': return function(data) {
      var id = data.id || `field_${data.type}_${data.attribute}`;

      return (
        <FormOptionsField key={id}  data={data} />
      );
    }; break;

    case 'text': 
    case 'date': 
    default: return function(data) {
      var id = data.id || `field_${data.type}_${data.attribute}`;
      
      return (
        <FormInputField key={id}  data={data} />
      );
    }; break;

  }
}