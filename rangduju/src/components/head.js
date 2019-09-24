import React from 'react';
import { Menu } from 'antd';
import { BrowserRouter  as Router, Route, Link } from 'react-router-dom';

import Home from './home';
import Cooperation from './cooperation';
import About from './about';
import Doubt from './doubt';

// const { SubMenu } = Menu;

class Head extends React.Component {
  state = {
    current: 'home',
  };
  
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  
  cscrollToAnchor = (anchorName) => {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName.key);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
    }
  }

  render() {
    return (
      <Router>
      <div>
      <div className="head">
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home"  className="home">
          <Link to="/"><img src={require("../images/logo.png")} alt="返回首页"></img></Link>
        </Menu.Item>
        <Menu.Item key="faq">
          <Link to="/faq">常见疑惑</Link>
        </Menu.Item>
        <Menu.Item key="cooperation">
          <Link to="/cooperation">如何合作</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">关于我们</Link>
        </Menu.Item>
        <Menu.Item key="landlord" >
          <a href='http://rangduju.mikecrm.com/ULvW6oL' rel="noopener noreferrer" target="_blank">成为房东</a>
        </Menu.Item>
        <Menu.Item key="foot" onClick={this.cscrollToAnchor}>
          联系我们
        </Menu.Item>
      </Menu>
      </div>
      <Route exact path="/" component={Home}></Route>
      <Route path="/faq" component={Doubt}></Route>
      <Route path="/cooperation" component={Cooperation}></Route>
      <Route path="/about" component={About}></Route>
      </div>
      </Router>
    );
  }
}

export default Head;