var angular = require('angular')
var nanobus = require('nanobus')

var emitter = nanobus()

run.$inject = ['$rootScope']

module.exports = angular.module('angularjs-state-emitter', [])
  .provider('state', StateProvider)
  .provider('emitter', EmitterProvider)
  .provider('emit', EmitProvider)
  .run(run)
  .name

function StateProvider () {
  var state = {}

  this.$get = function () {
    return state
  }
}

function EmitterProvider () {
  this.$get = function () {
    return emitter
  }
}

function EmitProvider () {
  this.$get = function () {
    return emitter.emit.bind(emitter)
  }
}

function run ($rootScope) {
  emitter.on('render', function () {
    $rootScope.$evalAsync()
  })
}
