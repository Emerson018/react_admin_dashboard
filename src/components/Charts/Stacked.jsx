import React from 'react'

import { ChartComponent, SeriesCollectionDirective,
SeriesDirective, Inject, Legend, Category, StackingColumnSeries,
Tooltip } from '@syncfusion/ej2-react-charts';

import { stackedCustomSeries, stackedPrimaryXAxis,
stackedPrimaryYAxis } from '../../data/dummy';

const Stacked = ({width, height}) => {
  return (
    <ChartComponent
      width={width}
      height={height}
      id='charts'
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
    >
      <Inject services={[StackingColumnSeries, Legend, Tooltip, Category]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((series, index) => {
          return (
            <SeriesDirective
              key={index}
              dataSource={series.dataSource}
              xName={series.xName}
              yName={series.yName}
              name={series.name}
              type={series.type}
              marker={series.marker}
              width={2}
              animation={{ enable: true }}
            />
          )
        })}
      </SeriesCollectionDirective>

    </ChartComponent>
  )
}

export default Stacked