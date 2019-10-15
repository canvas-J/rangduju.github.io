import React from 'react';
import { Radio } from 'antd';
// import  {get, post} from 'src/service/api';
// import req from 'src/service/fetch'

import { Card } from 'antd';
// import  'whatwg-fetch'
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
  async componentWillMount() {
    //主题的设置要在willmounted中设置
    // echarts.registerTheme('Imooc',echartTheme);
    await this.getdata();
    await this.sum();
  }
  constructor() {
    super();
    this.state = {
      value: 0,
      name: '人次',
      data:[]
    };
  }

  getdata =async () => {
    let peopleArr=[];
    let monthArr=[];
    const init = {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'wechat-key': '8538e210-9a14-4522-b170-3c406f4d8e66'
      }
    }
    for(let i=6;i<13;i++){
    await fetch(
      'https://api.rangduju.com/wechat/rent-info?year=2019&month='+i, init
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let people=data.data.peopleSum;
        let day=data.data.monthSum;
        monthArr.push(day)
        peopleArr.push(people);
      })
      .catch(e => console.log('错误:', e))
    }
    this.setState({
      oneArr:peopleArr,
      twoArr:monthArr,
      data:peopleArr
    })
  }
  sum = () => {
    let sum=0;
    let arr=this.state.oneArr;
    for(let i in arr){
      sum += arr[i];
    }
    this.setState({
      sum:sum
    })
  }

  getOption = () => {
    let option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        boundaryGap: false,
        data: ['2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: this.state.name,
          type: 'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data: this.state.data,
          smooth: true,
          itemStyle : { 
            normal : { 
            color:'#00C979', //改变折线点的颜色
            lineStyle:{ 
            color:'#076EDF' //改变折线颜色
            } 
            } 
            },
        }
      ]
    }
    return option
  }
  onChange = e => {
    let arr,str;
    console.log('radio checked', e.target.value);
    if(e.target.value===0){arr=this.state.oneArr;str='人次'}else{arr=this.state.twoArr;str='夜次'}
    this.setState({
      value: e.target.value,
      data:arr,
      name:str
    });
  };

  render() {
    return (
      <div className="dataAnalysis distance text-center">
        <div><p className="title">持续增长的短租需求</p></div>
        <div>2019年至今，共有{this.state.sum}名房客使用过我们的服务，这个数字将在2022年增长至1,180,800</div>
        <div>
          <Radio.Group buttonStyle="solid" onChange={this.onChange} value={this.state.value}>
            <Radio.Button value={0}>服务的人次</Radio.Button>
            <Radio.Button value={1}>服务的夜次</Radio.Button>
          </Radio.Group>

        </div>
        <div>
          <Card>
            <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '400px' }} />
          </Card>
        </div>

        {/* <div className="last">
          <img src={require(this.state.value === 0 ? '../images/renchi.png' : '../images/yeshu.png')} alt="数据分析"></img>
        </div> */}
      </div>
    )
  }
}

export default DataAnalysis;
