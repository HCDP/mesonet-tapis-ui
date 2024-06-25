import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { moment2Date, timestamp2Moment } from 'utils/timeFormat';
import { Moment } from 'moment-timezone';

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
    },
  ];

  let tzAware: Moment[] = [];
  //expand dates to 5 minute interval to show gaps
  let dates = Object.keys(measurements).sort();
  let date = timestamp2Moment(location, dates[0]);
  let edate = timestamp2Moment(location, dates[dates.length - 1]);
  while(date <= edate) {
    tzAware.push(date.clone());
    date.add(5, "minutes");
  }

  data[0].x = tzAware.map((m: Moment) => {
    return moment2Date(m);
  });
  data[0].y = tzAware.map((m: Moment) => {
    return measurements[m.toISOString().slice(0, -5) + "Z"];
  });

  return <Plot data={data} layout={layout} />;
};

export default MeasurementsPlot;
