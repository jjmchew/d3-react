import React, { useState, useEffect, useRef } from 'react';
// Change the filename loaded for D3Chart for various exercises
import D3Chart from './D3Chart2';

const NewChartWrapper = (props) => {
   const chartRef = useRef(null);
   const [chart, setChart] = useState(null);

   useEffect(() => {
      setChart(new D3Chart(chartRef.current));
   }, []);

   useEffect(() => {
      if (chart !== null) {
         chart.update(props.gender);
      }
   }, [props.gender]);


   return (
      <div ref={chartRef}></div>
   )

}
export default NewChartWrapper;