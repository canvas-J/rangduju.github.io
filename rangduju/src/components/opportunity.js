import React from 'react';
import { List, Card } from 'antd';

class Opportunity extends React.Component{
    render(){
        return (
            <div>
                <p>成长期的市场机遇</p>
                <div id='list'></div>
            </div>
        )
    }
}
const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
ReactDOM.render(
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
          <Card title={item.title}>Card content</Card>
        </List.Item>
      )}
    />,
    document.getElementById('list')
  );

export default Opportunity;




