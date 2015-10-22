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
    - label: this is the input label text
    - type: input type (text, date, number, select, checkbox, radio)
    - attribute: this is the user_metadata attribute name where it will be saved
    - validation: it is a validation function that will be excecuted before calling the Auth0 API. If there is an error, the text returned by the function will be used as the error message. If null is returned, it will assume no error.
    - render: used for custom fields. It should return a valid HTML to be rendered by the widget.

##Events

* submit: this occurs when the user submits the form, before the API is called
* save: this occurs after the API is called, if a success response is received
* error: this occurs if there is any error in tha API call

##Updating users 

By default this widget provides a way to update the `user_metadata` using the user token. Since to update the `app_metadata` and root attributes an `app_token` is needed, it shouldn't be done on client side.

In this case, you need to implement your own connection strategy that will make a request to your backend and from there update the user data. You can also use the built-in connection strategy and webtask provided by the plugin in case you are working in a backendless app.

```
var editProfileWidget = new Auth0EditProfileWidget('editProfileContainer', 
      {
        connection_strategy: new WebtaskStrategy('https://yourendpoint...', user_token)
      },
      [
        ...
```


Create the webtask

```
wt create --name update_user_profile \
  --secret app_token=... \
  --secret client_secret=... \
  --secret domain=... \
  --output url update_user_profile.js --no-parse --no-merge
```

##TODO:
1. Hook to events between fields (ie: update a custom field based on changes on a text field).