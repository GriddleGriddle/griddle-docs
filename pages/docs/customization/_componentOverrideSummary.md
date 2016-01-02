
While this example only overrode one component, many custom components can be passed in to the `components` prop on Griddle.
While this is a great way to handle customization, [Plugins](../plugins/) can often be a cleaner solution for handling multiple overrides -- especially
if these same set of custom components may be reused on other Griddle components.

### More Advanced Example ###

Now that we have the basics out of the way, lets say we want to use this grid library for something other than a grid... We are going to render a series of
weather related data as a chart but we want to use the state management and filtering / column choosing capabilities that are enabled by default in Griddle.
Lets assume we have weather information for various planets based on earth months:

```
[
    {
      planet: 'Hoth',
      january: '-30',
      february: '-30',
      march: '-30',
      april: '-30',
      ...
      december: '-30'
    },
    {
      planet: 'Tatooine',
      ...
    },
    ...
]
```

We are going to use [react-chartist](https://github.com/fraserxu/react-chartist) / [chartist](https://gionkunz.github.io/chartist-js/) for this example:

```
npm install --save react-chartist
```

On to the chart -- this is a standard react component, using the visibleData prop to determine
what to display:

```
//some hardcoding for example
function getLineChartData(data) {
  return {
    labels: ['Jan', 'Feb', 'March',
      'Apr', 'May', 'June', 'July', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'],
    series: data.map(d => [d.january, d.february, d.march,
      d.april, d.may, d.june, d.july, d.august,
      d.september, d.october, d.november, d.december])
  }
}

const WeatherChart = React.createClass({
  render() {
    const data = getLineChartData(this.props.visibleData);

    return <ChartistGraph
      data={getLineChartData(this.props.data)}
      type={'Line'}
    />
  }
});
```

From here, we can render our Griddle component with the WeatherChart component in place of the
default table (we are also passing in a new legend but that component doesn't really add much to the example)

```
<Griddle
  data={weatherData}
  components={{Table: WeatherChart, Filter: Legend }}
/>
```
