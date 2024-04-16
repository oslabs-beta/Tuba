import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import HeatmapDescription from '../Components/Heatmap/HeatmapDescription';
import { setSelected } from '../Redux/heatSlice';


export default function HeatMap() {
  // Get error & service data from redux
  const dispatch = useDispatch()
  const services = useSelector((state) => state.errorSlice.services);
  const errors = useSelector((state) => state.errorSlice.allErrors);
  const serviceLinks = useSelector((state) => state.errorSlice.connections.connections)
  const selected = useSelector((state) => state.heat.selected)
  const selectedError = errors.filter((error) => error.err_id === selected)

  console.log('services-d3: ', services)
  console.log('errors-d3: ', errors)
  console.log('connections-d3', serviceLinks)
  console.log('selected node: ', selected)
  console.log('selected error: ', selectedError[0])

  function handleSelect(id){
    dispatch(setSelected(id))
  }

  // initialize D3 to paint the DOM
  const svgRef = useRef(null);
  // initialize node & link arrays that will inform the graph <- research better way to do this


  const nodes = [];
  const links = [];

  useEffect(() => {
    // clear node & link arrays for potential legacy data 

    nodes.length = 0;
    links.length = 0;

    // Iterate over service array to create a node.
    services.forEach((service) => {
      nodes.push({
        id: `srv_${service.serviceName.srv_id}`,
        name: service.serviceName.srv_name,
        level: "srv"
      })
    })
    // Iterate over Errors to create a node
    errors.forEach((error) => {
      nodes.push({
        id: `err_${error.err_id}`,
        name: error.err_type,
        level: 'err'
      })
    })

    // Map over the connections to create the links.
    serviceLinks.forEach((connections) => {
      links.push({
        target: `srv_${connections.con_srv2}`,
        source: `srv_${connections.con_srv1}`,
      // a positive strength value pulls nodes together. A negative strength value pushes them apart. 0 negates strength
        strength: 0.1
      })
    })

    // Assign each node a link
    errors.forEach((error) =>{
      links.push({
        target: `srv_${error.err_srv_id}`,
        source: `err_${error.err_id}`,
        strength: 0.6
      })
    })

    console.log('post map links array: ', links)
    console.log('post map nodes array: ', nodes)
    

    // define the size of the graph window. To be updated when other components are added
    const width = window.innerWidth * 1;
    const height = window.innerHeight * 1;
    // Default color scheme. To be updated later with a unified scheme
    const color = d3.scaleOrdinal(d3.schemeAccent);
    // define the graph window
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // create the links between nodes
    const linkElements = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', 2)
      .attr('stroke', '#FFFFFF')


    // create node elements
    const nodeElements = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', node => node.level === 'srv' ? 30 : 10)
      .style('fill', node => color(node.level === 'srv' ? node.id : node.level))
      .on('click', (event, node) => {
        console.log('clicked on node ', node.id)

        if (node.level === 'err'){
          const id = node.id.slice(4,node.id.length)
          handleSelect(Number(id))
        } else {
          console.log('error with handleSelect on heatMap')
        }})
      .on('mouseover', function(event, node) {      
        const circle = d3.select(this);
        const currentRadius = Number(circle.attr('r'));
        circle.transition().duration(200).attr('r', currentRadius * 1.5);
      })
      .on('mouseout', function (event, node) {
        const circle = d3.select(this);
        const originalRadius = parseFloat(circle.attr('r'));
        circle.transition().duration(200).attr('r', node => node.level === 'srv' ? 30 : 10)
      });

  // create the text next to each node
      const textElements = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text( node => node.level === 'srv' ? node.name : node.name.charAt(0))
      .attr('font-size', 15)
      .attr('dx', node => node.level === 'srv' ? 19 : -5)
      .attr('dy', node => node.level === 'srv' ? 3.5 : 5)
      .attr('fill', 'white')
      .style('pointer-events', 'none');


  // populate the graph
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
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

    return () => {
      simulation.stop();
    };

  }, [services, serviceLinks])

  return (
    <>
      <div className='background'>
        <svg ref={svgRef}></svg>
        <HeatmapDescription error = {selectedError[0]} />
      </div>

    </>
  )
}

