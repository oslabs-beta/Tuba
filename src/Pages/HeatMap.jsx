import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';

export default function HeatMap() {
  // Get error & service data from redux
  const services = useSelector((state) => state.errorSlice.services);
  const errors = useSelector((state) => state.errorSlice.allErrors);
  

  console.log('services-d3: ', services)
  console.log('errors-d3: ', errors)
  // initialize D3 to paint the DOM
  const svgRef = useRef(null);
  // initialize node & link arrays that will inform the graph <- research better way to do this


  const nodes = [];
  const links = [];

  useEffect(() => {
    // clear node & link arrays for potential legacy data 

    nodes.length = 0;
    links.length = 0;

    // Map over service array to create a node.
    services.map((service) => {
      nodes.push({
        id: service.serviceName.srv_id,
        name: service.serviceName.srv_name,
        level: "srv"
      })
    })

    // define the size of the graph window. To be updated when other components are added
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.5;
    // Default color scheme. To be updated later with a unified scheme
    const color = d3.scaleOrdinal(d3.schemeTableau10);
    // define the graph window
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // create node elements
    const nodeElements = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 30)
      .style('fill', node => color(node.name));

// create the text next to each node
    const textElements = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .text( node => node.name)
    .attr('font-size', 15)
    .attr('dx', 19)
    .attr('dy', 3.5)
    .attr('fill', 'white')
  

// populate the graph
  const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-30))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', () => {
      nodeElements.attr('cx', node => node.x)
        .attr('cy', node => node.y);
      textElements.attr('x', node => node.x)
        .attr('y', node => node.y);
      });

    return () => {
      simulation.stop();
    };

  }, [nodes, links])

  return (
    <>
      <div className='background'>
        <svg ref={svgRef}></svg>
      </div>

    </>
  )
}

