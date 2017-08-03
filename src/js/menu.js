import React from 'react';
import { Link } from 'react-router-dom'

export class Menu extends React.Component {
  render()
  {
    return (
    <div className="menu">
      Left Menu
      <div className="navigation">
        <ViewChange value="Tree" />
        <ViewChange value="Skills" />
        <ViewChange value="Items" />
        <ViewChange value="Calc" />
      </div>
      <div className="bandit">TODO dropdown</div>
      <div className="primarySkill">TODO primary skill</div>
    </div>
  );
  }
}

class ViewChange extends React.Component
{
  render()
  {
    // return (<b>hi</b>);
    return (<b><Link to={this.props.value}>{this.props.value}</Link>&nbsp;</b>);
  }
}
