import React from 'react';
import { Radio } from 'antd';
import {Card} from 'antd';

import  'whatwg-fetch';
// import echarts from 'echarts' ;
// import echartTheme from './../themeLight'
// import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

class DataAnalysis extends React.Component {
    // componentWillMount(){
    //     //主题的设置要在willmounted中设置
    //     echarts.registerTheme('Imooc',echartTheme);
    //   }
    constructor(){
        super();
        this.state = {
            value: 0,
          };
    }
    getOption =()=> {
        let option = {
          tooltip:{
            trigger:'axis',
          },
          xAxis:{
            data:['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis:{
            type:'value'
          },
          series:[
            {
              name:'OFO订单量',
              type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
              data:[1000,2000,1500,3000,2000,1200,800],
              smooth: true
            }
          ]
        }
       return option
      }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };

    render() {
        return (
            <div className="dataAnalysis distance text-center">
                <div><p className="title">持续增长的短租需求</p></div>
                <div>2019年至今，共有158名房客使用过我们的服务，这个数字将在2022年增长至1,180,800</div>
                <div>
                    <Radio.Group buttonStyle="solid" onChange={this.onChange} value={this.state.value}>
                        <Radio.Button value={0}>服务的人次</Radio.Button>
                        <Radio.Button value={1}>服务的夜次</Radio.Button>
                    </Radio.Group>
                  
                </div>
                {/* <div>
        <Card title="折线图表之一">
            <ReactEcharts option={this.getOption()} theme="Imooc"  style={{height:'400px'}}/>
        </Card>

      </div> */}
                <div className="last">
                    <img src={require(this.state.value === 0?'../images/renchi.png':'../images/yeshu.png')} alt="数据分析"></img>
                </div>
            </div>
        )
    }
}

export default DataAnalysis;