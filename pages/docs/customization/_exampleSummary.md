The props that the column custom component receives are:

1. **data**: The data that would normally be passed to the column
1. **rowData**: The rest of the data for the row

**Non-existant column components**

You can create a custom component column without having a corresponding column property in the data. To do this,
you will need to create a new `ColumnDefinition` with an id that doesn't relate to any properties in the data.
From there you can set title and customComponent like any other record but the **custom component will receive null for
`data`** (it will still receive the populated `rowData`, however).

```
<Griddle {...this.props} data={data}>
  <RowDefinition>
    <ColumnDefinition id="name" title="Name" />
    <ColumnDefinition id="someComputation" title="" customComponent={CustomComponent}/>
    <ColumnDefinition id="state" title="State" />
  </RowDefinition>
</Griddle>
```

This technique is useful for creating columns that handle actions related to the row or computations of rowData.

## Overriding non-Column Components ##

All of the default components used in Griddle are exported as part of the DefaultModules object. The
DefaultModules can be included and used as follows:

```
import Griddle, {DefaultModules} from 'griddle-react';
```

### Default Component Modules  ###

1. **Column**
1. **Filter**
1. **NoResults** -- the component that is displayed when there are no results
1. **Pagination** -- the pagination controls
1. **Row**
1. **Settings**
1. **SettingsToggle** -- the component that toggles the settings area
1. **Table**
1. **TableBody**
1. **TableHeading**
1. **TableHeadingCell**

### Basic Example ###

Where ColumnComponents can be defined within the ColumnDefintion, all other components are customized through the `components` prop on Griddle.
By default, the SettingsToggle component is basically just a button. Lets
wrap it in a new component that changes the background color to grey.

We'll start by making a new component that should wrap the settings toggle area. To accomplish this,
a function should be defined that takes the original component as a parameter and returns a new component (aka higher-order component).
Take a look at [this post by
Dan Abramov](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.luf3xr7x0)
for more info on higher-order components.

```
const ApplyBackground = SettingsToggle => React.createClass({
  render() {
    return (
      <span style={{backgroundColor: "#EDEDED"}}>
        <SettingsToggle {...this.props} />
      </span>
    );
  }
});

export default ApplyBackground
```

Once we've created the new component, we need to override the existing Griddle settings toggle component.

```
//Note that DefaultModules also needs to be imported here (or only the component we want to override)
import Griddle, { DefaultModules } from 'griddle-react';
import ApplyBackground from './applyBackground';

const SettingsWithBackground = ApplyBackground(DefaultModules.SettingsToggle);
```

From there we need to pass in the new component to the components prop on Griddle.

```
<Griddle data={data}
  components={{SettingsToggle: SettingsWithBackground}}
/>
```

**Result:**
