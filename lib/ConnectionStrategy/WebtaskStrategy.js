import fetchify    from 'fetchify';

var fetch = fetchify(Promise).fetch;

export default class WebtaskStrategy {

  constructor(endpoint, user_token) {
    this.endpoint = endpoint;
    this.user_token = user_token;
  }

  get() {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user_token
    };

    return fetch(this.endpoint, {
        method: 'GET',
        headers: headers,
      })
      .then(response => {
        if (response.status != 200) {
          throw "ERROR";
        }
        
        return response.json();
      })
  }

  patch(data) {

    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user_token
    };

    return fetch(this.endpoint, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.status != 200) {
          throw "ERROR";
        }
        
        return response.json();
      });
  }

}