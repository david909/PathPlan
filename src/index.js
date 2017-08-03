import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import './index.css';
import { DataView } from './js/dataview.js';
import { Menu } from './js/menu.js';

class Footer extends React.Component {
  render()
  {
    return (
    <div className="footer">Footer</div>
    );
  }
}

class Header extends React.Component
{
    render()
    {
        return (
        <div className="header">Header</div>
        );
    }
}

class PathOfBuilding extends React.Component {
  // constructor() {
  //   this.clickHandler = ::this.clickHandler;
  //   this.state = {
  //     privateVar: null
  //   }
  // }
  // clickHandler() {
  //   this.setState({
  //     privateVar: 'something'
  //   });
  // }
  render() {
    // const {children} = this.props;
    return (
      <div className="PathOfBuilding">
        <Header />
        <div className="main">
          <Menu/>
          <DataView currentView={this.props.currentView} />
        </div>
        <Footer />
      </div>
    );
  }
}

class Routes extends React.Component {
  render()
  {
    return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/tree'>
          <PathOfBuilding currentView="tree" />
        </Route>
        <Route exact path='/skills'>
          <PathOfBuilding currentView="skills" />
        </Route>
        <Route exact path='/items'>
          <PathOfBuilding currentView="items" />
        </Route>
        <Route>
          <PathOfBuilding currentView="tree" />
        </Route>
      </Switch>
    </BrowserRouter>);
  }
}

// ========================================

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
