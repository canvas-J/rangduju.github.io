import React from 'react';

class Foot extends React.Component {
    render() {
        return (
            <div className="foot">
                <div>
                    <label className="label_frist">联系我们</label>
                    <label>北京市朝阳区建国路88号</label>
                    <label>SOHO现代城B座，100025</label>
                    <label>办公电话：010-85890977</label>
                    <label>电子邮箱：pr@rangduju.com</label>
                </div>
                <div className="nudge">
                    <label className="label_frist">加入我们</label>
                    <label>
                        <a href="https://www.lagou.com/gongsi/580231.html" rel="noopener noreferrer" target="_blank">
                        拉勾
                        </a>
                        </label>
                    <label>
                    <a href="https://www.ciweishixi.com/company/detail-28377.html" rel="noopener noreferrer" target="_blank">
                        刺猬实习
                        </a>
                        </label>
                </div>
                <div className="text-center">
                    <label className="label_frist">微信公众号</label>
                    <img src={require("../images/2wm.png")} className="qrcode" alt="公众号"></img>
                </div>
            </div>
        );
    }
}

export default Foot;