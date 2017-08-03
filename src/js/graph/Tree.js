import React from 'react';
import passiveSkillTreeData from '../../data/skillTree.js';
import {Node} from './Node.js';
import {ImageManager} from '../ImageManager.js';
import {Window} from './Window.js';

export class Tree extends React.Component {

  static canvasWidth() { return 4000 };
  static canvasHeight() { return 4000 };
  static dataWidth  = passiveSkillTreeData.max_x - passiveSkillTreeData.min_x;
  static dataHeight = passiveSkillTreeData.max_y - passiveSkillTreeData.min_y;

  render()
  {
    return (
        <canvas ref="canvas" width={Tree.canvasWidth} height={Tree.canvasHeight}/>
    );
  }

  constructor()
  {
    super();
    this.orbitRadii = [0, 82, 162, 335, 493];
    this.skillsPerOrbit = [1, 6, 12, 12, 40];

    this.window = new Window(Tree.canvasWidth, Tree.dataWidth, this.skillsPerOrbit, this.orbitRadii);

    // this.lengthOfCoordinatesY = passiveSkillTreeData.max_y - passiveSkillTreeData.min_y;
    this.scaleX = Tree.canvasWidth / Tree.dataWidth;
  }

  componentDidMount() {

      this.updateCanvas();  //TODO build tree?
  }

  updateCanvas() {

      const ctx = this.refs.canvas.getContext('2d');
      ctx.moveTo(100,100);
      ctx.font = "14px Arial";
      ctx.fillStyle = 'grey';

      var groups = passiveSkillTreeData.groups;
      var oldStyleNodes = passiveSkillTreeData.nodes;

      //Object.keys(groups).  //Get the keys of a hashmap to an array

      Object.keys(groups).forEach( (key) =>
      {
        // if(key === "106")
        // {

          // ctx.beginPath();
          // ctx.arc(this.scaleToScreen(groups[key]["x"],"x"), this.scaleToScreen(groups[key]["y"],"y"), 162*this.scaleX, 0, 2 * Math.PI, false);
          // // context.fillStyle = 'green';
          // // context.fill();
          // ctx.lineWidth = 5;
          // ctx.strokeStyle = '#003300';
          // ctx.stroke();

        const location = this.window.scaleToScreen(groups[key]);

        var index = 0;
        ctx.fillText("G:" + key,location.x-20,location.y+10);
        index++;

        // console.log("Printing group at: (" + self.scaleToScreen(groups[key]["x"],"x") + "," + self.scaleToScreen(groups[key]["y"],"y") + ")");

        // for (let node of groups[key]["n"]) {
        //   ctx.fillText("N:" + node,
        //   self.scaleToScreen(groups[key]["x"],"x"),
        //   self.scaleToScreen(groups[key]["y"],"y")+index*13);
        //   index++;
        // }
      // }
      });

      Object.keys(Node.nodes).forEach((key) =>
      {
        var node = Node.nodes[key];
        var point = this.window.getNodePosition(node);



        const imageFile = ImageManager.getImagePosition(node);
        const image = ImageManager.getImageResource(imageFile);
        const imagePosition = imageFile.coords[node.icon];

        if (image.complete) {
            console.log("complete DRAWING: " + image.src);
            ctx.drawImage(image, imagePosition.x, imagePosition.y, imagePosition.w, imagePosition.h, point.x, point.y, imagePosition.w, imagePosition.h);
        } else {
            image.onload = function () {
              console.log("onLoad DRAWING: " + image.src);
              ctx.drawImage(image, imagePosition.x, imagePosition.y, imagePosition.w, imagePosition.h, point.x-imagePosition.h/2, point.y-imagePosition.w/2, imagePosition.w, imagePosition.h);
            };
        }



        //Draw connecting lines
        Object.keys(node.out).forEach((outKey) =>
        {
          const outNode = Node.nodes[outKey];
          var outNodePoint = this.window.getNodePosition(outNode);

          ctx.beginPath();
          ctx.moveTo(point.x,point.y);
          ctx.lineTo(outNodePoint.x,outNodePoint.y);
          ctx.strokeStyle = 'grey';
          ctx.stroke();
        });

        //Draw description text
        ctx.fillText("./ (" + node.dn + ")",point.x,point.y);

      });



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
    const xOrigin = this.scaleToScreen(groups[groupId].x,"x");
    const yOrigin = this.scaleToScreen(groups[groupId].y,"y");

    //Rotate starting point (x=radius,y=0)
    const xPoint = 0;
    const yPoint = this.orbitRadii[orbitLevel] * this.scaleX * -1;

    const xPrime = xPoint * Math.cos(radians) - yPoint * Math.sin(radians);
    const yPrime = yPoint * Math.cos(radians) + xPoint * Math.sin(radians) * -1; //Inverse coordinate plane

    const xFinalPosition = xPrime + xOrigin;
    const yFinalPosition = yPrime + yOrigin;

    return {"x":xFinalPosition,"y":yFinalPosition};
  }
}
