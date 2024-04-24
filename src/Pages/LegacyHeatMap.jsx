import React, { useEffect, useRef } from 'react';
// import Nav from '../Components/Nav';
import * as d3 from 'd3'
import errors from '../Utilities/mockErrors'

export default /*async*/ function HeatMap() {

  const svgRef = useRef(null);

  const nodes = []
  const links = []

  useEffect(() => {

    // Clear existing nodes and links
    nodes.length = 0;
    links.length = 0;

    // fetch the error data
    // const nodeResponse = await fetch(error_data)

    // parse through the error data and create a node for each error/element
    const nodeCreator = (errorData) => {
      errorData.forEach((element) => {
        const { err_id,
          err_srv_id,
          err_job_name,
          err_time,
          err_message,
          err_type,
          err_stack,
          err_file_path,
          err_file,
          err_line_num,
          err_module,
          err_module_function } = element

        nodes.push({
          id: err_id,
          group: err_srv_id,
          label: {
            err_job_name,
            err_type,
            err_message,
            err_module,
            err_file,
            err_module_function,
            err_line_num
          },
          level: "err"
        })
      })
    }
    nodeCreator(errors)

    // fetch the list of services and populate the links.
    // const srvResponse = await fetch(services)

    // mocked data to be replaced
    const srvResponse = [
      {
        'srv_id': 1,
        'srv_name': 'service1'
      },
      {
        'srv_id': 2,
        'srv_name': 'service2'
      },
      {
        'srv_id': 3,
        'srv_name': 'service2'
      }
    ]

    // update the node list/array with an element for each service.
    srvResponse.forEach((element) => {
      const { srv_id, srv_name } = element
      nodes.push({
        id: srv_id,
        group: srv_id,
        label: srv_name,
        level: "srv"
      })
    })

    // populate the link array. Each error should point to its service and all services should be connected
    const linkFunc = (nodeArr, srvArr) => {

      // all errors with the same srv_id should link to the srv_id node with a strength of 0.6 or greater.
      for (let i = 0; i < nodeArr.length; i++) {
        if (nodeArr[i].id !== nodeArr[i].group) {
          links.push({
            target: nodeArr[i].group,
            source: nodeArr[i].id,
            strength: 0.2
          })
        }
      }

      // all srv_id nodes should link with each other with a strength of 0.2 or less
      for (let i = 0; i < srvArr.length; i++) {
        if (i === srvArr.length - 1) {
          links.push({
            target: srvArr[i].srv_id,
            source: srvArr[i].srv_id,
            strength: 0.9
          })
        } else {
          links.push({
            target: srvArr[i].srv_id,
            source: srvArr[i + 1].srv_id,
            strength: 0.1
          })
        }
      }

    }

    linkFunc(nodes, srvResponse)

    // const width = 500;
    // const height = 500;
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.5;

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);


    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background-color', 'white')
      .style('border', '1px solid black')
      .style('padding', '5px')
      .style('display', 'none');

    const nodeElements = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 15)
      .style('fill', node => color(node.group))
      .on('mouseover', (event, d) => {

        console.log('Hovered over node:', d);

        // Display tooltip with node data
        tooltip.html(`<strong>Node Data:</strong><br>ID: ${d.id}<br>Group: ${d.group}<br>Level: ${d.level}`)
          .style('display', 'block')
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`);

        // Make node slightly larger
        d3.select(event.currentTarget)
          .attr('r', 20)
          .style('stroke-width', 2)
          .style('stroke', 'black');
      })
      .on('mouseout', (event) => {
        // Hide tooltip
        tooltip.style('display', 'none');

        // Restore node to previous size
        d3.select(event.currentTarget)
          .attr('r', 15)
          .style('stroke-width', null)
          .style('stroke', null);
      });



    // adds text to each node. Doesn't work
    // .enter().append('text')
    // .text(d => d.label.charAt(0)) // Displaying the first letter of the label
    // .attr('font-size', 10) // Set font size as needed
    // .attr('text-anchor', 'middle') // Center the text horizontally
    // .attr('dy', 3); // Adjust vertical position if necessary



    const textElements = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      // if there is no err_type then it is a service, an the service name should be displayed
      .text(node => node.label.err_type ? node.label.err_type : node.label)
      .attr('font-size', 15)
      .attr('dx', 19)
      .attr('dy', 3.5)
      .attr('fill', 'white')

    const linkElements = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#D3D3D3')

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-160))
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
  }, [nodes, links]);

  return (
    <>
      { /* <Nav /> */}
      <div className='background'>
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}