import React, { Component } from 'react';
import update from 'immutability-helper';
import {Button, Counter, Building} from './components';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
      buildings: [
        {
            index: 0,
            name: "cursor",
            num: 0,
            basePrice: 15,
            price: 15,
            cps: 0.1
        },
        {
            index: 1,
            name: "grandma",
            num: 0,
            basePrice: 100,
            price: 100,
            cps: 1
        }
      ],
      CPS: 0,
      cookies:0
    }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const nextCookie = this.state.cookies + this.state.CPS;  
    this.setState({
      cookies: nextCookie
    });
  }
  
  increase () {
    const cookiep1 = this.state.cookies+1;
    this.setState({cookies:cookiep1});
  }
  
  buyBuilding(name) {
      
    if (this.state.cookies < name.price) {
        return;
    }
  
    const index = name.index; 
    const newNum = name.num+1;
    const newPrice = Math.ceil(name.basePrice*Math.pow(1.15,newNum));
    const remCookie = this.state.cookies-Math.ceil(name.basePrice*Math.pow(1.15,name.num));
    const newCPS = this.state.CPS+name.cps;
    let newBuild = {};
    
    switch (index) {
      case 0:
        newBuild = update(this.state.buildings, {0: {num: {$set: newNum}, price: {$set: newPrice}}});
        break;
      case 1:
        newBuild = update(this.state.buildings, {1: {num: {$set: newNum}, price: {$set: newPrice}}});
        break;
      default:
        break;
    }
    
    this.setState({
        cookies: remCookie,
        CPS: newCPS,
        buildings: newBuild 
    })
  }
  
  handleTabClick (id) {
    this.setState({active_tab:id})
  }
  
  render() {
    const buyBuilding = this.buyBuilding.bind(this);
    
    return (
      <div >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Counter cookies={Math.floor(this.state.cookies)}/>
            <p>{this.state.CPS.toFixed(1)} cookies per second</p>
          </div>
          <div className="CC">
            <Button onClick={this.increase.bind(this)}/>
            <Building onClick={buyBuilding} name={this.state.buildings[0]} />
            <Building onClick={buyBuilding} name={this.state.buildings[1]} />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
