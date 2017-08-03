import React from 'react';
import passiveSkillTreeData from '../../data/skillTree.js';

export class Node extends React.Component {

  static initialize()
  {
    let nodes = {};
    //Build initial structure of NodeId -> Array of connected nodes by ID
    passiveSkillTreeData["nodes"].forEach((node) =>
    { //TODO copy entire node over instead of rebuilding it
      const newNode = new Node();

      newNode.x = 0;  //TODO set X/Y based on current screen
      newNode.y = 0;
      newNode.out = {};
      newNode.g = node.g;
      newNode.oidx = node.oidx;
      newNode.o = node.o;
      newNode.dn = node.dn;
      newNode.icon = node.icon;
      newNode.not = node.not;
      newNode.ks = node.ks;
      newNode.m = node.m;

      node.out.forEach((outNode) =>
      {
        newNode.out[outNode] = {distance: -1};
      });

      nodes[node["id"]] = newNode;  //Copy to tree by nodeId
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

Node.nodes = Node.initialize();
