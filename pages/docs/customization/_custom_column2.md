The props that the column custom component receives are:

- **data**: The data that would normally be passed to the column
- **rowData**: The rest of the data for the row
- **originalData**: This is the row data without the Griddle __metadata property
- **rowIndex**: The index of the current row in relation to the other rendered rows
- **absoluteRowIndex** The index of the current row in the entire set of data
- **extraData**: Any extraData to pass to the component (this can be data not tracked by Griddle.

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


