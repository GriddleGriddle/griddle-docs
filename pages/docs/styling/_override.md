## Inline styles ##

Griddle's components can be styled through a series of inline styles. By default, the individual style objects are empty
but can easily be overriden. Griddle is looking for the following inline style property names:

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

Next we would tell Griddle to use this new style object (please note that we are not disabling the Griddle default inline styles so
the provided styles are overriding the Griddle defaults):

```
<Griddle data={data} style={style} />
```
