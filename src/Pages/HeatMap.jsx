import React, { useEffect, useRef } from 'react';
import Nav from '../Components/Nav';
import * as d3 from 'd3'


export default function HeatMap() {
    const nodes = [ 
      { id: "mammal", group: 0, label: "Mammals", level: 1 },
      { id: "dog"   , group: 0, label: "Dogs"   , level: 2 },
      { id: "cat"   , group: 0, label: "Cats"   , level: 2 },
      { id: "fox"   , group: 0, label: "Foxes"  , level: 2 }, 
      { id: "elk"   , group: 0, label: "Elk"    , level: 2 },
      { id: "insect", group: 1, label: "Insects", level: 1 },
      { id: "ant"   , group: 1, label: "Ants"   , level: 2 },
      { id: "bee"   , group: 1, label: "Bees"   , level: 2 },  
      { id: "fish"  , group: 2, label: "Fish"   , level: 1 },
      { id: "carp"  , group: 2, label: "Carp"   , level: 2 },
      { id: "pike"  , group: 2, label: "Pikes"  , level: 2 } 
    ];
  
    const svgRef = useRef(null);
  
    useEffect(() => {
      const width = 500;
      const height = 300;
  
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
  
      const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-20))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', () => {
          nodeElements.attr('cx', node => node.x)
            .attr('cy', node => node.y);
          textElements.attr('x', node => node.x)
            .attr('y', node => node.y);
        });
  
      const nodeElements = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 10);
  
      const textElements = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .text(node => node.label)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);
  
      return () => {
        // Cleanup simulation when component unmounts
        simulation.stop();
      };
    }, [nodes]);
  
    return (
      <>
        <Nav />
        <div className='background'>
          <svg ref={svgRef}></svg>
        </div>
      </>
    );
  }
  