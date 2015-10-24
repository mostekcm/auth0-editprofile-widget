import EditProfileForm  from './lib/EditProfileForm';
import Auth0Api         from './lib/ConnectionStrategy/Auth0ApiStrategy';
import React            from 'react';
import _                from 'lodash';

export default class Auth0EditProfileWidget {
    
  constructor (container_id, options, fields) {

    if (!(this instanceof Auth0EditProfileWidget)) {
        return new Auth0EditProfileWidget(options);
    }

    if (options.connection_strategy) {
      this.connection_strategy = options.connection_strategy;
    } else {
      this.connection_strategy = new Auth0ApiStrategy(options.domain, options.user_token);
    }

    this.data = {
      errors: [],
      fields: fields
    };

    this.container = document.getElementById(container_id);

    this.editProfile = new EditProfileForm(this.container, this.data, data => this.onSubmit(data));

    this.events = {
      save:[],
      submit:[],
      error:[]
    };
  }

  init() {
    this.connection_strategy.get()
      .then(response => this.extendWithMetadata(response || {}) )
      .then(() => this.render() )
      .catch(e => this.on('error', e));
  }

  extendWithMetadata(user) {
    user.user_metadata = user.user_metadata || {};
    user.app_metadata = user.app_metadata || {};
    this.data.fields.forEach(function(field) {
      field.value = user.user_metadata[field.attribute] || user.app_metadata[field.attribute] || user[field.attribute] || null;
      return field;
    });

  }

  render() {
    this.editProfile.render(this.data);
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
    this.render();

    this.on('submit', data);

    this.connection_strategy.patch(data)
      .then(response => (this.render(), response) )
      .then(response => this.on('save', response) )
      .catch(e => this.on('error', e));

  }

  updateFieldById(id, options) {
    var field = _.find( this.data.fields, item => item.id === id );
    if (!field) {

      let parts = id.split('_');
      field = _.find( this.data.fields, item => ( item.type === parts[1] && item.attribute === parts[2] ) );

      if (!field) {
        throw "Invalid field ID"; 
      }

    }

    Object.keys(options).forEach(key => field[key] = options[key]);

    this.render();
  }


}

