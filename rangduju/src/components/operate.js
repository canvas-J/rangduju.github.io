import React from 'react';

class Operate extends React.Component {
    render() {
        return (
            <div className="operate">
                <img src={require("../images/zhuangshi.png")} className="decorate" alt="装饰"></img>
                <p className="title">系统化的运营方案</p>
                <div className="dis-flex">
                    <div className="item_img"><img src={require("../images/zhizhujuedinghezhuofangan.png")} alt="合作方案"></img></div>
                    <div className="item">
                        <div className="item_title">
                            <p>自主决定合作方案</p>
                            <p></p>
                        </div>
                        <div className="dis-flex">
                            针对不同的风险偏好的民宿主，我们提供灵活可变的收益分成方式。按基础月租金收益的不同比例决定每月保底金额，对应不同超额利润分成比例。
                            <img src={require("../images/zizhu.png")} alt="自主"></img>
                        </div>
                    </div>
                </div>
                <div className="dis-flex">
                    <div className="item item_right">
                        <div className="item_title">
                            <p>实时掌控最新房态</p>
                            <p></p>
                        </div>
                        <div className="dis-flex">
                            我们全面掌握运营的所有流程，包括配置进度、保洁核验、维修，对于涉及房屋的一切变动，我们都会第一时间通知您。
                            <img src={require("../images/shishi.png")} alt="自主"></img>
                        </div>
                    </div>
                    <div className="item_img"><img src={require("../images/zhangwozuixingfangtai.png")} alt="最新房态"></img></div>
                </div>
                <div className="dis-flex">
                    <div className="item_img"><img src={require("../images/chakanfangwulishishouyi.png")} alt="历史收益"></img></div>
                    <div className="item three">
                        <div className="item_title">
                            <p>查看房屋历史收益</p>
                            <p className="line_color"></p>
                        </div>
                        <div className="dis-flex">
                            您可以从微信小程序端浏览名下房屋的每月收益、空置率等情况，随时查看短租收益水平，直观感受共享经济带来的红利。
                            <img src={require("../images/lishi.png")} alt="自主"></img>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Operate;