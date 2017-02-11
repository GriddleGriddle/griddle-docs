#### ColumnDefinition ####

- **id** - The column identifier -- this should generally correspond to a record in a data row
- **order** - The order that the column should be displayed in
- **headerCssClassName** - The className to apply to the corresponding table heading cell
- **cssClassName** - The className to apply to this column
- **displayName** - The human readable text for this column. This is used as the title
- **customComponent** - The custom component to use in place of this column. See more on [customization](customization/)
- **sortable** - Can this column be sorted
- **sortType** - The type of sort to apply. Beyond the default string, numeric sort the only additional option currently is date
- **extraData** - Any extra data that should be passed to the custom component

#### RowDefinition ####

- **onClick** - The callback method that will be invoked when a row is clicked. This will receive `rowData` and an `originalData` parameters. `rowData` is the object that has the visible properties and __metadata where as
`originalData` is the row with all columns before they are moved to __metadata.
