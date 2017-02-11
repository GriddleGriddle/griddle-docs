While having the overall architecture based on plugins has some advantages,
the ability to have community plugins is far more important. Griddle plugins
are very closely related to the [core architecture](../architecture/) (and its good to know that before
proceeding) and are basically mini redux powered modules.

A Griddle plugin is, by default, a module that consists of the following properties:

1. **name** -- The name of the plugin
1. **actions** -- Action creators that the plugin uses
1. **constants** -- The constants used by the actions / stores
1. **helpers** -- Methods that are used in the reducers to achieve specific tasks
1. **states** -- Any initial state data that needs to be setup for the plugin
1. **reducers** -- The reducers used by the plugin
1. **components** -- Any components / component overrides that the plugin introduces

A plugin can consist of any or all of the properties listed above but **plugins must have a name**.


The entry for griddle-subgrid-plugin looks a bit like this:

```
export default {
  name: "GriddleSubgrid",
  actions: actions,
  constants: constants,
  helpers: helpers,
  states: initialState,
  reducers: reducers,
  components: components
};
```
When a plugin is included in Griddle, the initialization steps compose and combine
the various parts of the plugin as needed.
[See more on Griddle's structure in the core architecture documentation](../architecture/).


We are now going to walk through parts of the the selection plugin to
help establish how plugins are structured.

### Initial State ###

The initial state for the plugin is defined as an immutable list that will track
which rows are selected.

```
import Immutable from 'immutable';

export default {
  selectedRecords: Immutable.List()
}
```

### Actions ###

We need to add one action to griddle for changing the selected state when
the check box is toggled.

```
import * as types from './constants';

export function toggleRowSelection(griddleKey) {
  return {
    //assuming there is GRIDDLE_ROW_SELECTION_TOGGLED in constants
    type: types.GRIDDLE_ROW_SELECTION_TOGGLED,
    griddleKey
  };
}
```

### Reducers ###

The selection plugin has a reducer that mutates state based on the `GRIDDLE_ROW_SELECTION_TOGGLED` action.

```
//assuming there is GRIDDLE_ROW_SELECTION_TOGGLED in constants
export function GRIDDLE_ROW_SELECTION_TOGGLED(state, action, helpers) {
  const { griddleKey } = action;
  const columns = helpers.getDataColumns(state, state.get('data'));
  const properties = getProperties(columns);

  const template = (row) => row
    .set('selected', row.get('griddleKey') === griddleKey ?
      !row.get('selected') :
      row.get('selected'));

  return state.set('data', selectRow(state.get('data'), template, griddleKey, properties.childrenPropertyName));
}
```

In this case there are no conflicts since the method is handling an action defined
within the plugin, however, if there are other plugins
 that defined `GRIDDLE_ROW_SELECTION_TOGGLED`, it could cause unexpected behavior.

It's important to note that **the last reducer from the plugin passed in to the Griddle plugins prop will
override all others**. For instance if there was a GriddleSelection plugin and a GriddleSubgrid plugin
that both defined `GRIDDLE_ROW_SELECTION_TOGGLED` and they were passed to Griddle like
`<Griddle plugins={[GriddleSelectionPlugin, GriddleSubgridPlugin]}>` -- the action handler in GriddleSubgridPlugin
would be the method that is used.

If the desired behavior is to compose action handlers where
the first plugin will mutate the state object and pass that state object as a parameter
to an action handler, **use \_AFTER methods instead** ([More info](../architecture/))

### Components ###

Components can be defined in plugins to override Griddle default components as
described in the [custom components](../customization') section of the documentation.
