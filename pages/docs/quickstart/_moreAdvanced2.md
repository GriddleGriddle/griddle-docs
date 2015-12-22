It should be noted that this code above is a shorthand version of a more robust way of defining properties. We'll see in the customization and plugin sections
why the longer form may be better for some scenarios but if you're only defining a couple of properties the columns prop is perfect. The longer version of defining
properties is as follows:

```
<Griddle data={data}>
  <RowDefinition keyColumn="id">
    <ColumnDefinition id="name" order={2} />
    <ColumnDefinition id="state" order={1} />
  </RowDefinition>
</Griddle>
```

