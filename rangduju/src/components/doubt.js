import React from 'react';
// import { Pagination } from 'antd';

class Doubt extends React.Component{
    constructor(){
        super();
        this.state={
            list:[{
                title:'让渡居为我提供的服务是什么?',
                content:'作为数字科技驱动的房屋管理机构，让渡居致力于利用技术优势提高房产的经济回报。如果您是房产的拥有者，并且有兴趣尝试短租，那么让渡居将作为您的最佳选择，不仅能招徕更优质的房客，您还可以时刻了解自己房产的最新状态，包括订单状态、空置水平、收益情况等。'
            },{
                title:'你们与Airbnb有什么区别?',
                content:'短租平台做的事情是解决需求，而让渡居专注于提升供给方的运营水准，让民宿在平台上卖得更好，最终让民宿主人坐享更高收益。中国空置房屋适合做短租的有很多，我们的愿景不是做平台，而是找到中国房地产和酒店业两边交集的地方。<br />以Airbnb为代表的平台用户以年轻一族为主，无论是度假旅行还是商务差旅，他们倾向于便宜，便捷，个性化的用户体验，享受和家里一样的舒适设施。这同我们服务的目标群体高度重叠，因此简单来说，自带OTA属性的平台是我们的重要的销售渠道，而我们是它们的B端供给。'
            },{
                title:'让渡居是否属于中介?',
                content:'广义上，让渡居同管理咨询公司、投资银行一样都属于中介服务业。但严格来讲，区别于传统房屋中介的租赁模式，让渡居是一家专业的房屋资产管理服务机构，致力于为您提高闲置房屋的资产回报率。让渡居的核心能力并非销售，我们不追求从更高频的交易中，而是借助技术优势，提供系统性的短租运营方案。'
            },{
                title:'使用让渡居的服务，我需要支付哪些运营成本?',
                content:'固定成本和可变成本。固定成本为合作初期房屋设计改造配置的一次性投入；可变成本包含：让渡居运营管理费、运营固定服务费。目前我国短租托管公司采用的收费标准大部分高于或等于10%，让渡居通过技术赋能以提升成本管控能力，因此可以提供有竞争力的管理费率，其计费基数为房屋的月度订单总收入（扣除平台服务费后）。'
            },{
                title:'对房子会进行何种程度的装修，是否有专业的设计，是否会征求房主的意见?',
                content:'房屋装修有一定免费额度，具体金额需要等到上门实地勘房后根据您房源目前的装修情况和周围竞品的平均水准而定，一个报销额的参考值是3000元每间卧室。我们有合作的专做租房空间改造的设计师，改造前考虑到您之后可能重新自住会与房东协商方案，超出报销额的部分需要由您垫付。'
            }]
        }
    }
    render(){
        return (
            <div className="doubt distance">
                <div className="text-center">
                    <img src={require("../images/chahua2.png")} alt="常见疑惑"></img>
                </div>
                <dl>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                <label key={index}>
                                <dt>{item.title}</dt>
                                <dd dangerouslySetInnerHTML={{__html:item.content}}></dd>
                                </label>
                            )
                        })
                    }
                </dl>
                <ul>
                    <li className="text-center active">1</li>
                    <div></div>
                    <li className="text-center">2</li>
                    <div></div>
                    <li className="text-center">3</li>
                </ul>
                {/* <Pagination defaultCurrent={1} total={50} /> */}
            </div>
        );
    }
}


export default Doubt;