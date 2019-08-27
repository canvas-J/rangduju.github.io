import React from 'react';

class Cooperation extends React.Component{
    constructor(){
        super();
        this.state={
            list:[{
                title:'房屋配置和发布优化',
                content:'从设计、装修、改造、打扫你的整套房产，到房屋的描述、照片和入住指引——我们审阅每一处文字和图片细节，确保发布的质量，从而可以使房源排在Airbnb的第一页。'
            },{
                title:'智能定价管理',
                content:'我们每日都会审核每间房屋的售价，定价团队会利用算法，结合未来空置情况和市场行情不断调整，智能匹配到最健康的价格，来迎接新的订单。'
            },{
                title:'房客资质筛选',
                content:'运营团队会定期查看已下订单房客的历史评价，最大程度确保所服务对象的素质水准，做好房客端的风险管控，保证他们善意使用房屋。'
            },{
                title:'专业的保洁及审查',
                content:'我们的保洁服务商注重细节和效率，有丰富的民宿保洁经验。同时，我们专门开发了检查系统，从而更高效得管理保洁流程，保证每间房的清洁质量符合房客的期待。'
            },{
                title:'财务收益报告',
                content:'针对您的月度财务收益，我们会提供全面而细致的收益信息，罗列清楚各项收支，并且提供您和我们平均收益水平的比较，从而更有方向得去改进升级。'
            },{
                title:'后台客服系统',
                content:'我们会在房客的整个入住流程阶段自动发布入住指引、注意事项，确保其入住前、中、后等全过程的方便、顺畅。提前解答可能会有的困惑，预防性的解决可能发生的问题，最大程度上确保良好的体验。'
            },{
                title:'房客沟通',
                content:'我们负责同房客的全部沟通，对于房客的一切服务需求，哪怕是应急要求，我们都有过处理并妥善解决的先例经验。这也是我们自信于让渡居服务水准的一大原因。'
            }]
        }
    }
    render(){
        return(
            <div className="cooperation">
                <div className="text-center">
                    <img src={require("../images/ruhehezuochangtu.png")} alt="常见疑惑"></img>
                </div>
                <dl className="distance">
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
            </div>
        )
    }
}

export default Cooperation;