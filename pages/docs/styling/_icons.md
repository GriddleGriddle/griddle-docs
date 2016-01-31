Similar to the inline style object, Griddle contains a custom icons object.

The following icons are available to override:

- **sortDescending** -The icon that is displayed in the table heading when a column is sorted in descending order (default: ▼ )
- **sortAscending** - The icon that is displayed in the table heading when a column is sorted in ascending order  (default: ▲ )
- **parentRowCollapsed** - The icon that is displayed in the left most postiion of a subgrid row when it is collapsed (default: ▶ )
- **parentRowExpanded** - The icon that is displayed in the left most postiion of a subgrid row when it is expanded (default: ▼ )

Lets take a look at how we would replace the basic ascending / descending text with custom components.

```
//use this component in place of the ascending icon ascending component
const Ascending = React.createClass({
  render() {
    return <span style={{backgroundColor: "#FF00AA"}}>(asc)</span>
  }
});

//use this component in place of the descending icon ascending component
const Descending = React.createClass({
  render() {
    return <span style={{backgroundColor: "#AA00FF"}}>(desc)</span>
  }
});

...

const iconStyle = {
  icons: {
    sortAscending: <Ascending>,
    sortDescending: <Descending>
  }
}
...
<Griddle data={data} style={iconStyle} />
```
