import React from 'react';
import { List, Card } from 'antd';

const data = [
    {
        img:'https://user-images.githubusercontent.com/45256071/63991783-a25bee00-cb1b-11e9-91ab-6658d7d5d794.png',
        title: '入住效率',
        content: '活跃的共享经济正在吸引更多的人参与，通过提供更加智能的管理服务，可以接待更多房客，最大程度降低房屋资源的空置。'
    },
    {
        img:'https://user-images.githubusercontent.com/45256071/63991762-94a66880-cb1b-11e9-9080-5bb4d00aa6d3.png',
        title: '收益回报',
        content: '作为房产所有者，你有机会享受到远超过市场平均回报的收益。根据我们现有房屋组合的经营历史，月均收益超过长租市场25-37%。'
    },
    {
        img:'https://user-images.githubusercontent.com/45256071/63991671-4d1fdc80-cb1b-11e9-918c-bdb09498dd9c.png',
        title: '实时通知',
        content: '我国民宿市场处于成长期，通过与专业机构合作，您不但可以实时掌控变化，还能有效应对市场波动，及时变更管理方案。'
    }
];

class Opportunity extends React.Component {
    render() {
        return (
            <div className='opportunity distance'>
                <p>成长期的市场机遇</p>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <div className="image"><img src={item.img} alt='市场机遇'></img></div>
                            <Card title={item.title}>{item.content}</Card>
                        </List.Item>
                    )}
                />,
            </div>
        )
    }
}


export default Opportunity;




