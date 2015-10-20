var fetch = require('fetchify')(Promise).fetch;
var React = require('react');

import EditProfileForm from './lib/EditProfileForm'
import jwt_decode from 'jwt-decode'

export default class Auth0EditProfileWidget {
    
  constructor (domain, user_token, container_id, fields, onSave) {
    if (!(this instanceof Auth0EditProfileWidget)) {
        return new Auth0EditProfileWidget(options);
    }

    var decoded = jwt_decode(user_token);

    this.domain = domain;
    this.user_token = user_token;
    this.user_id = decoded.sub;

    this.editProfile = new EditProfileForm();

    this.data = {
      errors: [],
      fields: fields
    };

    this.container = document.getElementById(container_id);

    this.events = {
      save:[],
      submit:[],
      error:[]
    };

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user_token
    };

    fetch('https://' + this.domain + '/api/v2/users/' + this.user_id, {
        method: 'GET',
        headers: headers,
      })
      .then(response => {
        if (response.status != 200) {
          throw "ERROR";
        }
        
        return response.json();
      })
      .then(response => this.extendWithMetadata(response.user_metadata || {}) )
      .then(() => this.render() )
      .catch(e => this.on('error', e));
  }

  extendWithMetadata(metadata) {

    this.data.fields.forEach(function(field) {
      field.value = metadata[field.attribute] || null;
      return field;
    });

  }

  render() {
    this.editProfile.render(this.container, this.data, data => this.onSubmit(data));
  }

  on(event, callbackOrParam) {

    if ( ! this.events[event] ) {
      throw 'Invalid event';
    }

    if (typeof(callbackOrParam) === 'function') {
      this.events[event].push(callbackOrParam);
    }
    else {
      this.events[event].forEach(e => e(callbackOrParam));
    }

    return this;

  }

  onSubmit (data) {

    this.data.errors = [];

    var validation = this.data.fields.map(function(field) {
      if (field.validation) {
        return field.validation(data[field.attribute] || null) ;
      }
      return null;
    }).filter(value => value != null);

    if (validation.length > 0) {
      this.data.errors = validation;
      this.render();
      return;
    }

    this.on('submit', data);

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user_token
    };

    fetch('https://' + this.domain + '/api/v2/users/' + this.user_id, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          user_metadata:data
        })
      })
      .then(response => {
        if (response.status != 200) {
          throw "ERROR";
        }

        this.render();

        return response.json();
      })
      .then(response => this.on('save', response) )
      .catch(e => this.on('error', e));

  }

}

