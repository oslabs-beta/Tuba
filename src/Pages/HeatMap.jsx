import React, { useEffect, useRef } from 'react';
import Nav from '../Components/Nav';
import * as d3 from 'd3'


export default /*async*/ function HeatMap() {

    const nodes = [ 
      { id: "mammal", group: "mamm", label: "Mammals", level: "top" },
      { id: "dog"   , group: "mamm", label: "Dogs"   , level: "Individual" },
      { id: "cat"   , group: "mamm", label: "Cats"   , level: "Individual" },
      { id: "fox"   , group: "mamm", label: "Foxes"  , level: "Individual" }, 
      { id: "elk"   , group: "mamm", label: "Elk"    , level: "Individual" },
      { id: "insect", group: "inse", label: "Insects", level: "top" },
      { id: "ant"   , group: "inse", label: "Ants"   , level: "Individual" },
      { id: "bee"   , group: "inse", label: "Bees"   , level: "Individual" },  
      { id: "fish"  , group: "fish", label: "Fish"   , level: "top" },
      { id: "carp"  , group: "fish", label: "Carp"   , level: "Individual" },
      { id: "pike"  , group: "fish", label: "Pikes"  , level: "Individual" } 
    ];
  
    const links = [
      { target: "mammal", source: "dog" , strength: 0.4 },
      { target: "mammal", source: "cat" , strength: 0.4 },
      { target: "mammal", source: "fox" , strength: 0.4 },
      { target: "mammal", source: "elk" , strength: 0.4 },
      { target: "insect", source: "ant" , strength: 0.4 },
      { target: "insect", source: "bee" , strength: 0.4 },
      { target: "fish"  , source: "carp", strength: 0.4 },
      { target: "fish"  , source: "pike", strength: 0.4 },

      { target: 'mammal', source: 'fish',   strength: 0.1 },
      { target: 'fish',   source: 'insect', strength: 0.1 },
      { target: 'insect', source: 'mammal', strength: 0.1 }

      // { target: "cat"   , source: "elk" , strength: 0.1 },
      // { target: "carp"  , source: "ant" , strength: 0.1 },
      // { target: "elk"   , source: "bee" , strength: 0.1 },
      // { target: "dog"   , source: "cat" , strength: 0.1 },
      // { target: "fox"   , source: "ant" , strength: 0.1 },
      // { target: "pike"  , source: "dog" , strength: 0.1 }
    ];
  
    const svgRef = useRef(null);
  
    useEffect(() => {
  
// Fetch array of error objects. Not sure if this is coming from state or as a fetch request to server/db
/*
// fetch the error data and populate an array of nodes.
const nodeResponse = await fetch(error_data)

const nodes = nodeResponse.map((element) =>{
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

    return {
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
        }
      level: "err"
      }
  })

// fetch the list of services and populate the links.
const srvResponse = await fetch(services)

// Update the node list with a "srv" group
srvResponse.forEach((element) => {
  const { srv_id, srv_name } = element
  node.push({
    id: srv_id
    group: srv_id
    label: srv_name
    level: "srv"
  })
})

// create a helper function that returns the link object.
const linkFunc = (nodeArr, srvArr) =>{
  const linkArr = []

  // all errors with the same srv_id should link to the srv_id node with a strength of 0.6 or greater.
  for (let i=0; i<nodeArr.length; i++){
    if (nodeArr.id !== nodeArr.group){
      linkArr.push({
        target: nodeArr[i].group,
        source: nodeArr[i].id,
        strength: 0.7
      })
    }
  }
  
  // all srv_id nodes should like with each other with a strength of 0.2 or less
  for (let i=0; i<srvArr.length; i++){
    if (i === srvArr.length-1){
     linkArr.push({
        target: srvArr[i].srv_id,
        source: srvArr[0],srv_id,
        strength: 0.1
      })
    } else {
      linkArr.push({
        target: srvArr[i].srv_id,
        source: srvArr[i+1],srv_id,
        strength: 0.1
      })
    }
  }

  return linkArr
}

const links = linkFunc(node, srvResponse)

*/
      const width = 500;
      const height = 500;

      const color = d3.scaleOrdinal(d3.schemeTableau10);

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const nodeElements = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .on('mouseover', (event, d) => {
            console.log('Hovered over node:', d);
          })
          .on('mouseout', () => {
            console.log('Mouseout');
        })
        // Sets the size and color of each node
        .enter().append('circle')
        .attr('r', 15)
        .style('fill', node => color(node.group))

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
        .text(node => node.label)
        .attr('font-size', 15)
        .attr('dx', 19)
        .attr('dy', 3.5)

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
        <Nav />
        Heat Map goes here!
        <div className='background'>
          <svg ref={svgRef}></svg>
        </div>
      </>
    );
  }
  