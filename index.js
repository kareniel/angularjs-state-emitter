var angular = require('angular')
var nanobus = require('nanobus')

var emitter = nanobus()

run.$inject = ['$rootScope']

module.exports = angular.module('angularjs-state-emitter', [])
  .provider('$stateEmitter', stateEmitterProvider)
  .provider('state', StateProvider)
  .provider('emitter', EmitterProvider)
  .provider('emit', EmitProvider)
  .run(run)
  .name

function stateEmitterProvider () {
  this.debug = function (bool) {
    if (!bool) return

    var css = 'font-weight: bold;'

    emitter.prependListener('*', function (eventName, data) {
      if (eventName === 'render') return

      print(eventName, data, css)
    })
  }

  this.$get = function () {
    return {}
  }
}

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

function print (eventName, data, css) {
  var time = `%c event @ ${formatTime(new Date())} ${eventName}`

  window.console.groupCollapsed(time, css)
  window.console.log('payload', data)
  window.console.groupEnd()
}

function formatTime (time) {
  return `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}
