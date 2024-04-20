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
  const srv_name = {}

  useEffect(() => {
    // clear node & link arrays for potential legacy data 

    nodes.length = 0;
    links.length = 0;

    // Iterate over service array to create a node.
    services.forEach((service) => {
      srv_name[service.serviceName.srv_id] = service.serviceName.srv_name
      nodes.push({
        id: `srv_${service.serviceName.srv_id}`,
        name: service.serviceName.srv_name.replace(/^[^-]+-|(-[^-]+)$/g, ''),
        time: 'srv',
        srv_num: service.serviceName.srv_id,
        level: "srv"
      })
    })
    // Iterate over Errors to create a node
    errors.forEach((error) => {
      nodes.push({
        id: `err_${error.err_id}`,
        name: error.err_type,
        time: error.err_time,
        srv: srv_name[error.err_srv_id],
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

    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.6;
    // Default color scheme. To be updated later with a unified scheme
    //const color = d3.scaleOrdinal(d3.schemeAccent);
    
    const customColors = ['#2BE2FF', '#00FF66', '#00FFFF', '#FF0099', '#33b3a6', '#CC00FF']
    const color = d3.scaleOrdinal(customColors)
    
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
      .selectAll('ellipse')
      .data(nodes)
      .enter().append('ellipse')
      .attr('cx', node => node.x)
      .attr('cy', node => node.y)
      .attr('rx', node => node.level === 'srv' ? node.name.length * 10 : 10)
      .attr('ry', node => node.level === 'srv' ? 20 : 10)
      // .selectAll('circle')
      // .data(nodes)
      // .enter().append('circle')
      // .attr('r', node => node.level === 'srv' ? 30 : 10)
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
        console.log('node: ',node)
        // expand the node
        // const circle = d3.select(this);
        // const currentRadius = Number(circle.attr('r'));
        // circle.transition().duration(200).attr('r', currentRadius * 1.5);
        const ellipse = d3.select(this)
        const currentRx = Number(ellipse.attr('rx'))
        const currentRy = Number(ellipse.attr('ry'))
        if (node.level === 'srv'){
          ellipse.transition().duration(200).attr('ry', currentRy * 1.5)
        } else {
          ellipse.transition().duration(200).attr('ry', currentRy * 1.5).attr('rx', currentRx * 1.5)
        }

        // create the tooltip
        tooltip.style('display', 'block')
        //tooltip.select('text').text(`ID: ${node.id} \nType: ${node.name} \nTime: ${node.time} \nService: ${node.srv}`)
        // create individual lines for each item on the tooltip. Fix later, this is not DRY
        tooltip.select('text')
          .html(null)
          .append('tspan')
          .attr('x', 0)
          .text(`ID: ${node.id}`);
        tooltip.select('text')
          .append('tspan')
          .attr('x', 0)
          .attr('dy', '1.2em')
          .text(`Type: ${node.name}`);
        tooltip.select('text')
          .append('tspan')
          .attr('x', 0)
          .attr('dy', '1.2em')
          .text(`Time: ${node.time}`);
        tooltip.select('text')
          .append('tspan')
          .attr('x', 0)
          .attr('dy', '1.2em')
          .text(`Service: ${node.srv}`);

        // fix the tooltip to the mouse pointer
        const [x, y] = d3.pointer(event);
        tooltip.attr("transform", `translate(${x + 1},${y + 1})`);
      })
      .on('mouseout', function (event, node) {
        // const circle = d3.select(this);
        // const originalRadius = parseFloat(circle.attr('r'));
        // circle.transition().duration(200).attr('r', node => node.level === 'srv' ? 30 : 10)

        const ellipse = d3.select(this)
        if (node.level === 'srv'){
          ellipse.transition().duration(200).attr('ry', 20)
        } else {
          ellipse.transition().duration(200).attr('ry', 10).attr('rx', 10)
        }
        tooltip.style('display', 'none')
      });

  // create the text next to each node
      const textElements = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text( node => node.level === 'srv' ? node.name : node.name.charAt(0))
      .attr('font-size', node => node.level === 'srv' ? 25 : 17)
      .attr('dx', node => node.level === 'srv' ? node.name.length * -8 : -5)
      .attr('dy', node => node.level === 'srv' ? 7 : 7)
      .attr('fill', 'white')
      .style('stroke', 'black')
      .style('stroke-width', 0.65)
      .style('font-weight', node => node.level === 'srv' ? 'bold' : 'bold')
      .style('pointer-events', 'none');

    // create the tooltip to be used on hover
    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');
    // create a rectangle element for the tooltip
    tooltip.append("rect")
      .attr("width", 150)
      .attr("height", 80)
      .attr("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 1);

    const tooltipText = tooltip.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .style('font-size', '12px')
      .style('fill', 'black')
    //styles the text in the pre-defined rectangle element
    tooltip.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .style("font-size", "12px")
      .style("fill", "black")
      .text('');

  // populate the graph
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 4))
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
      <div className='background heatmap-container'>
        <svg ref={svgRef}></svg>
        <HeatmapDescription error = {selectedError[0]} />
      </div>

    </>
  )
}

