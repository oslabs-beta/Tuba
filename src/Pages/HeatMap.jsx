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
  
    const links = [
      { target: "mammal", source: "dog" , strength: 0.7 },
      { target: "mammal", source: "cat" , strength: 0.7 },
      { target: "mammal", source: "fox" , strength: 0.7 },
      { target: "mammal", source: "elk" , strength: 0.7 },
      { target: "insect", source: "ant" , strength: 0.7 },
      { target: "insect", source: "bee" , strength: 0.7 },
      { target: "fish"  , source: "carp", strength: 0.7 },
      { target: "fish"  , source: "pike", strength: 0.7 },
      { target: "cat"   , source: "elk" , strength: 0.1 },
      { target: "carp"  , source: "ant" , strength: 0.1 },
      { target: "elk"   , source: "bee" , strength: 0.1 },
      { target: "dog"   , source: "cat" , strength: 0.1 },
      { target: "fox"   , source: "ant" , strength: 0.1 },
      { target: "pike"  , source: "dog" , strength: 0.1 }
    ];
  
    const svgRef = useRef(null);
  
    useEffect(() => {
      const width = 500;
      const height = 300;
  
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
  
      const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-60))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('link', d3.forceLink(links).id(d => d.id).strength(d => d.strength))
        .on('tick', () => {
          nodeElements.attr('cx', node => node.x)
            .attr('cy', node => node.y);
          textElements.attr('x', node => node.x)
            .attr('y', node => node.y);
          linkElements.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
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
  
      const linkElements = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#E5E5E5');
  
      return () => {
        simulation.stop();
      };
    }, [nodes, links]);
  
    return (
      <>
        <Nav />
        <div className='background'>
          <svg ref={svgRef}></svg>
        </div>
      </>
    );
  }
  