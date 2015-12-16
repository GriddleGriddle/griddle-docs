---
title: Architecture
order: 1
---

Griddle exists as multiple modules for extensibility. By default Griddle consists of:

1. [griddle-core](https://github.com/griddlegriddle/griddle-core) - State management
1. [griddle-render](https://github.com/griddlegriddle/griddle-render) - Series of dumb components
1. [griddle-connector](https://github.com/griddlegriddle/griddle-connector) - Hook up the components and state management

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
 override other reducer methods with the same name depending on the reducer's location in the array. The following diagram represents what would happen if
we had two reducers called dataReducer and localReducer that were passed in to griddleReducer like `['data-reducer', 'local-reducer']`.

![Reducer combining diagram](reducerCombining.png)

Since the methods have the same name,`GRIDDLE_LOADED_DATA` from local-reducer will be the method that gets used when the action with that name is dispatched.

##### pre/post hooks ####

Often it is not ideal to override a method in the context of a plugin and instead the desired outcome would be to wrap or compose an original reducer method as a
series of reducer methods. To that end, griddle-core uses a concept of pre/post hooks.

**AFTER method**

Append "\_AFTER" to any reducer method name to perform an additional reduce operation on the state object

For example, say we define our reducer plugin array as
`[data-reducer, local-reducer, subgrid-reducer, selection-reducer]`. If subgrid-reducer and selection-reducer both have a method GRIDDLE_LOADED_DATA_AFTER,
the operation flow for GRIDDLE_LOADED_DATA will look a little like the following:

1. The `GRIDDLE_LOADED_DATA` method will reduce the state object
1. `GRIDDLE_LOADED_DATA_AFTER` in subgrid-reducer will return a new (immutable) state object based on the state object it received
1. `GRIDDLE_LOADED_DATA_AFTER` in selection-reducer will return a new state object which will be the resultant state object for the dispatch

![AFTER_REDUCER Diagram](afterReducer.png)

**BEFORE method**

Append \_BEFORE to any reducer method name to modify the state object passed to the default reducer method. Like \_AFTER, these methods are composed if there are
other plugins that contain the same method name.

![BEFORE_REDUCER Diagram](beforeReducer.png)

**AFTER_REDUCE**

If there is an operation that should run directly before returning the final state object for **any** reducer method, it should occur in a AFTER_REDUCE method.
AFTER_REDUCE methods are composed similarly to the BEFORE / AFTER methods above.
![AFTER_REDUCE Diagram](afterReduce.png)

**BEFORE_REDUCE**

If there is an operation that should run before **any** reducer method, it should occur in a BEFORE_REDUCE method.
BEFORE_REDUCE methods are composed similarly to the BEFORE / AFTER methods above.

![BEFORE_REDUCE Diagram](beforeReduce.png)

## griddle-render ##

This package is the main Griddle component and a series of mostly dumb components that make up the grid. The dumb components
are exported so that they can be overriden or wrapped in other components and passed in to Griddle as component overrides.
There is more on exactly how to achieve this in the Customization documentation (Add the link when that section is done).

## griddle-connector ##

This package hooks up griddle-render to griddle-core. This is mostly a standard Redux setup, however, we are treating each grid as its own "application
within an application" for state management purposes -- If there are two instances of Griddle on a page, they will not share the same
state tree.

