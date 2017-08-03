import React from 'react';
import passiveSkillTreeData from '../../data/skillTree.js';

export class buildTree extends React.Component {

    /*
    {
      "nodeId": {
        "x": 1,
        "y": 2,
        "out": {
          "123": {
            "distance": 0
          },
          "234": {
            "distance": 0
          }
        }
      }
    }
    */


  static initialize()
  {
    let nodes = {};
    //Build initial structure of NodeId -> Array of connected nodes by ID
    passiveSkillTreeData["nodes"].forEach((node) =>
    { //TODO copy entire node over instead of rebuilding it
      nodes[node["id"]] = { "x": 0, "y": 0, "out": {}, "g":node.g, "oidx":node.oidx,"o":node.o,"dn":node.dn,"icon":node.icon,"not":node.not,"ks":node.ks,"m":node.m };  //TODO set X/Y based on current screen

      node.out.forEach((outNode) =>
      {
        nodes[node["id"]].out[outNode] = {distance: -1};
      });
    });

    //Loops through and map any that aren't already connected
    passiveSkillTreeData["nodes"].forEach((node) =>
    {
      //For all of the outgoing nodes in this node.  Link those out nodes to this node.
      node.out.forEach((outNodeId) =>
      {
          nodes[outNodeId].out[node.id] = {distance: -1};
      });
    });

    return nodes;
  }
}

buildTree.nodes = buildTree.initialize();
