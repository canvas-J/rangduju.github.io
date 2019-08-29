import React from 'react';
import InfiniteListExample from '../common/infiniteListExample';
import DataAnalysis from './dataAnalysis';



class Home extends React.Component{
    render(){
        return(
            <div className="first">
                <div></div>
                <div></div>
                <div></div>
                <DataAnalysis />
                <div className="evaluate">
                    <p>用户评价</p>
                    <InfiniteListExample />
                </div>
                <div className="dis-flex work">
                    <div>
                        <img src={require("../images/foot.gif")} className="work_img" alt="工作中"></img>
                    </div>
                    <div className="work_text">
                        <p>我们随时恭候您的垂询</p>
                        <p>
                           无论您是希望有机会参与共享经济，还是只想让空置房屋变现，或者二者皆有，我们都可以帮助您加入到这一进程。我们团队有丰富的专业机构从业经历，具有深厚的技术功底，对行业有深入的理解、洞察，有信心对市场波动做出最快反应，并保证房客入住体验的标准化服务。而这一切专业经验都会服务于您！
                        </p>
                    </div>
                </div>
                {/* <div className="clear"></div> */}
            </div>
        )
    }
}

export default Home;