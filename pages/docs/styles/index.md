---
title: Styles
---
Griddle ships with default classnames for all of the components that are rendered but as we will see,
they are able to be switched out with relative ease.

By default, the Griddle classNames are as follows:

```
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
```

#### Property Names ####

While the previous block is the output of the classnames, the property names are used throughout the styling options to set attributes of Griddle's styles.

Cell, Filter, Loading, NextButton, NoResults, PageDropdown, Pagination, PreviousButton, Row, RowDefinition, Settings, SettingsToggle, Table, TableBody, TableHeading, TableHeadingCell, TableHeadingCellAscending, TableHeadingCellDescending

#### Style Config ####

Griddle receives a prop called `styleConfig` that contains information about the various styles, classNames, and icons used by the Grid. This object can be overriden to change the styling of the Grid.

```
  {
    classNames: {},
    icons: {},
    styles: {}
  }
```

#### classNames ####

An object that defines the classNames that should be used within Griddle. The styleConfig.classNames object should only have properties that are in the property names described above (or any properties that a plugin may add).


#### styles ####

An object that defines the styles that should be used within Griddle. The styleConfig.styles object should only have properties that are in the property names described above (or any properties that a plugin may add).

#### icons ####

Griddle defines icons for use in some components. Currently, the TableHeadingCell component is the only component that uses icons (icons are not necessarily just icons but could be components as well). The icons object in Griddle's default settings looks like:

```
icons: {
  TableHeadingCell: {
    sortDescendingIcon: '▼',
    sortAscendingIcon: '▲'
  },
},
```

#### Example styleConfig ####

```
const styleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: <small>(desc)</small>,
      sortAscendingIcon: <small>(asc)</small>,
    },
  },
  classNames: {
    Row: 'row-class',
  },
  styles: {
    Filter: { fontSize: 18 },
    Table: { border: "2px solid #555 "},
  }
}

...

<Griddle styleConfig={styleConfig} ... />
```
