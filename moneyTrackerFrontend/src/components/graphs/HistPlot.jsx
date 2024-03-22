import React from 'react';
import * as d3 from 'd3';

const data = [["pranjul",445],["Abhi",124],["Yuvraj",156]];

const HistPlot = ({
  className
}) => {
  const svgWidth = 600;
  const svgHeight = 650;

  const xScale = d3.scaleBand()
    .domain(data.map((_, index) => index))
    .range([0, svgWidth])

  const yScale = d3.scaleLinear()
    .domain([0, 545])  
    .range([0, svgHeight])

  return (
    <div className={className}>
      <svg className='pb-6' width={svgWidth} height={svgHeight}>
        {data.map((dataPoint, index) => {

          return (
          <g key={index}>
            <rect
              y={xScale(index)}  
              x={0}
              height={xScale.bandwidth()}  
              width={yScale(dataPoint[1])} 
              fill={randomColor()}
              stroke="black"
              strokeWidth={2}
              fillOpacity={0.8}
            />
            <text
              y={xScale(index)+xScale.bandwidth() / 2}  
              x={yScale(dataPoint[1])+ 20}  
              textAnchor="middle"
              fill="black"
            >
              {dataPoint[1]}
            </text>
            <text
              y={xScale(index)+xScale.bandwidth() / 2}  
              x={30}  
              textAnchor="middle"
              fill="black"
            >
              {dataPoint[0]}
            </text>
          </g>
        )})}
      </svg>
    </div>
  );
};

function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default HistPlot;
