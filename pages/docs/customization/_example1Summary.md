The props that the column custom component receives are:

1. **data**: The data that would normally be passed to the column
1. **rowData**: The rest of the data for the row

With Griddle 1.0, only the column definition has a customComponent prop. You may
be thinking, I thought you made this more customizable!?! You'd be correct in
questioning that notion.

Instead of adding custom component to everything, the Griddle component recieves a
`components` prop. Any component used internall can be overriden. Additionally,
Griddle exports all of the view components that are used internally so the default
components can be used with higher order components.

The default components are (with explanation for ones that may not be 100% clear):

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

## Component Overriding Example ##

By default, the SettingsToggle component is basically just a button. Lets
wrap it in a new component that changes the background color of that area.


