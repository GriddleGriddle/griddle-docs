---
title: Architecture
order: 1
---

Griddle exists as multiple modules for extensibility. By default Griddle consists of:

1. [griddle-core](https://github.com/griddlegriddle/griddle-core) - State management
1. [griddle-render](https://github.com/griddlegriddle/griddle-render) - Series of dumb components
1. [griddle-connector](https://github.com/griddlegriddle/griddle-connector) - Hook up the components and state management

There are a number of reason for this architecture but it mainly boils down to extensibility and maintainability.

## griddle-core ##

The module that is responsible for managing state for Griddle is griddle-core. It consists of a series of
Redux stores, action creators, and an outside concept of helpers. Griddle uses Redux and ImmutableJS in Griddle-Core to help maintain state. While implementors will not need to use
Redux, knowing a little about how Redux works helps for creating plugins.

### reducers ###
Reducers in Griddle are methods that work against an immutable state object. A standard reducer method should look like:

```
export const SOME_CONSTANT_NAME(state, action, helpers) {
  return state;
}
```

Where `state` is the immutable state object, `action` is the action object created by an action creator, and `helpers` is an object consisting of the combined helper
methods.

##### Reducer data flow ####

When griddle-core is initialized, it takes an array of reducers to combine/compose into one reducer. Reducer methods will
 override other reducer methods with the same name that came before them. In the following example, the method in `local-reducer` will be used
rather than the `data-reducer` as  the default reducers in Griddle are defined as `['data-reducer', 'local-reducer']` as the reducers to compose (it may seem
curious that we even include the method in data reducer, however, we wanted to provide a starting point for anyone that wanted to override our default reducers).

**data-reducer.js**

```
export function GRIDDLE_LOADED_DATA(state, action, helpers) {
  return state.set('data', helpers.addKeyToRows(Immutable.fromJS(action.data)))
    .set('renderProperties', Immutable.fromJS(action.properties));
}
```

**local-reducer.js**

```
export function GRIDDLE_LOADED_DATA(state, action, helpers) {
  const columns = action.data.length > 0 ? Object.keys(action.data[0]) : [];
  //set state's data to this
  const tempState = state
  .set('data', helpers.addKeyToRows(Immutable.fromJS(action.data)))
  .set('allColumns', columns)
  .set('renderProperties', Immutable.fromJS(action.properties))
  .setIn(
    ['pageProperties', 'maxPage'],
    helpers.getPageCount(
      action.data.length,
      state.getIn(['pageProperties', 'pageSize'])));
  return tempState;
}
```

Since the methods have the same name,`GRIDDLE_LOADED_DATA` from local-reducer will be the method that gets used when the action with that name is dispatched.

##### pre/post hooks ####

Often it is not ideal to override a method in the context of a plugin and instead the desired outcome would be to wrap or compose an original reducer method as a
series of reducer methods. To that end, griddle-core uses a concept of pre/post hooks.

**\_AFTER method**

Append "\_AFTER" to any reducer method name to perform an additional reduce operation on the state object returned from the original reducer method.
If there are multiple plugins that have an \_AFTER method for the same reducer method, they will be composed and run in the order they are passed to griddle-core
(where the state of each additional reducer will be the input state to the next one).

For example, say we define our reducer plugin array as
`[data-reducer, local-reducer, subgrid-reducer, selection-reducer]`. If `subgrid-reducer` and `selection-reducer` both have a method `GRIDDLE_LOADED_DATA_AFTER`,
the `GRIDDLE_LOADED_DATA` method from local-reducer will be run and the state will be passed into `GRIDDLE_LOADED_DATA_AFTER`. The `GRIDDLE_LOADED_DATA_AFTER` method
in `selection-reducer` will then be run and the state returned from that method will be the state that is returned through connector to the views.

**\_BEFORE method**

Append \_BEFORE to any reducer method name to modify the state object passed to the default reducer method. Like \_AFTER, these methods are composed if there are
other plugins that contain the same method name.

**AFTER_REDUCE**

If there is an operation that should run directly before returning the final state object for any reducer method, it should occur in a AFTER_REDUCE method.
Like the _BEFORE / _AFTER methods, these are composed if they exist in multiple plugins.

**BEFORE_REDUCE**

If there is an operation that should run before any reducer method, it should occur in a BEFORE_REDUCE method. This is composed with other BEFORE_REDUCE methods
in other plugins.
