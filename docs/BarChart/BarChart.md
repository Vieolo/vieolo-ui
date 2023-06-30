# Bar Chart
Bar chart uses `d3` package under the hood to render the charts.

Bar chart component is meant to support many different types of the bar charts using one component by changing the type of data or props.

## Types

#### Direction
the `BarChart` component can be rendered in two directions: `horizontal` and `vertical`

The horizontal layout is more appropriate in cases where the number of bars is not known and can potentially be unlimited. So, the horizontal view might be more appropriate since the chart can grow vertically and accomodate all of the bars.

#### Bar type
The bars displayed in the chart can be of the following types:
- `Normal bar`: These are regular bars. use `BarChartData[]` to render this type.
- `Stacked bar`: In this case, each bar contains a series of smaller bars indicating the breakdown of each bar. use `StackedBarChartData[]` to render this type of bars.
- `Grouped Bar`: In this case, bars are placed inside a group (as compared to the stacked bar where they are placed in a single bar). The structure of the data used by this type of chart is identical to that of `Stacked Bar` and the differentiation is made by the `groupType` prop.