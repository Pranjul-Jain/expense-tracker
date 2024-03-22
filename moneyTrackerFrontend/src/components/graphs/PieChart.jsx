import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [["pranjul",345],["Abhi",124],["Yuvraj",156]];
const PieChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie().value(d => d[1]);
    const arcs = pie(data);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcLabel = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => {
        // You can define colors based on index or any other criteria
        return d3.schemeCategory10[i % 10];
      })
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Add percentage and name labels
    svg.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .text(d => `${d.data[0]}: ${(d.endAngle - d.startAngle) / (2 * Math.PI) * 100}%`);
  }, [data]);

  return <svg ref={svgRef} width={300} height={300}></svg>;
};

export default PieChart;
