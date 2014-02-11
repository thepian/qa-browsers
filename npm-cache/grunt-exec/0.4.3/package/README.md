[![build status](https://secure.travis-ci.org/jharding/grunt-exec.png?branch=master)](http://travis-ci.org/jharding/grunt-exec)
grunt-exec
==========

Grunt plugin for executing shell commands.

Installation
------------

Install grunt-exec using npm:

```
$ npm install grunt-exec
```

Then add this line to your project's *Gruntfile.js*:

```javascript
grunt.loadNpmTasks('grunt-exec');
```

Usage
-----

This plugin is a [multi task][types_of_tasks], meaning that grunt will 
automatically iterate over all exec targets if a target is not specified.

If the exit code generated by the specified shell command is greater than 0, 
grunt-exec will assume an error has occurred and will abort grunt immediately.

[types_of_tasks]: https://github.com/gruntjs/grunt/blob/master/docs/types_of_tasks.md#multi-tasks

### Properties

*  __command__ (alias: __cmd__): The shell command to be executed. Must be a 
  string or a function that returns a string.
*  __stdout__: If `true`, stdout will be printed. Defaults to `true`.
*  __stderr__: If `true`, stderr will be printed. Defaults to `true`.
*  __cwd__: Current working directory of the shell command. Defaults to the 
  directory containing your Gruntfile.
*  __exitCode__ (alias: __exitCodes__): The expected exit code(s), task will 
  fail if the actual exit code doesn't match. Defaults to `0`. Can be an array 
  for multiple allowed exit codes.
*  __callback__: The callback function passed `child_process.exec`. Defaults to 
  a noop.

### Command Functions

If you plan on doing advanced stuff with grunt-exec, you'll most likely be using 
functions for the `command` property of your exec targets. This section details 
a couple of helpful tips about command functions that could help make your life 
easier.

#### Passing arguments from the command line

Command functions can be called with arbitrary arguments. Let's say we have the 
following exec target that echoes a formatted name:

```javascript
exec: {
  echo_name: {
    cmd: function(firstName, lastName) {
      var formattedName = [
        lastName.toUpperCase(),
        firstName.toUpperCase()
      ].join(', ');

      return 'echo ' + formattedName;
    }
  }
}
```

In order to get `SIMPSON, HOMER` echoed, you'd run 
`grunt exec:echo_name:homer:simpson` from the command line.

### Accessing `grunt` object

All command functions are called in the context of the `grunt` object that they 
are being ran with. This means you can access the `grunt` object through `this`.

### Example

The following examples are available in grunt-exec's Gruntfile.

```javascript
grunt.initConfig({
  exec: {
    remove_logs: {
      command: 'rm -f *.log',
      stdout: false,
      stderr: false
    },
    list_files: {
      cmd: 'ls -l **'
    },
    echo_grunt_version: {
      cmd: function() { return 'echo ' + this.version; }
    },
    echo_name: {
      cmd: function(firstName, lastName) {
        var formattedName = [
          lastName.toUpperCase(),
          firstName.toUpperCase()
        ].join(', ');

        return 'echo ' + formattedName;
      }
    }
  }
});
```

Testing
-------

```
$ cd grunt-exec
$ npm test
```

Issues
------

Found a bug? Create an issue on GitHub.

https://github.com/jharding/grunt-exec/issues

Versioning
----------

For transparency and insight into the release cycle, releases will be numbered 
with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

License
-------

Copyright (c) 2012 [Jake Harding](http://thejakeharding.com)  
Licensed under the MIT License.