import React from 'react';
import {Tree} from './graph/Tree.js';

class Skills extends React.Component {
  render()
  {
    return (
      <div className="skills">
        <div className="left">
        Skills: <a href="new">New</a><a href="Delete">Delete</a>
        <select multiple>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
        </div>
        <div className="right">
          <input type="checkbox" name="vehicle" value="Bike" />Active?<br />
          Gem   Level     Quantity<br />
          <input type="gem" name="gem" /><input type="level" name="level" /><input type="qty" name="quantity" /><br />
          <input type="text" name="gem" /><input type="text" name="level" /><input type="text" name="quantity" /><br />
          <input type="text" name="gem" /><input type="text" name="level" /><input type="text" name="quantity" /><br />
          <input type="text" name="gem" /><input type="text" name="level" /><input type="text" name="quantity" /><br />
        </div>
      </div>);
  }
}

class Items extends React.Component {
  render()
  {
    return (
      <div className="items">
        <div className="left">
      Left Hand:
        <select>
          <option value="" disabled="disabled" selected="selected">Please select a name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        Right Hand:
        <select>
          <option value="" disabled="disabled" selected="selected">Please select a name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        Body Armor:
        <select>
          <option value="" disabled="disabled" selected="selected">Please select a name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        </div>
        <div className="middle">
        Items available then below this, item search
        </div>
        <div className="right">
        Adjust item before setting it as available
        </div>
      </div>
  );
  }
}


export class DataView extends React.Component {

  render()
  {
    if     (this.props.currentView === "tree")  { return (<div className="dataView"><Tree /></div>);   }
    else if(this.props.currentView === "skills"){ return (<div className="dataView"><Skills /></div>); }
    else if(this.props.currentView === "items") { return (<div className="dataView"><Items /></div>);  }
  }
}
