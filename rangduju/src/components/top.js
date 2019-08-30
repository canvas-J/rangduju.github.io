import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

class Top extends React.Component {
    render() {
        return (
            <div className="top">
                <div className="dis-flex">
                    <div className="left"><img src={require("../images/top.gif")} alt="动图"></img></div>
                    <div className="right">
                        <p className="title">专业的短租解决方案</p>
                        <p className="label1">我们可以为您的房子赚取高出传统长租最多<strong>40%</strong>的收益方案</p>
                        <p className="label2">我们将提供从头到尾的一揽子服务</p>
                        {/* <Search
                            placeholder="搜索"
                            enterButton="搜索"
                            size="large"
                            onSearch={value => console.log(value)}
                        /> */}
                        {/* <p className="label3">看看你错过了多少租金收益</p> */}
                    </div>
                </div>
                <div className="bottom">
                    <img src={require("../images/组10.png")} alt="合作方"></img>
                </div>
            </div>
        )
    }
}

export default Top;