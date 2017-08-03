import React from 'react';
import passiveSkillTreeData from '../../data/skillTree.js';

export class Window {

  constructor(canvasWidth,dataWidth,skillsPerOrbit,orbitRadii)
  {
    this.offset = {};
    this.offset.x = 0;
    this.offset.y = 0;
    this.width = 0;
    this.height = 0;
    this.skillsPerOrbit = skillsPerOrbit;
    this.orbitRadii = orbitRadii;

    this.scale = canvasWidth / dataWidth;
  }

  scaleToScreen( coords )
  { //TODO move to somewhere and export

      //Shift to 0, then scale
      return {x:(coords.x + Math.abs(passiveSkillTreeData.min_x)) * this.scaleX,
              y:(coords.y + Math.abs(passiveSkillTreeData.min_y)) * this.scaleX};
  }

  getNodePosition(node)
  {
    const orbitLevel = node.o;
    const orbitIndex = node.oidx;
    const groupId = node.g;

    var groups = passiveSkillTreeData.groups;
                            //2       *  6 / 360 = 120 degree angle
    const angleOfRotation = (orbitIndex / this.skillsPerOrbit[orbitLevel]) * 360;
    const radians = angleOfRotation * (Math.PI / 180);

    //Rotate around center of the group X,Y
    const xOrigin = this.scaleToScreen(groups[groupId].x,"x");
    const yOrigin = this.scaleToScreen(groups[groupId].y,"y");

    //Rotate starting point (x=radius,y=0)
    const xPoint = 0;
    const yPoint = this.orbitRadii[orbitLevel] * this.scale * -1;

    const xPrime = xPoint * Math.cos(radians) - yPoint * Math.sin(radians);
    const yPrime = yPoint * Math.cos(radians) + xPoint * Math.sin(radians) * -1; //Inverse coordinate plane

    const xFinalPosition = xPrime + xOrigin;
    const yFinalPosition = yPrime + yOrigin;

    return {"x":xFinalPosition,"y":yFinalPosition};
  }
}

var aWindow = new Window();
