There are quite a few points to extend or override parts of Griddle but for now
lets take a look at how we would override a view component.

Lets say that we wanted to modify the a column so that it showed a link instead of a
standard column. We would achieve this by passing a custom component in on a `columnProperty`
component.

```
/* assuming there is a component, LinkData defined as:

  const LinkData = React.createClass({
    render() {
      return <a href="#">{this.props.data}</a>
    }
  });

*/
<Griddle data={data}>
  <RowDefinition keyColumn="id">
    <ColumnDefinition id="name" customComponent={LinkData} />
    <ColumnDefinition id="state" />
  </RowDefinition>
</Griddle>
```

