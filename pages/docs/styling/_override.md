## Overriding Griddle's styles ##

Griddle is styled with a series of inline style objects. Any of these objects can be overriden by passing 
a style object into Griddle that contains the styles that should be modified.

Griddle's components can be styled through a series of inline styles. Griddle is looking for
the following inline style property names:

- **column** - Styles relating to the columns
- **columnTitle** - Column heading styles
- **filter** - The filter component
- **fixedTable** - The table styles that are displayed if the usedFixedTable setting is true
- **pagination** - The styles that apply to the pagination component
- **settingsToggle** - The settings toggle styles
- **table** - The default table styles

For example, if we wanted to toss a super bright border around the filter component,
we could create a style object as follows:

```
const style = {
  inlineStyles: {
    filter: { border: "5px solid #FF00FF"}
  }
}
```

Next we would tell Griddle to use this new style object:

```
<Griddle data={data} settings={settings} />
```


