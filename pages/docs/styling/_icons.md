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



