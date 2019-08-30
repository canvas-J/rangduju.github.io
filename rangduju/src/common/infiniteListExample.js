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
                    2019年7月
                  </p>
                </div>
                </li>
              <li>
              <div>
                  <p className="title">
                    <img src={require("../images/yonghu3.png")} alt="头像"></img>启蒙
                  </p>
                  <p className="text">
                  房子非常干净漂亮~有梳妆台饭桌等等,虽然离地铁站不算太近,但是去故宫天坛颐和园这种常规景点一个小时之类就可以到｡地铁站旁边有购物商场麦当劳和必胜客,情侣闺蜜的最佳选择!楼下有水网便利店火锅店,买东西也很方便!之前因为有事更改了日期,房东立刻就和我沟通更改了预定日期,房东非常耐心好沟通呀!电视可以选电影看非常nice和男朋友度过了非常开心的六天!
                  </p>
                  <p className="time">
                    2019年7月
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