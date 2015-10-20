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

##Events

* submit: this occurs when the user submits the form, before the API is called
* save: this occurs after the API is called, if a success response is received
* error: this occurs if there is any error in tha API call
