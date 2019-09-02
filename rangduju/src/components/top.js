import React from 'react';
import { Button } from 'antd';
// import { Input } from 'antd';

// const { Search } = Input;

class Top extends React.Component {
    render() {
        return (
            <div className="top">
                <div className="dis-flex flex-w">
                    <div className="l_top">
                        <p className="title">让渡居 · 专业的短租解决方案</p>
                        <p className="label1">我们可以为您的房子赚取高出传统长租最多<strong>40%</strong>的收益方案</p>
                        <p><a href="https://rangduju-ziyuan-1257675361.cos.ap-beijing.myqcloud.com/%E8%AE%A9%E6%B8%A1%E5%B1%85.mp4" rel="noopener noreferrer" target="_blank" className="play"><Button icon="play-circle">观看视频</Button></a></p>
                    </div>
                    <div className="left"><img src={require("../images/top.gif")} alt="动图"></img></div>
                    <div className="right">
                        <p className="title">让渡居 · 专业的短租解决方案</p>
                        <p className="label1">我们可以为您的房子<br />赚取高出传统长租最多<strong>40%</strong>的收益方案</p>
                        <p><a href="https://rangduju-ziyuan-1257675361.cos.ap-beijing.myqcloud.com/%E8%AE%A9%E6%B8%A1%E5%B1%85.mp4" rel="noopener noreferrer" target="_blank" className="play"><Button icon="play-circle">观看视频</Button></a></p>
                        {/* <p className="label2">我们将提供从头到尾的一揽子服务</p> */}
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
                    <ul className="dis-flex collaborate">
                        <li><a href="https://nuan.io/hello-wechat" rel="noopener noreferrer" target="_blank"><img src={require("../images/nf.png")} className="nf" alt="暖房直租"></img></a></li>
                        <li><a href="http://www.huohetech.com/" rel="noopener noreferrer" target="_blank"><img src={require("../images/he.png")} className="hh" alt="火河智能门锁"></img></a></li>
                        <li><a href="http://www.hkhplus.com/index/platform" rel="noopener noreferrer" target="_blank"><img src={require("../images/as.png")} className="as" alt="艾仕佳科技"></img></a></li>
                        <li><a href="http://www.hoolihome.com/" rel="noopener noreferrer" target="_blank"><img src={require("../images/hl.png")} className="hl" alt="全球房产租售平台"></img></a></li>
                        <li><a href="http://www.delsk.com/" rel="noopener noreferrer" target="_blank"><img src={require("../images/de.png")} className="de" alt="戴尔斯克海外地产"></img></a></li>
                    </ul>
                    <img src={require("../images/组10.png")} alt="合作方" className="pc"></img>
                    <img src={require("../images/hz.png")} alt="合作方" className="move"></img>
                </div>
            </div>
        )
    }
}

export default Top;