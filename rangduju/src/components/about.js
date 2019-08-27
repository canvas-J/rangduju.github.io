import React from "react";

class About extends React.Component{
    render(){
        return (
            <div className="about">
                <div className="distance">
                    <span className="title">让渡居是一家数字科技驱动的城市民宿管理服务机构</span>
                    <p className="synopsis">我们致力于提供专业的城市民宿管理方案，在营造安全、快捷、舒心、可靠的居住体验的同时，为客户创造长期领先于市场表现的经济回报。让渡居珍视每一位合作伙伴，并将共同努力，携手营造一流的新型城市民宿。<a href="https://mp.weixin.qq.com/s/n2C2IPwmw1zpEMuDDIUD3A" rel="noopener noreferrer" target="_blank">了解更多>></a></p>
                </div>
                <div className="exhibition dis-flex">
                    <div className="group1">
                        <div><img src={require("../images/tu1.png")} alt="图1"></img></div>
                        <div><img src={require("../images/tu3.png")} alt="图2"></img></div>
                        <div><img src={require("../images/tu5.png")} alt="图3"></img></div>
                    </div>
                    <div className="group2">
                        <div className="dis-flex">
                            <div><img src={require("../images/tu2.png")} alt="图4"></img></div>
                            <div>
                                <div><img src={require("../images/tu7.png")} alt="图5"></img></div>
                                <div><img src={require("../images/tu6.png")} alt="图6"></img></div>
                            </div>
                        </div>
                        <div><img src={require("../images/tu8.png")} alt="图7"></img></div>
                    </div>
                    <div className="group3">
                        <div><img src={require("../images/tu4.png")} alt="图8"></img></div>
                        <div><img src={require("../images/tu10.png")} alt="图9"></img></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default About;