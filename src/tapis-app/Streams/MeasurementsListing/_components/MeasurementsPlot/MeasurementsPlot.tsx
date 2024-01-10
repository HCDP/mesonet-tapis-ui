import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { date2hst } from 'utils/timeFormat';

//prevent Plotly memory issues with certain versions of node by using createPlotlyComponent instead of importing Plot from react-plotly.js directly
const Plot = createPlotlyComponent(Plotly);

const MeasurementsPlot: React.FC<{
  measurements: { [datetime: string]: number };
  layout: Partial<Plotly.Layout>;
}> = ({ measurements, layout }) => {
  let data: any = [
    {
      x: [],
      y: [],
      type: 'scatter',
    },
  ];

  //expand dates to 5 minute interval to show gaps
  let dates = Object.keys(measurements).sort()
  let date = new Date(dates[0]);
  let edate = new Date(dates[dates.length - 1]);
  while(date <= edate) {
    data[0].x.push(date2hst(date));
    date.setMinutes(date.getMinutes() + 5);
  }

  for (let ts of data[0].x) {
    data[0].y.push(measurements[ts]);
  }

  return <Plot data={data} layout={layout} />;
};

export default MeasurementsPlot;
