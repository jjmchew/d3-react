import React from 'react';
// Change the filename loaded for D3Chart for various exercises
import D3Chart from './D3Chart2';

export default class ChartWrapper extends React.Component {
   componentDidMount() {
      this.setState({
         chart: new D3Chart(this.refs.chart)
      })
   }

   shouldComponentUpdate() {
      return false
   }

   componentWillReceiveProps(nextProps) {
      this.state.chart.update(nextProps.gender);
   }

   render() {
      return (
         <div ref='chart'></div>
      )
   }
}