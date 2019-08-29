import React from 'react';
import { List, Card } from 'antd';

const data = [
    {
        // img: '',
        title: '戴尔斯克海外基地',
    },
    {
        // img: '',
        title: '暖房直租',
    },
    {
        // img: '',
        title: '艾仕佳科技',
    },{
        // img: '',
        title: '全球房产租售平台',
    },
    {
        // img: '',
        title: '火河智能门锁',
    }
];

class Top extends React.Component {
    render() {
        return (
            <div className="top">
                <div></div>
                <div className="bottom">
                    <p>我们与谁合作</p>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                {/* <div><img src={}></img></div> */}
                                <Card title>{item.title}</Card>
                            </List.Item>
                        )}
                    />,
                </div>
            </div>
        )
    }
}

export default Top;