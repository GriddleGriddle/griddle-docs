Griddle has been created with customization in mind. Previous versions of
Griddle were implemented as a single component with numerous props.
While this worked, it was not ideal

Starting in version 1.0, Griddle exists as several separate packages; each of which are
responsible for their repsective part of the overall component. At a high level, separating
the packages into their own areas based on concern is the first step of enabling
stronger customization. The description of the
breakdown is available in the [architecture documentation](/docs/architecture/).

## Component Customization ##

While it's technically possible to replace any package in the main Griddle architecture,
design decisions have been made that will hopefully allow individual parts of the
grid component to be overridden while still leveraging the rest of the code.

