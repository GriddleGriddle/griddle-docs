---
title: API
---

Griddle has a number of props and configuration options that can be used. This document attempts to capture all the options that can be set when using Griddle.

## Data ##

Griddle has a `data` prop available. The `data` prop is the array of data that Griddle should render. This data should be an array of JSON objects or a class. For example:

```
const data = [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Koch Becker",
    "city": "Johnsonburg",
    "state": "New Jersey",
    "country": "Madagascar",
    "company": "Eventage",
    "favoriteNumber": 2
  },
  ...
]
```

## Plugins ## 

The `plugins` prop is an array of Griddle plugins. Griddle plugins must follow the structure described in [the plugins section](/plugins/).
Griddle plugins are processed in the order they are defined in the array.'

```
  <Griddle
    data={data}
    plugins={[Plugin1, Plugin2, ..., Plugin6]}
  />
```

## Events ##

The `events` prop is an object containing all external events that Griddle should interact with. The events that Griddle knows about by default are:

```
    onFilter,
    onSort,
    onNext,
    onPrevious,
    onGetPage
```

If an event is not defined it will be a noop but if one of the default events is defined, Griddle will call it when filtering / paging / etc.

## Sort Propeties ##

The `sortProperties` prop defines the default sort options for Griddle. The `sortProperties` is an array of `sortProperty` objects and should look like the following:

```
  sortProperties: [
    { id: 'one', sortAscending: true },
    { id: 'two', sortAscending: false }
  ];
```

* **id**: The column id. Theid of the sortProperty object should match up to the `id` of the column or property in the data objects.
* **sortAscending**: defines whether or not the column should be ascending or desecnding order.

## Style Config ##

The `styleConfig` prop defines the styling options for Griddle. This is covered in more detail in [the styles section of the docs](/docs/styles/).

The `styleConfig` has the shape `{ icons, classNames, styles}` and by default looks like: 

```
{
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: '▼',
      sortAscendingIcon: '▲'
    },
  },
  classNames: {
    Cell: 'griddle-cell',
    Filter: 'griddle-filter',
    Loading: 'griddle-loadingResults',
    NextButton: 'griddle-next-button',
    NoResults: 'griddle-noResults',
    PageDropdown: 'griddle-page-select',
    Pagination: 'griddle-pagination',
    PreviousButton: 'griddle-previous-button',
    Row: 'griddle-row',
    RowDefinition: 'griddle-row-definition',
    Settings: 'griddle-settings',
    SettingsToggle: 'griddle-settings-toggle',
    Table: 'griddle-table',
    TableBody: 'griddle-table-body',
    TableHeading: 'griddle-table-heading',
    TableHeadingCell: 'griddle-table-heading-cell',
    TableHeadingCellAscending: 'griddle-heading-ascending',
    TableHeadingCellDescending: 'griddle-heading-descending',
  },
  styles: {
  }
};
```

[See the styles section](/docs/styles/) for more information on this.


## Page Properties ##

The `pageProperties` prop is an object that describes what data and how much should be shown in Griddle. For example to say that Griddle is currently on page 10 of 45
and has 15 rows displayed, this would be achieved through the pageProperties object. By default, `pageProperties` looks like the following:

```
{
  currentPage: 1,
  pageSize: 10
},
```

The pageProperties object has the following properties:

* **currentPage**: The page that Griddle is currently displaying.
* **pageSize**: The number of records to show on each page of data
* **recordCount**: The max number of records in the collection -- this property will be ignored when using the `localPlugin`

## Components ##

Any component used in Griddle can have a user-supplied component that will be used instead. This prop defines the components that Griddle should use in place of the defaults.
Components passed in on the `components` prop will override both Griddle defaults and plugins. Examples of providing component overrides are available in [the customization page](/docs/customization/).

All components used in Griddle exist as a `container` and a `view` component. Views are entirely responsible for rendering data whereas `container` components interact with the store state and context.
Griddle uses its own Redux store for managing state and all of the components live in the context (this is a big part of what makes plugins work). 

The default Griddle plugins are as follows: 

* **Cell**: The Component that defines an individual Cell in Griddle. Expected props are:
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *value*: The value to display in the Cell
  *  *onClick*: The function to call when the component is clicked
  *  *onMouseEnter*: The function to call when mouse hovers over component
  *  *onMouseLeave*: The function to call when mouse leaves component
* **CellContainer**: The container component that connects to the redux store (through selectors) and context to obtain data that the `Cell` view component needs. Expected props are:
  *  *griddleKey*: The row key automatically provided by Griddle for the given row record
  *  *columnId*: The id of the column
* **Row**: The component that defines a Row in Griddle. Expected Props are:
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *griddleKey*: The row key automatically provided by Griddle for each record
  *  *columnIds*: The ids of the visible columns
  *  *Cell*: The Cell component to render
* **RowContainer**: The component that connects to the redux store and context to get the list of visible columns and obtain other data that the `Row` view component needs. Expected prop(s) are:
  *  *griddleKey*: The row key automatically provided by Griddle for the given row record.
* **Table**: The view component responsible for rendering the `table` tag and its children. Expected prop(s) are:
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *TableHeading*: The TableHeading component to render
  *  *TableBody*: The table body component to render
* **TableContainer**: The component that connects to the redux store and context to get the data that the `Table` view component needs
* **TableBody**: The component that defines the `tbody` element for use in the datagrid. Expected prop(s) are:
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *rowIds*: The griddleKeys for the rows to render
  *  *Row*: The Row component to render
* **TableBodyContainer**: The component that connects to the Redux store and context to get the data that the `TableBody` component needs. The visibleRowIds are obtained in this container component
* **TableHeading**: The component that defines the `thead` element. Expected prop(s) are:
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *columnTitles*: The column titles to display
  *  *columnIds*: The ids of the displayed columns
  *  *TableHeadingCell*: The TableHeadingCell component to render for each column
* **TableHeadingContainer**: The component that connects to the Redux store and context to get the props that the `TableHeading` component needs. This component is responsible for obtaining the column titles and ids from the store
* **TableHeadingCell**: The view component responsible for rendering a table heading element (`th`). Expected prop(s) are:
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *title*: The title text to display
  *  *columnId*: The id of the column to display
  *  *onClick*: The event that will fire when the cell heading is clicked
  *  *onMouseEnter*: The event that will fire when the mouse hovers over the cell
  *  *onMouseLeave*: The event that will fire when the mouse leaves the component
* **TableHeadingCellContainer**: The component that is responsible for connecting to the Redux store and obtaining the data that the TableHeadingCell component needs.
* **Layout**: A component that defines the overall layout for Griddle. For example, by default the Griddle layout is setup so that the Filter and Settings components are above the Table and Pagination is under the Table. This can all be changed with the `Layout` component. [See more on this in the Customization section](/docs/customization/). Expected prop(s):
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *Table*: The table component to use in Griddle
  *  *Pagination*: The pagination component to use in Griddle
  *  *Filter*: The filter component to use in Griddle
  *  *SettingsWrapper*: The default settings wrapper to use in Griddle
* **LayoutContainer**: The component that connects to context to get the components that the Layout component needs to know about 
* **NextButton**: The component that is used to obtain the next page of data. Expected prop(s):
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *hasNext*: Whether or not there is more data to display.
  *  *onClick*: The event that fires when the NextButton is clicked
* **NextButtonContainer**: The container component that is responsible for obtaining whether or not there is more data to display from the store. The NextButtonContainer wraps a nextButton with this data
* **PageDropdown**: The dropdown component that is used for displaying active page and allows for jumping to another page by page number. Expected prop(s):
  *  *className*: The className to apply to this component
  *  *style*: The style to apply to this component
  *  *maxPages*: The max number of pages available
  *  *currentPage*: The page of data that is currently displayed.
  *  *setPage*: The event that is fired when a specific page index is chosen
* **PageDropdownContainer**
* **Pagination**
* **PaginationContainer**
* **PreviousButton**
* **PreviousButtonContainer**
* **Filter**
* **FilterContainer**
* **SettingsToggle**
* **SettingsToggleContainer**
* **SettingsWrapper**
* **SettingsWrapperContainer**
* **Settings**
* **SettingsContainer**

[See the customization page](/docs/customization/) for more information on how to override components in Griddle.

## RowDefinition ##

Griddle has a single child prop, `RowDefinition` which is a component in Griddle. You can import `RowDefinition` alongside Griddle:

```
import Griddle, { RowDefinition } from 'griddle-react';
```

Right now this is mostly a placeholder for ColumnDefinitions but will have more properties in a later version (such as `keyColumn` instead of Griddle supplying an internal key per record).

## ColumnDefinition ##

`RowDefinition` takes one more many `ColumnDefinition` components. The `ColumnDefinition` components define characteristics of a given column. Using `ColumnDefinition` components looks like:

```
  <Griddle data={data}>
    <RowDefinition>
      <ColumnDefinition id="name" title="Name" />
      <ColumnDefinition id="company" title="Company order={1} />
    </RowDefinition>
  </Griddle>
```

The following properties are available on `ColumnDefinition` components.

* **cssClassName**: The css class name to apply to this column.
* **customComponent**: A component that should be used in the cell. [See the customization page](/customization/) for more information on this.
* **customHeadingComponent**: A component that should be used in the CellHeading. [See the customization page](/customization/) for more information on this.
* **headerCssClassName**: The css class name to apply to the header for the column
* **id**: The id of the column that this definition applies to. For example, if `data` had an array of objects that looked like `{ id: 1, name: 'Mayer Leonard', state: 'Ohio' }`, an id of `name` would denote that the current `ColumnDefinition` corresponds to the `name` prop in the data.
* **isMetadata**: Describes whether or not this column should be treated as metadata.
* **order**: The order in which the column should be displayed. If not defined, Griddle will use the order that the columns were received. If there is a mix of ordered an non-ordered columns, Griddle will use ordered columns first, followed by unordered.
* **title**: The display text for the column heading. For example, if the data property is `name` and you wanted to display it as `Fullname` -- this could be achieved through this, `title` property.
* **width**: The width of the column

 
