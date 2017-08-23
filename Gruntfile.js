var fs = require('fs');
var path = require('path');
var pkg = require('./package');

var minor_version = pkg.version.replace(/\.(\d)*$/, '');
var major_version = pkg.version.replace(/\.(\d)*\.(\d)*$/, '');
var path = require('path');

function  rename_release (v) {
  return function (d, f) {
    var dest = path.join(d, f.replace(/(\.min)?\.js$/, '-'+ v + '$1.js').replace('auth0-', ''));
    return dest;
  };
}

function node_bin (bin) {
  return path.join('node_modules', '.bin', bin);
}

module.exports = function (grunt) {
  grunt.initConfig({
    env: {
      build: {
        NODE_ENV: "production"
      }
    },
    browserify: {
      options: {
          transform: [["babelify", { "presets": ["react", "es2015"] }]],
        browserifyOptions: {
          debug: true,
          extensions: ".jsx"
        },
        watch: true,

        // Convert absolute sourcemap filepaths to relative ones using mold-source-map.
        postBundleCB: function(err, src, cb) {
          if (err) { return cb(err); }
          var through = require('through');
          var stream = through().pause().queue(src).end();
          var buffer = '';

          stream.pipe(require('mold-source-map').transformSourcesRelativeTo(__dirname)).pipe(through(function(chunk) {
            buffer += chunk.toString();
          }, function() {
            cb(err, buffer);
          }));
          stream.resume();
        }

      },
      debug: {
        files: {
          'build/auth0-editprofile-widget.js': ['standalone.js']
        }
      },
    },
    less: {
      dist: {
        options: {
          paths: ['lib/css'],
        },
        files: {
          'lib/css/main.css': 'lib/less/main.less'
        }
      },
      demo: {
        files: {
          'support/development-demo/build/index.css': 'support/development-demo/index.less'
        }
      }
    },
    cssmin: {
      minify: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'lib/css/main.min.css': ['lib/css/main.css']
        }
      }
    },
    exec: {
      'uglify': {
        cmd: node_bin('uglifyjs') + ' build/auth0-editprofile-widget.js  -b beautify=false,ascii_only=true > build/auth0-editprofile-widget.min.js',
        stdout: true,
        stderr: true
      }
    },
    clean: {
      css: ['lib/css/main.css', 'lib/css/main.min.css'],
      js: ['release/', 'build/', 'support/development-demo/auth0-editprofile-widget.js']
    },
    watch: {
      js: {
        files: ['build/auth0-editprofile-widget.js'],
        tasks: [],
        options: {
          livereload: true
        },
      },
      css: {
        files: [
          'lib/**/*.less'
        ],
        tasks: ['build'],
        options: {
          livereload: true
        },
      },
      demo: {
        files: ['support/development-demo/*'],
        tasks: ['less:demo'],
        options: {
          livereload: true
        },
      }
    },
    /* Checks for outdated npm dependencies before release. */
    outdated: {
      release: {
        development: false
      }
    }
  });


  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) { grunt.loadNpmTasks(key); }
  }

  grunt.registerTask('css',           ['clean:css', 'less:dist', 'cssmin:minify']);

  grunt.registerTask('js',            ['clean:js', 'browserify:debug', 'exec:uglify']);
  grunt.registerTask('build',         ['env:build', 'css', 'js']);

  grunt.registerTask('dev',           ['build', 'watch']);
};
