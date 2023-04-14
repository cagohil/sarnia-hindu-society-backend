// var Service = require('../lib/node-windows.js').Service;
var Service = require('node-windows').Service;
var index = require('./index')

// Create a new service object
var svc = new Service({
  name:'Sarnia Hindu Society',
  description: 'The nodejs.org example web server.',
  script: 'D:\Software Projects\Sarnia HIndu Society\Server\index.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();