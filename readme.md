# angularjs-state-emitter

<div align="left">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-green.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/angularjs-state-emitter">
    <img src="https://img.shields.io/npm/v/angularjs-state-emitter.svg?style=flat-square"
      alt="NPM version" />
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/angularjs-state-emitter">
    <img src="https://img.shields.io/npm/dm/angularjs-state-emitter.svg?style=flat-square"
      alt="Downloads" />
  </a>
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>

<br />


Use an event-based api similar to [choo](https://github.com/choojs/choo)'s to manage shared state in your Angular.js 1.x app.


## Usage


### 1. Register `angularjs-state-emitter` as a dependency of your app:

```js
var stateEmitter = require('angularjs-state-emitter')

angular.module('myApp', [stateEmitter])
```

### 2. Declare your store in a run block:

```js
angular.run(store)

function store (state, emitter) {
  state.clicks = 0

  emitter.on('increment', function () {
    state.clicks += 1
    emitter.emit('render')
  })
}
```

### 3. Pass state down from your root component:

```js
function ComponentCtrl (state) {
  var ctrl = this
  ctrl.state = state
}
```

```html
<my-component state="$ctrl.state"></my-component>
```

it also works with `@ui-router/angularjs`:

```js
$stateProvider.state({
  name: 'layout',
  component: 'myComponent',
})
```

```html
<ui-view state="$ctrl.state"></ui-view>
```


### 4. Emit actions from any components

```js
module.exports = {
  template: `<button ng-click="$ctrl.handleClick()">increment</button>`,
  bindings: { 
    state: '<' 
  },
  controller: function ButtonCtrl (emit) {
    var ctrl = this

    ctrl.handleClick = function () {
      emit('increment')
    }
  }
}
```

## Installation


```bash
npm install angularjs-state-emitter
```


## See also

- [nanocomponent-adapters/angularjs](https://github.com/kareniel/nanocomponent-adapter-angularjs)
- [choo](https://github.com/choojs/choo)
