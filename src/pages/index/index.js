import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import bgImg from '../../assets/images/rangduju-bg.jpg'
import qrImg from '../../assets/images/qr2.jpg'


import './index.scss'
import { windowWhen } from 'rxjs/operator/windowWhen';

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '让渡居'
  }

  constructor () {
    super(...arguments)

    this.state = {
      list: [
        {
          id: 'About',
          title: '关于我们',
          content: '',
        },
        {
          id: 'Predict',
          title: '短租潜力预测',
          content: '',
        },
        {
          id: 'HouseManagement',
          title: '房源委托管理',
          content: '',
        },
        {
          id: 'Feedback',
          title: '用户评价',
          content: '',
        }
      ]
    }
  }

  onShareAppMessage () {
    return {
      title: 'Rangduju',
      path: '/pages/index/index',
      // imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    }
  }

  gotoPanel = e => {
    const { id } = e.currentTarget.dataset
    console.log(id)
    if (id == "Predict") {
      window.open('http://rangduju.mikecrm.com/SlDriig');
    }
    else if (id == "HouseManagement") {
      window.open('https://mp.weixin.qq.com/s/l464ptnhlF74lSARy11FJw');
    }
    else {
      Taro.navigateTo({
        // url: `/pages/panel/index?id=${id.toLowerCase()}`
        url: `/pages/${id.toLowerCase()}/index`
      })
    }
  }

  render () {
    const { list } = this.state

    return (
      <div>
        <View className='page page-index'>
          <View className='logo'>
            <Image src={bgImg} className='img' mode='scaleToFill'/>
          </View>
          <View className='page-title'>让渡居</View>
          <View className='module-list'>
            {list.map((item, index) => (
              <View
                className='module-list__item'
                key={index}
                data-id={item.id}
                data-name={item.title}
                data-list={item.subpages}
                onClick={this.gotoPanel}
              >
                <View className='module-list__item-title'>{item.title}</View>
                <View className='module-list__item-content'>{item.content}</View>
              </View>
            ))}
          </View>
        </View>
        <footer>
          <View className='at-row'>
            <View className='at-col'>
              微信公众号<br/>
              <br/>
              <Image src={qrImg} className='qr' mode='aspectFit' />
            </View>
            <View className='at-col'>
              联系我们<br/>
               <br/>
              北京市朝阳区建国路88号, <br/>
              SOHO现代城B座, 100025<br/>
              办公电话：010-85890977<br/>
              电子邮箱：pr@rangduju.com<br/>
            </View>
            <View className='at-col'>
              加入我们<br/>
              <br/>
              <a href="https://hr.lagou.com/company/gongsi/580231.html">拉勾</a><br/>
              <a href="https://www.zhipin.com/gongsi/7129188de810def203N_3d65EQ~~.html?ka=search_list_company_1_custompage">BOSS直聘</a>
            </View>
          </View>
        </footer>
        </div>
    )
  }
}
