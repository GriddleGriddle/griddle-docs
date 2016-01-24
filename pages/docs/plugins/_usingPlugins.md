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

