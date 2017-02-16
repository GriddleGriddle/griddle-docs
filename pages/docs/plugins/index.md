---
title: Plugins
---
While many smaller modifications can be handled through [customization](/docs/customization), plugins allows for much larger changes and is how much of the core functionality exists today.

You'll likely interact with plugins in two ways -- adding a plugin and creating a plugin.

# Adding a plugin

A plugin is added to Griddle by simply passing it in the `plugins` property, which accepts an array of plugins. Griddle plugins are processed in the order they are defined in the array.

You may find that some plugins require additional configuration.

```
  <Griddle plugins={[Plugin1, Plugin2, PluginWithConfig(config)]} />
```

# Creating a plugin

Your plugin can be used to customize components, wire in to reducers, create new selectors, or initialize Griddles state with some new values.

Griddle will load the following properties from your plugin if they are provided (all are optional):

```
export default {
  components,
  reducer,
  selectors,
  initialState,
}
```

If you need additional configuration or arguments for your plugin, simply export a factory function instead of an object.

## components `Object`

If you've written any customized components for Griddle, the process will be very familiar.

In the components object, you can overwrite, enhance, or create brand new components for use with Griddle.

#### Overwriting a base component

If you want to replace a base component (or one that has been overwritten from a previously added plugin), simply include a new component that has the same name as the component you're replacing.

```
...
components: {
  Row: MyCustomRowComponent, // The base Row component will be overwritten
}
...
```

#### Enhancing a base component

Sometimes, you'll simply want to create a higher order component that wraps an existing base component or component that another plugin has provided. To do this, you'll need to create a component enhancer.

By simply adding a suffix of `Enhancer` to your component will treat it as a higher order component that will wrap the base component.

```
...
components: {
  RowEnhancer: MyRowEnhancer, // The base Row component will be enhanced
}
...
```

See the Position plugin's `TableEnhancer` to see how this is used in a real situation.

#### Adding new components

More often than not, most new components don't need to be added to your plugin's `components` object as they will be imported where they're needed in components that *do* overwrite existing components.

If you do want the expose the ability for other plugins to overwrite / enhance new components you create, simply add them to the `component` property with a distinct name.

```
...
components: {
  SomethingNew: SomethingNew,
}
...
```

## reducer `Object`

When adding functionality to Griddle, you'll likely need to response to actions and update the application state. This can easily be done by adding action handling functions to your `reducer` object.

Griddle uses [Redux](http://redux.js.org/) as well as [ImmutableJS](https://facebook.github.io/immutable-js/), so being familiar with these technologies will make things easier.

Additionally, the entirety of Griddles state can be accessed an modified from a Plugin's reducer.

#### Handling an action

Actions can be handled by functions that match the action's name. A list of all base actions can be found on the (API)[/api] page.
```
ACTION_NAME(state, action) {
  return state;
}
```

#### Pre/Post hooks

Sometimes, you'll need to respond to actions before or after base or plugin reducer functions have modified the state. To do this, simply add the `_BEFORE` or `_AFTER` suffix to your action handler function.

For more information on pre/post hooks and how state makes its way through reducers, see the [Architecture](/docs/architecture/) documentation.

```
ACTION_NAME_BEFORE(state, action) {
  return state;
}

ACTION_NAME_AFTER(state, action) {
  return state;
}
```

## initialState `Object`

If your plugin needs to keep track of additional application state, you'll want to provide an initial state for use during initialization.

This object will be merged with the all Griddle and other Plugin's state via `Object.assign`, so you'll want to make sure that state properties are unique to avoid conflicts with other plugins.

Once merged, value will then be converted into an ImmutableJS Map and accessed in your `reducers` and `selectors`.

Example initial state:
```
{
  ...
  initialState: {
    pluginConfig: {...}
  }
  ...
}
```

## selectors `Object`

Griddle uses [Reselect](https://github.com/reactjs/reselect) to facilitate efficient and consistent access to application state value from our components.

#### Creating a new selector

```
import { createSelector } from 'reselect';
{
  ...
  selectors: {
    dataLengthSelector: createSelector(
      dataSelector,
      (data) => {
        return data.size;
      }
    )
  }
  ...
}
```

#### Replacing an existing selector

Much like components, specific selectors can be replaced by including a selector property with the same name.

```
{
  ...
  selectors: {
    dataSelector: state => state.get('otherData'),
  }
  ...
}
```
