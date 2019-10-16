import React from 'react';

class Foot extends React.Component {
    render() {
        return (
            <div>
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
                <div className="nudge">
                    <label className="label_frist">条款</label>
                    <label>
                        <a href="https://mp.weixin.qq.com/s/YoqpzK5aiqZF8lNLZVchEg" rel="noopener noreferrer" target="_blank">
                        使用条款
                        </a>
                        </label>
                    <label>
                        <a href="https://mp.weixin.qq.com/s/A0yEHZeXwKPzIl8R5PC0sw" rel="noopener noreferrer" target="_blank">
                        隐私保护
                        </a>
                        </label>
                </div>
                <div className="text-center">
                    <label className="label_frist">微信公众号</label>
                    <img src={require("../images/2wm.jpg")} className="qrcode" alt="公众号"></img>
                </div>
            </div>
            <div className='foot_bottom'>
            <p style={{clear:'both'}}>©2019 让渡居科技（上海）有限公司</p>
            <p><a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502038927" >京公网安备 11010502038927号</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://beian.miit.gov.cn" rel="noopener noreferrer" target="_blank">
            沪ICP备19031849号</a></p>
            </div>

            </div>
        );
    }
}

export default Foot;