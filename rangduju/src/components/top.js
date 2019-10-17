import React from 'react';
import { Button } from 'antd';
// import { Input } from 'antd';

// const { Search } = Input;

class Top extends React.Component {
    constructor(props){
        super();
        this.state={
            isShow:false,
        }
        this.clickShow=this.clickShow.bind(this)
        this.clickHidden=this.clickHidden.bind(this)
    }
    clickShow(){
        this.setState({isShow:true});
        let video = document.getElementById('movie');
        video.play(); 
        console.log(this.state);
      }
    clickHidden(){
        this.setState({isShow:false});
        let video = document.getElementById('movie');
        video.pause(); 
        console.log(this.state);
      }

    render() {
        return (
            <div className="top">
                <div className="dis-flex flex-w">
                    <div className="l_top">
                        <p className="title">科技赋能房产，万物实现互联</p>
                        <p className="title1">— 让渡居·专业的短租解决方案</p>
                        <p className="label1">我们可以为您的房子赚取高出传统长租最多<strong>40%</strong>的收益</p>
                        <p className='btn1'><Button icon="play-circle" onClick={this.clickShow}>观看视频</Button></p>
                    </div>
                    <div className="left"><img src={require("../images/top.gif")} alt="动图"></img></div>
                    <div className="right">
                        <p className="title">科技赋能房产，万物实现互联</p>
                        <p className="title1">— 让渡居·专业的短租解决方案</p>
                        <p className="label1">我们可以为您的房子赚取高出传统长租最多<strong>40%</strong>的收益</p>
                        <p><Button icon="play-circle" onClick={this.clickShow}>观看视频</Button></p>
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
                        <li><a href="https://nuan.io/hello-wechat" rel="noopener noreferrer" target="_blank"><img src={require("../images/nf.jpg")} className="nf" alt="暖房直租"></img></a></li>
                        <li><a href="http://www.huohetech.com/" rel="noopener noreferrer" target="_blank"><img src={require("../images/he.png")} className="hh" alt="火河智能"></img></a></li>
                        <li><a href="http://www.hkhplus.com/index/platform" rel="noopener noreferrer" target="_blank"><img src={require("../images/as.jpg")} className="as" alt="艾仕佳科技"></img></a></li>
                        <li><a href="http://www.hoolihome.com/" rel="noopener noreferrer" target="_blank"><img src={require("../images/hl.jpg")} className="hl" alt="全球房产租售平台"></img></a></li>
                        <li><a href="http://www.delsk.com/" rel="noopener noreferrer" target="_blank"><img src={require("../images/de.jpg")} className="de" alt="戴尔斯克海外地产"></img></a></li>
                        <li><a href="https://space.bilibili.com/303517323/" rel="noopener noreferrer" target="_blank"><img src={require("../images/wj.png")} className="wj" alt="租房五金少女"></img></a></li>
                    </ul>
                    <img src={require("../images/组10.jpg")} alt="合作方" className="pc"></img>
                    <img src={require("../images/hz1.jpg")} alt="合作方" className="move"></img>
                </div>
                <div className='video' style={{display:this.state.isShow?"block":"none"}}>
                    <div className='video_close' onClick={this.clickHidden}>X</div>
                    <div className='video_container'>
                    <video id='movie' src="https://rangduju-ziyuan-1257675361.cos.ap-beijing.myqcloud.com/%E4%BA%A7%E5%93%81%E8%A7%86%E9%A2%91.mp4" controls="controls">
                        您的浏览器不支持 video 标签。
                    </video>
                    </div>
                </div>
            </div>
        )
    }
}

export default Top;