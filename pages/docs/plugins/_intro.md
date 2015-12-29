As noted in other sections, Griddle is written to be customized. In earlier versions
of Griddle, it became apparent that the architectural choices that we made were
limiting how people could use the grid. While having a starting point is nice,
constantly adding new features at the cost of code clarity / filesize is not ideal.

Griddle 1.0 is based on plugins -- so much so that things that used to be
core Griddle features are now plugins. Lets take a look at how to add a subgrid
plugin to core Griddle.

## Using Plugins ##

As of Griddle 1.0 there is a prop on Griddle for passing in a list of Plugins
to use. Assuming that we want to enable a selection plugin we would have to include
and reference the component as follows:

```
import GriddleSelectionPlugin from 'griddle-selection-plugin';

...
  render() {
    <Griddle data={data} plugins={[GriddleSelectionPlugin]} />
  }
```

