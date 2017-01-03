var fs = require('fs');
var pkg = require('./package');

module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      test: {
        options: {
          hostname: '0.0.0.0',
          port: 9999
        }
      }
    },
    browserify: {
      dist: {
          options: {
              transform: [
                  ["babelify",  {presets: ['es2015']}]
              ],
              browserifyOptions: {
                  debug: true
              }
          },
        files: {
          'build/jwt-decode.js': ['standalone.js'],
        },
      }
    },
    uglify: {
      options: {
        ascii: true
      }, min: {
        files: {
          'build/jwt-decode.min.js': ['build/jwt-decode.js']
        }
      }
    },
    clean: {
      build: ["build/"]
    },
    watch: {
      another: {
        files: ['node_modules', 'standalone.js', 'lib/*.js'],
        tasks: ['build']
      }
    },
    exec: {
      'test-phantom': {
        cmd: 'node_modules/testem/testem.js -f testem_dev.yml ci -l PhantomJS',
        stdout: true,
        stderr: true
      },
      'test-desktop': {
        cmd: 'node_modules/testem/testem.js ci -l bs_chrome,bs_firefox,bs_ie_8,bs_ie_9,bs_ie_10',
        stdout: true,
        stderr: true
      },
      'test-mobile': {
        cmd: 'node_modules/testem/testem.js ci -l bs_iphone_5', //disable ,bs_android_41: is not working
        stdout: true,
        stderr: true
      },
      'test-node': {
        cmd: 'node_modules/.bin/mocha', //disable ,bs_android_41: is not working
        stdout: true,
        stderr: true
      }
    }
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask("build",         ["clean", "browserify:dist", "browserify:dist", "uglify:min"]);
  grunt.registerTask("dev",           ["connect:test", "watch", "build"]);
  grunt.registerTask("test",          ["build", "exec:test-phantom"]);
  grunt.registerTask("test-node",     ["exec:test-node"]);
  grunt.registerTask("integration",   ["exec:test-desktop", "exec:test-mobile"]);
};
