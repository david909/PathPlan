import React from 'react';
import passiveSkillTreeData from '../data/skillTree.js';

export class View extends React.Component
{
  constructor()
  {
    super();
    const lengthOfCoordinatesX = passiveSkillTreeData.passiveSkillTreeData.max_x - passiveSkillTreeData.passiveSkillTreeData.min_x;
    this.scaleX = 4000 / lengthOfCoordinatesX;
  }

  static scaleToScreen( val, coordinateType)
  { //TODO move to somewhere and export

    // console.log("Val:" + val + " Type:" + coordinateType);

    if(coordinateType === "x")
    {

      // console.log("lengthOfCoordinatesX:" + lengthOfCoordinatesX);
      // console.log("scaleX:" + scaleX);
      // console.log("ABS minX:" + Math.abs(passiveSkillTreeData.passiveSkillTreeData.min_x));
      // console.log("VAL + Abs(MinX):" + (val + Math.abs(passiveSkillTreeData.passiveSkillTreeData.min_x)));
      // console.log("Result:" + (val + Math.abs(passiveSkillTreeData.passiveSkillTreeData.min_x)) * scaleX);

      return (val + Math.abs(passiveSkillTreeData.passiveSkillTreeData.min_x)) * this.scaleX;  //Shift everything to 0, then shrink by scale
    }
    else if (coordinateType === "y") {

      return (val + Math.abs(passiveSkillTreeData.passiveSkillTreeData.min_y)) * this.scaleX; //Shift to 0, then scale
    }
    else if(coordinateType = "radius")
    {
        return val * this.scaleX;
    }
    return -1;
  }
}
