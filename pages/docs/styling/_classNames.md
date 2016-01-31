Griddle can also be styled with CSS / SASS / whatever using class names. Griddle takes the following class name properties
on the style object:

-  **column**: The classname(s) to apply to every column component
-  **filter**: The classname(s) to apply to the filter component
-  **noResults**: The classname(s) to apply to the component displayed when there are no results
-  **loading**: The classname(s) to apply to the loading component
-  **pagination**: The classname(s) to apply to the pagination component
-  **row**: The classname(s) to apply to every row
-  **settingsToggle**: The classname(s) to apply to the settings toggle button
-  **settings**: The classname(s) to apply to the settings area
-  **tableBody**: The classname(s) to apply to the table body component
-  **tableHeading**: The classname(s) to apply to the table heading row
-  **tableHeadingCell**: The classname(s) to apply to every heading cell component
-  **table**: The classname(s) to apply to the table

By default these are all null and will only override when specified. We can specify classnames for any / all components
but for the sake of example we will apply a class to the table.

Assuming we have a CSS property defined like:
```
.awesome-table-class {
  font-size: 25px;
}
```

We can setup our grid to use the class name on our table component as follows:

```
const style = {
  classNames={
    table: 'awesome-table-class'
  }
}

...
<Griddle data={data} style={style} />
```

