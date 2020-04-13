import React, { useState, useEffect, useRef } from 'react';
// Change the filename loaded for D3Chart for various exercises
import D3Chart from './D3Chart2';

const NewChartWrapper = (props) => {
   const chartRef = useRef(null);
   const [chart, setChart] = useState(null);

   useEffect(() => {
      setChart(new D3Chart(chartRef))
   }, []);

   useEffect(() => {
      setChart(chartRef);
   }, [props.gender]);

   return (
      <div ref={chartRef}>{chart}</div>
   )

}
export default NewChartWrapper;