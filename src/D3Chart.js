import * as d3 from 'd3';

const url = 'https://udemy-react-d3.firebaseio.com/ages.json';

export default class D3Chart {
   constructor(element) {
      const svg = d3.select(element)
         .append('svg')
         .attr('width', 500)
         .attr('height', 500);

      d3.json(url).then(agesData => {
         console.log(agesData);

         const rects = svg.selectAll('rect')
            .data(agesData)

         rects.enter()
            .append('rect')
            .attr('x', (d, i) => i * 100)
            .attr('y', 50)
            .attr('width', 70)
            .attr('height', d => d.age * 10)
            .attr('fill', d => {
               // rgb(d * 10, d * 10, d * 10)
               if (d.age > 10) {
                  return 'red'
               }
               return 'green'

            })
      });


   }
}
