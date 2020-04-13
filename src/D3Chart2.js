import * as d3 from 'd3';

const url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json';
const url2 = 'https://udemy-react-d3.firebaseio.com/tallest_women.json';
const MARGIN = { TOP: 10, BOTTOM: 60, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
   constructor(element) {
      const vis = this;

      vis.svg = d3.select(element)
         .append('svg')
         .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
         .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
         .append('g')
         .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)


      vis.xLabel = vis.svg.append('text')
         .attr('x', WIDTH / 2)
         .attr('y', HEIGHT + 50)
         .attr('text-anchor', 'middle')
         .text("The world's tallest men");

      vis.svg.append('text')
         .attr('x', -(HEIGHT / 2))
         .attr('y', -50)
         .attr('text-anchor', 'middle')
         .text('Height in cm')
         .attr('transform', 'rotate(-90)');

      vis.xAxisGroup = vis.svg.append('g')
         .attr('transform', `translate(0,${HEIGHT})`)

      vis.yAxisGroup = vis.svg.append('g')

      Promise.all([
         d3.json(url),
         d3.json(url2)
      ]).then((datasets) => {
         console.log('.THEN promise', datasets);
         vis.menData = datasets[0];
         vis.womenData = datasets[1];
         vis.update('men');

         // Optional Code that changes datasets every 1 sec
         // let dataset = 'men';
         // let flag = true;
         // vis.update(dataset);

         // d3.interval(() => {
         //    dataset = flag ? 'men' : 'women';
         //    vis.update(dataset);
         //    vis.xLabel.text(`The world's tallest ${dataset}`);
         //    flag = !flag;
         // }, 1000);

      })

      // OLD code using just 1 data set
      // d3.json(url).then(data => {
      //    console.log(data);
      //    vis.data = data;
      //    d3.interval(() => {
      //       vis.update(vis);
      //    }, 1000);
      // });
   }

   update(gender) {
      console.log('d3chart2 update ', gender);
      const vis = this;

      vis.data = (gender === 'men') ? vis.menData : vis.womenData;
      vis.xLabel.text(`The world's tallest ${gender}`);

      const y = d3.scaleLinear()
         .domain([d3.min(vis.data, d => d.height) * 0.95, d3.max(vis.data, d => d.height)])
         .range([HEIGHT, 0])


      const x = d3.scaleBand()
         .domain(vis.data.map(d => d.name))
         .range([0, WIDTH])
         .padding(0.4);

      const xAxisCall = d3.axisBottom(x)

      vis.xAxisGroup.transition().duration(500).call(xAxisCall);


      const yAxisCall = d3.axisLeft(y)
      vis.yAxisGroup.transition().duration(500).call(yAxisCall);

      // DATA JOIN
      const rects = vis.svg.selectAll('rect')
         .data(vis.data);

      // EXIT
      rects.exit()
         .transition().duration(500)
         .attr('height', 0)
         .attr('y', HEIGHT)
         .remove();

      // UPDATE
      rects.transition().duration(500)
         .attr('x', d => x(d.name))
         .attr('y', d => y(d.height))
         .attr('width', x.bandwidth)
         .attr('height', d => HEIGHT - y(d.height));

      // ENTER
      rects.enter()
         .append('rect')
         .attr('x', d => x(d.name))
         .attr('width', x.bandwidth)
         .attr('fill', d => {
            // rgb(d * 10, d * 10, d * 10)
            if (d.height > 10) {
               return 'red'
            }
            return 'green'

         })
         .attr('y', HEIGHT)
         .transition().duration(500)
         .attr('y', d => y(d.height))
         .attr('height', d => HEIGHT - y(d.height))

   }


}
