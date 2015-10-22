/*
 *
 * This is used to build the bundle with browserify.
 *
 * The bundle is used by people who doesn't use browserify.require
 * Those who use browserify will install with npm and require the module,
 * the package.json file points to index.js.
 */


//temporary disable define from AMD.
var old_define = global.define;
global.define = undefined;

var Auth0EditProfileWidget = require('./');
var WebtaskStrategy = require('./lib/ConnectionStrategy/WebtaskStrategy');

//restore define
global.define = old_define;

// use amd or just throught to window object.
if (typeof global.define == 'function' && global.define.amd) {
  global.define('auth0-editprofile-widget', function () { return Auth0EditProfileWidget; });
  global.define('auth0-webtask-strategy', function () { return WebtaskStrategy; });
} else if (global) {
  global.Auth0EditProfileWidget = Auth0EditProfileWidget;
  global.WebtaskStrategy = WebtaskStrategy;
}
