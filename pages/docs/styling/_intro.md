Third-party components should work with your styles rather than force you
into specific styling structure or framework. Griddle comes with default inline styling,
however, it has been designed with the expectation that the inline styling will be
augmented or replaced in most circumstances.

## Turning off Griddle's styles ##

Don't like Griddle's default styles? No problem -- turn them off entirely by setting the useGriddleStyles property to false. Griddle will render as a plain table that you can apply your styles to.

To turn Griddle's styles off, we're going to create an object that gets merged with Griddle's default styles. The settings has a property for `useGriddleStyles`.

```
const settings = {
  useGriddleStyles: false
}
```

From there we pass this settings object in on Griddle which will remove all of
Griddle's inline styling

```
<Griddle data={data} settings={settings} />
```

## Overriding Griddle's styles ##
Griddle is styled with a series of inline style objects. Any of these objects can be overriden by passing 
a style object into Griddle that contains the styles that should be modified.

Griddle's components can be styled through a series of inline styles. Griddle is looking for
the following inline style property names:

- **column** - Styles relating to the columns
- **columnTitle** - Column heading styles
- **filter** - The filter component
- **fixedTable** - The table styles that are displayed if the usedFixedTable setting is true
- **pagination** - The styles that apply to the pagination component
- **settingsToggle** - The settings toggle styles
- **table** - The default table styles

For example, if we wanted to toss a super bright border around the filter component,
we could create a style object as follows:

```
const style = {
  inlineStyles: {
    filter: { border: "5px solid #FF00FF"}
  }
}
```

Next we would tell Griddle to use this new style object:

```
<Griddle data={data} settings={settings} />
```

## Icons ##

Similar to the inline style object, Griddle contains an object that contains the icons.
This icon object can be overriden with additional icons.

The following icons are available to override: 

- **sortDescending** -The icon that is displayed in the table heading when a column is sorted in descending order (default: ▼ )
- **sortAscending** - The icon that is displayed in the table heading when a column is sorted in ascending order  (default: ▲ )
- **parentRowCollapsed** - The icon that is displayed in the left most postiion of a subgrid row when it is collapsed (default: ▶ )
- **parentRowExpanded** - The icon that is displayed in the left most postiion of a subgrid row when it is expanded (default: ▼ )

If we wanted to use a custom ascending / descending text, we could by creating a custom style object with an icons property and passing that to Griddle:

```
const iconStyle = {
  icons: {
    sortAscending: '(asc)',
    sortDescending: '(desc)'
  }
}
...
<Griddle data={data} style={iconStyle} />
```



