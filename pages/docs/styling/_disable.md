Don't like Griddle's default styles? No problem -- turn them off entirely by setting the useGriddleStyles property to false. Griddle will render as a plain table that you can apply your styles to.

To turn Griddle's styles off, we're going to create an object that gets merged with Griddle's default styles. The settings has a property for `useGriddleStyles`.

```
const settings = {
  useGriddleStyles: false
}
```

From there we pass this settings object in on Griddle which will remove all of
Griddle's inline styling

```
<Griddle data={data} settings={settings} />
```


