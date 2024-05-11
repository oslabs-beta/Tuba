import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import HeatmapDescription from '../Components/Heatmap/HeatmapDescription';
import { setSelected } from '../Redux/heatSlice';
import { Colors } from '../Utilities/Colors';
import { msToString } from '../Utilities/timeFunctions';
import DateSelector from '../Components/Heatmap/DateSelector';




export default function HeatMap() {
  // Get error & service data from redux
  const dispatch = useDispatch()
  const services = useSelector((state) => state.errorSlice.services);
  const errorsUnfiltered = useSelector((state) => state.errorSlice.allErrors);
  const serviceLinks = useSelector((state) => state.errorSlice.connections.connections)
  const selected = useSelector((state) => state.heat.selected)
  const selectedError = errorsUnfiltered.filter((error) => error.err_id === selected)
  const { start, end } = useSelector(state => state.heat)

  const msStart = new Date(start).getTime()
  const msEnd = new Date(end).getTime()

  const errors = errorsUnfiltered.filter(error => Number(error.err_time) >= msStart && Number(error.err_time) <= msEnd)

  function handleSelect(id) {
    dispatch(setSelected(id))
  }
  // initialize D3 to paint the DOM
  const svgRef = useRef(null);

  // initialize node & link arrays that will inform the graph <- research better way to do this
  const nodes = [];
  const links = [];
  const srv_name = {}

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();
    // clear node & link arrays for potential legacy data 
    nodes.length = 0;
    links.length = 0;

    // Iterate over service array to create a node.
    services.forEach((service) => {
      srv_name[service.serviceName.srv_id] = {
        name: service.serviceName.srv_name,
        errNum: 0
      }
      nodes.push({
        id: `srv_${service.serviceName.srv_id}`,
        name: service.serviceName.srv_name.replace(/^[^-]+-/, '').charAt(0),
        time: 'srv',
        srv_num: service.serviceName.srv_id,
        level: "srv",
        toolTip: {
          name: service.serviceName.srv_name.replace(/^[^-]+-|(-[^-]+)$/g, ''),
          srvNum: service.serviceName.srv_id
        }
      })
    })
    // Iterate over Errors to create a node
    errors.forEach((error) => {
      srv_name[error.err_srv_id].errNum = srv_name[error.err_srv_id].errNum + 1
      nodes.push({
        id: `err_${error.err_id}`,
        name: error.err_type,
        time: msToString(Number(error.err_time)).date + " " + msToString(Number(error.err_time)).time,
        srv: srv_name[error.err_srv_id].name,
        level: 'err',
      })
    })
    // Map over the connections to create the links.
    serviceLinks.forEach((connections) => {
      links.push({
        target: `srv_${connections.con_srv2}`,
        source: `srv_${connections.con_srv1}`,
        // increase strength to pull service nodes closer to each other
        strength: 0.3,
        level: 'srv'
      })
    })
    // Assign each error node a link
    errors.forEach((error) => {
      links.push({
        target: `srv_${error.err_srv_id}`,
        source: `err_${error.err_id}`,
        // increase strength to pull error nodes closer to service node
        strength: 0.9,
        level: 'err'
      })
    })

    console.log('post map links array: ', links)
    console.log('post map nodes array: ', nodes)
    console.log('srv_name: ', srv_name)

    // define the size of the graph window. To be updated when other components are added
    const width = 1100
    const height = 500

    const customColors = Colors()
    const color = d3.scaleOrdinal(customColors)

    // define the graph window
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
    // create a global container element
    const container = svg.append('g')

    // Handle zoom and pan actions on the window
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });
    // Add the zoom behavior to the SVG container
    svg.call(zoom);

    // create the links between nodes
    const linkElements = container.selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', link => link.level === 'srv' ? 2 : 0)
      .attr('stroke', '#FFFFFF')

    // create node elements
    const nodeElements = container.selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', node => node.level === 'srv' ? 30 : 10)
      .style('fill', node => color(node.level === 'srv' ? node.id : node.level))
      // .style('fill', node => node.level === 'err' && '#5bb3b3')
      .style('fill', node => node.level === 'err' && '#FF4646')




      .on('click', (event, node) => {
        console.log('clicked on node ', node.id)

        if (node.level === 'err') {
          const id = node.id.slice(4, node.id.length)
          handleSelect(Number(id))
        } else {
          console.log('error with handleSelect on heatMap')
        }
      })
      .on('mouseover', function (event, node) {
        console.log('node: ', node)
        // expand the node
        const circle = d3.select(this);
        const currentRadius = Number(circle.attr('r'));
        circle.transition().duration(200).attr('r', node => node.level === 'err' ? currentRadius * 1.4 : currentRadius * 1.1);
        circle.style('cursor', 'pointer')
        circle.style('fill', node => node.level === 'err' && 'crimson')

        let tooltipData;

        if (node.level === 'err') {
          tooltipData = [
            { label: 'Time', value: node.time },
            { label: 'Type', value: node.name },
            { label: 'Service', value: node.srv }
          ];
        } else {
          tooltipData = [
            { label: 'Service', value: node.toolTip.name },
            { label: 'Errors', value: srv_name[node.toolTip.srvNum].errNum }
          ]
        }

        tooltip.style('display', 'flex')
          .select('text')
          .html('')
          .selectAll('tspan')
          .data(tooltipData)
          .enter()
          .append('tspan')
          .attr('x', 5)
          .attr('dy', (d, i) => i ? '1.4em' : 0)
          .text(d => `${d.label}: ${d.value}`);
        // fix the tooltip one px off of the pointer
        const [x, y] = d3.pointer(event);
        tooltip.attr("transform", `translate(${x + 1},${y + 1})`);

      })
      .on('mouseout', function (event, node) {
        const circle = d3.select(this);
        const originalRadius = parseFloat(circle.attr('r'));
        circle.transition().duration(200).attr('r', node => node.level === 'srv' ? 30 : 10)
        circle.style('fill', node => node.level === 'err' && '#FF4646')

        tooltip.style('display', 'none')
      });

    // create the text next to each node
    const textElements = container.selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text(node => node.level === 'srv' ? node.name : node.name.charAt(0))
      .attr('font-size', node => node.level === 'srv' ? 25 : 17)
      // .attr('dx', node => node.level === 'srv' ? -7 : -5.7)
      // .attr('dy', node => node.level === 'srv' ? 7 : 6.4)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('dy', node => node.level === 'srv' ? 2 : 1.7)

      .attr('fill', 'white')
      .style('font-family', "'Inter', sans-serif")
      .style('font-weight', node => node.level === 'srv' ? 800 : 700)
      .style('pointer-events', 'none');


    // create the tooltip to be used on hover
    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none')

    // create a rectangle element for the tooltip
    tooltip.append("rect")
      .attr("width", 250)
      .attr("height", 80)
      .attr("fill", "white")
      .style('filter', 'drop-shadow(10px 10px 10px rgb(0, 0, 0, 20%))')



    //styles the text in the pre-defined rectangle element
    tooltip.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .style("font-size", "14px")
      .style("fill", "black")
      .text('');

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

  }, [services, serviceLinks, start, end])

  return (
    <>

      <div className='background heatmap-container'>

        <svg ref={svgRef}></svg>
        <DateSelector />
        <HeatmapDescription error={selectedError[0]} />
      </div>

    </>
  )
}

