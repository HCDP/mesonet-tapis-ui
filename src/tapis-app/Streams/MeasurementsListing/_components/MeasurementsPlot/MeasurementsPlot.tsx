import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { timestamp2Date, timestamp2Moment } from 'utils/timeFormat';

//prevent Plotly memory issues with certain versions of node by using createPlotlyComponent instead of importing Plot from react-plotly.js directly
const Plot = createPlotlyComponent(Plotly);

const MeasurementsPlot: React.FC<{
  location: string;
  measurements: { [datetime: string]: number };
  layout: Partial<Plotly.Layout>;
}> = ({ measurements, layout, location }) => {
  let data: any = [
    {
      x: [],
      y: [],
      type: 'scatter',
    }
  ];

  //ensure ordering
  let timestamps = Object.keys(measurements).sort();
  for(let timestamp of timestamps) {
    let date = timestamp2Date(location, timestamp);
    let value = measurements[timestamp];
    data[0].x.push(date);
    data[0].y.push(value);
  }

  return <Plot data={data} layout={layout} />;
};

export default MeasurementsPlot;
