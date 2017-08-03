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
      return {x:(coords.x + Math.abs(passiveSkillTreeData.min_x)) * this.scale,
              y:(coords.y + Math.abs(passiveSkillTreeData.min_y)) * this.scale};
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

      if(groupId == undefined)
      {
        console.log("GroupId:" + groupId);
      }

      //Rotate around center of the group X,Y
      const origin = this.scaleToScreen(groups[groupId]);

      //Rotate starting point (x=radius,y=0)
      const point = {"x":0, "y":this.orbitRadii[orbitLevel] * this.scale * -1};

      const prime = {"x":point.x * Math.cos(radians) - point.y * Math.sin(radians),
                     "y":point.y * Math.cos(radians) + point.x * Math.sin(radians) * -1};

      const finalPosition = {"x":prime.x + origin.x, "y":prime.y + origin.y};

      return finalPosition;
    }
}

var aWindow = new Window();
