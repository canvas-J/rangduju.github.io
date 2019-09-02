import React from 'react';
import Scrollbars from 'react-custom-scrollbars';


class InfiniteListExample extends React.Component {
  renderThumb({ style, ...props }) {//设置滚动条的样式
    const thumbStyle = {
        width: '8px',
        backgroundColor: '#000000',
        opacity: '0.2',
        borderRadius: '6px',
        right: '4px',
    };
    return (
        <div
        style={{ ...style, ...thumbStyle }}
        {...props}/>
    );
}
render() {
    return (
      // <div>
      // <img src={require('../images/zhezhao.png')}></img> 
      <Scrollbars 
            style={{ height: 234}}//这里给个足够高的高度就好
            renderThumbVertical={this.renderThumb}//传入函数，设置滚动条样式
            // autoHide
            >
            <ul className="infiniteListExample">
              <li>
                <div>
                  <p className="title">
                    <img src={require("../images/yonghu1.png")} alt="头像"></img>启蒙
                  </p>
                  <p className="text">
                  房子非常干净漂亮~有梳妆台饭桌等等,虽然离地铁站不算太近,但是去故宫天坛颐和园这种常规景点一个小时之类就可以到｡地铁站旁边有购物商场麦当劳和必胜客,情侣闺蜜的最佳选择!楼下有水网便利店火锅店,买东西也很方便!之前因为有事更改了日期,房东立刻就和我沟通更改了预定日期,房东非常耐心好沟通呀!电视可以选电影看非常nice和男朋友度过了非常开心的六天!
                  </p>
                  <p className="time">
                    2019年7月
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <p className="title">
                    <img src={require("../images/yonghu2.png")} alt="头像"></img>阔增
                  </p>
                  <p className="text">
                  房子位置和装修都很好，性价比很高，强烈推荐。
                  </p>
                  <p className="time">
                    2019年6月
                  </p>
                </div>
                </li>
              <li>
              <div>
                  <p className="title">
                    <img src={require("../images/yonghu3.png")} alt="头像"></img>Jie
                  </p>
                  <p className="text">
                  location:地理位置极佳,距离枣营地铁站走路4分钟,出行非常方便｡步行15分钟左右到达蓝港,此外离朝阳公园和国贸也很近｡ surroundings:周边配套设施完善,马路对面是京客隆大型超市､小型菜市场和水果店,楼下两家24小时便利店,也有理发店､打印店,楼下一番街和马路对面的日料店都值得一吃,赶时间也有麦当劳和煎饼果子｡附近就有麦子店派出所,非常安全｡ inside:所见即所得,房间内部整体舒适度很高,房间朝南,从早到晚一直有阳光｡空气净化器对咽炎患者非常友善,打开之后在出风口滴一滴香水房间会变香香的~ 值得一提的还有床垫,超级舒服｡大家共享两个卫生间,热水稳定,配有全自动洗衣机｡ neighbors:邻居都是年轻人,日常不会打扰到对方生活,晚上睡觉时间不会吵闹比较安静｡ 此外房东人也很好,中间多次沟通都及时回复,超级nice｡
                  </p>
                  <p className="time">
                    2019年6月
                  </p>
                </div>
              </li>
             
            </ul>
        </Scrollbars>
        // </div>
    );
}
}

export default InfiniteListExample;