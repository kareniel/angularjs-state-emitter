var angular = require('angular')
var nanobus = require('nanobus')

var emitter = nanobus()
var state = {}

run.$inject = ['$rootScope']

module.exports = angular.module('angularjs-state-emitter', [])
  .provider('state', StateProvider)
  .provider('emitter', EmitterProvider)
  .provider('emit', EmitProvider)
  .run(run)
  .name

function StateProvider () {
  this.$get = () => state
}

function EmitterProvider () {
  this.$get = () => emitter
}

function EmitProvider () {
  this.$get = () => emitter.emit.bind(emitter)
}

function run ($rootScope) {
  emitter.on('render', function () {
    $rootScope.$evalAsync()
  })
}
