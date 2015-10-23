#Auth0 Edit Profile Widget

This widget provides a way to allow users to update their own profile.
It uses the user token to update the user metadata.

Check the demo: http://auth0.github.io/auth0-editprofile-widget/

##Usage

```
<div id="editProfileContainer"></div>

<script src="build/auth0-editprofile-widget.js"></script>
<script type="text/javascript">
var editProfileWidget = new Auth0EditProfileWidget(auth0_domain, user_token, 'editProfileContainer', [
    { label: "Name", type:"text", attribute:"name", validation: function(name){return (name.length > 10 ? 'The name is too long' : null);} },
    { label: "Lastname", type:"text", attribute:"lastname" },
    { label: "BirthDay", type:"date", attribute:"birthday" },
    { label: "Type", type:"select", attribute:"account_type", options:[
        { value: "type_1", text:"Type 1"},
        { value: "type_2", text:"Type 2"},
        { value: "type_3", text:"Type 3"}
    ]}
]);
</script>
```

* auth0_domain: it is your Auth0 account domain (ie: yourdomain.auth0.com)
* user_token: it should be the current user id_token
* container_id: it should be the id of the dom element where the widget will load
* fields: it is an array with the fields that the widget will show. Each of the has the following attributes:
    - id: Optional. This can be used to set a custom id to the field. By default, if not provided, it is generated using this template `field_${type}_${attribute}` but having several fields form the same tuple (attribute,type) will provide an id collition.
    - label: this is the input label text
    - type: input type (text, date, number, select, checkbox, radio)
    - attribute: this is the user_metadata attribute name where it will be saved
    - validation: it is a validation function that will be excecuted before calling the Auth0 API. If there is an error, the text returned by the function will be used as the error message. If null is returned, it will assume no error.
    - render: used for custom fields. It should return a valid HTML to be rendered by the widget.
    - onChange: event triggered on changes in the field. For custom fields, you will need to trigger it manually.

##Events

* submit: this occurs when the user submits the form, before the API is called
* save: this occurs after the API is called, if a success response is received
* error: this occurs if there is any error in tha API call

##Updating users 

By default this widget provides a way to update the `user_metadata` using the user token. Since to update the `app_metadata` and root attributes an `app_token` is needed, it shouldn't be done on client side.

In this case, you need to implement your own connection strategy that will make a request to your backend and from there update the user data. You can also use the built-in connection strategy and webtask provided by the plugin in case you are working in a backendless app.

Create the webtask and copy the webtask URL to set as the WebtaskStrategy parameter:

```
wt create --name update_user_profile \
  --secret app_token=... \
  --secret client_secret=... \
  --secret domain=... \
  --output url update_user_profile.js --no-parse --no-merge
```

- app_token: it should be an app token generated in the [API Exporer](auth0.com/docs/api/v2) with `read:users`, `update:users` and `update:users_app_metadata` scopes
- client_secret: should be the client secret of the same app you are using in the client side. It is used to verify the user token
- domain: your auth0 account domain

and set the `connection_strategy`:

```
var editProfileWidget = new Auth0EditProfileWidget('editProfileContainer', 
      {
        connection_strategy: new WebtaskStrategy('https://yourendpoint...', user_token)
      },
      [
        ...
```

##Creating a custom connection strategy

Connecting to an existing backend can have special requirements and different ways to call the API endpoint. In this case, you have the posibility to create your own connection strategy.

The connection strategy is an object that provides 2 methods:
- get(): this will return the entire Auth0 user object
- patch(data): this will push the entire form data to the server

You can see the strategies provided by the widget as an example:
- [Auth0 Api Strategy](https://github.com/auth0/auth0-editprofile-widget/blob/master/lib/ConnectionStrategy/Auth0ApiStrategy.js): this calls directly the Auth0 API in order to update only the `user_metadata`.
- [Webtask Strategy](https://github.com/auth0/auth0-editprofile-widget/blob/master/lib/ConnectionStrategy/WebtaskStrategy.js): this will call the endpoint you set in the construct. It can be used to call any othe endpoint besides the Webtask.

##Using custom fields

This widget support the ability to add custom fields in order to render your own controls. For example:

```
...
{ id:"customName", type:"custom", attribute:"name", render: function(value) {

  return '<div class="custom-field">Hi <b>'+value+'</b>, How you doing?</div>';

} },
...
```

This field will show a greeting showing dinamically the user name.

##Updating field value

Calling

```
editProfileWidget.updateFieldById('customName', {
  value:"New Name"
});
```