// wt create --name update_user_profile \
//   --secret app_token=... \
//   --secret client_secret=... \
//   --secret domain=... \
//   --output url update_user_profile.js --no-parse --no-merge

var jwt = require('express-jwt');
var Express = require('express');
var request = require('request');
var Webtask = require('webtask-tools');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = Express();

app.use( jwt({ secret: function(req, payload, done){ 
    done(null, new Buffer(req.webtaskContext.data.client_secret, 'base64')); 
  } })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  if (req.method.toLowerCase() === 'options') {
    req.end();
  } else {
    next();
  }
});

app.use(function(req,res,next) {

  req.endpoint = 'https://' + req.webtaskContext.data.domain + '/api/v2/users/' + req.user.sub;
  next();

});

app.get('/',
  function(req,res) {
    request({
      url:req.endpoint,
      headers: {
        Authorization: 'Bearer ' + req.webtaskContext.data.app_token
      }
    }, function(error, response, body) {
      res.write(body).end();
    });
  });

app.patch('/',
  function(req,res, next) {

    var email = req.body.email;
    delete req.body.email;

    var app_metadata = {
      account_options: req.body.account_options,
      account_checks: _.isArray(req.body.account_checks) ? req.body.account_checks : [req.body.account_checks]
    };

    delete req.body.account_options;
    delete req.body.account_checks;

    req.payload = {
      email:email,
      app_metadata:app_metadata,
      user_metadata:req.body
    };

  },
  function(req,res) {
    request({
      url:req.endpoint,
      method:'PATCH',
      headers: {
        "authorization": "Bearer " + req.webtaskContext.data.app_token,
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(req.payload)
    }, function(error, response, body) {
      return res.status(response.statusCode).write(body).end();
    });

  });

module.exports = Webtask.fromExpress(app);
