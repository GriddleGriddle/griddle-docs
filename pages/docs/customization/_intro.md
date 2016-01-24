Griddle has been created with customization in mind. In older version's of
Griddle there was one component that had a ton of props on it to handle customization.
While this worked, it was really not ideal for anyone using the grid to keep track of which
props were needed and which could be ignored.

Starting in version 1.0, Griddle exists as several different modules that are
responsible for different parts of the component. At a high level, separating
the packages into their own areas based on concern is the first step of enabling
stronger customization. The description of the
breakdown is available in the [architecture documentation](/docs/architecture/).

## Component Customization ##

While it's technically possible to replace any package in the main Griddle architecture,
design decisions have been made that will hopefully allow individual parts of the
grid component to be overridden while still leveraging the rest of the code.

