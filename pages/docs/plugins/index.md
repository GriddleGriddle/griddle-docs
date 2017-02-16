---
title: Plugins
---
While many smaller modifications can be handled through [customization](/customization), plugins allows for much larger changes and is how much of the core functionality is ____.

You'll likely interact with plugins in two ways -- adding a plugin and creating a plugin.

## Adding a plugin

A plugin is added to Griddle by simply passing it in the `plugins` property, which accepts an array of plugins.

```
  <Griddle plugins={[yourPlugin]} />
```

You'll find that some plugins may act as factories

## Creating a plugin

Your plugin can be used to customize components, wire in to reducers, create new selectors, or initialize Griddles state with some new values.

And can include the following properties:

```
export default {
  components,
  reducer,
  selectors,
  initialState,
}
```

If you need additional configuration or arguments for your plugin, simply export a factory function instead of an object.

## Components

This operates in a very similar manner to 
