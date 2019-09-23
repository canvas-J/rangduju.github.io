import React from 'react';
import { Radio } from 'antd';

class DataAnalysis extends React.Component {
    constructor(){
        super();
        this.state = {
            value: 0,
          };
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
                <div className="last">
                    <img src={require(this.state.value === 0?'../images/renchi.png':'../images/yeshu.png')} alt="数据分析"></img>
                </div>
            </div>
        )
    }
}

export default DataAnalysis;