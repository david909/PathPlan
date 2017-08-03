import React from 'react';
import passiveSkillTreeData from '../data/skillTree.js';
import image3 from '../media/skill_sprite-active-3-7798fabab8a21829831293c20ac9c414.jpg'; // Tell Webpack this JS file uses this image
import image4 from '../media/skill_sprite-active-3-3e73c4c4534433ecfc340c7287093bd5.png'; // Tell Webpack this JS file uses this image
import image5 from '../media/NotableFrameAllocated.png'; // Tell Webpack this JS file uses this image

export class ImageManager extends React.Component {

  static getImageResource(imageFile)
  {
    const image2 = new Image();
    // image2.src = "static/media/" + imageFile.filename;

    if("skill_sprite-active-3-7798fabab8a21829831293c20ac9c414.jpg".indexOf(imageFile.filename))
    {
      image2.src = image4;
    }
    else if("skill_sprite-active-3-3e73c4c4534433ecfc340c7287093bd5.png".indexOf(imageFile.filename))
    {
      image2.src = image3;
    }

    // console.log("Image2 - " + JSON.stringify(image2));

    return image2;
    // return "skill_sprite-active-3-7798fabab8a21829831293c20ac9c414.jpg";  //TODO give this based on active/inactive
  }

  static getImagePosition(node)
  {
    let type = node.not;
    if(node.not) { type = "notable"; }
    else if(node.ks) { type = "keystone"; }
    else if(node.m) { type = "mastery"; }
    //else { type = "normal"; }

    const active = "true"; // = node.active;
    const image = node.icon;

    let typeAndActive;
    if(type === "mastery")
    {
      typeAndActive = "mastery";
    }
    else if(type == "notable")
    {
      if(active) { typeAndActive = "notableActive"; }
      else { typeAndActive = "notableInActive"; }
    }
    else if(type === "keystone")
    {
      if(active) { typeAndActive = "keystoneActive"; }
      else { typeAndActive = "keystoneInActive"; }
    }
    else {  //Default to normal
      if(active) { typeAndActive = "normalActive"; }
      else { typeAndActive = "normalInActive"; }
    }

    let correctFile;

    passiveSkillTreeData.skillSprites[typeAndActive].forEach((file) =>
    {
      if(file.filename.startsWith("skill_sprite-active-3"))
      {
          correctFile = file;
          return; //Todo can i use a break?
      }
    });

    if(correctFile == undefined)
    {
      console.log("Failed to find resource for file.");
    }

    return correctFile;
  }
}
