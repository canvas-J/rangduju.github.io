import React from 'react';
import { Menu} from 'antd';



// const { SubMenu } = Menu;

class Head extends React.Component {
  state = {
    current: 'doubt',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="head distance">
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home" className="home">
          <img src={require("../images/logo.png")} alt="返回首页"></img>
        </Menu.Item>
        <Menu.Item key="doubt">
          常见疑惑
        </Menu.Item>
        <Menu.Item key="cooperation">
          如何合作
        </Menu.Item>
        <Menu.Item key="about">
          关于我们
        </Menu.Item>
        <Menu.Item key="contact">
          联系我们
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default Head;