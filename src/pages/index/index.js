import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import bgImg from '../../assets/images/rangduju-bg.jpg'
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
          content: '民宿',
        },
        {
          id: 'Feature',
          title: '产品特性',
          content: '高端大气上档次',
        },
        {
          id: 'Predict',
          title: '短租潜力预测',
          content: 'something',
        },
        {
          id: 'HouseManagement',
          title: '房源委托管理',
          content: 'something',
        },
        {
          id: 'Feedback',
          title: '用户评价',
          content: 'something',
        },
        {
          id: 'Contact',
          title: '联系我们',
          content: 'something',
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
      window.location.assign('http://rangduju.mikecrm.com/SlDriig');
    }
    else if (id == "HouseManagement") {
      window.location.assign('https://mp.weixin.qq.com/s/nooOEuayOiJHdYGsxQU04Q');
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
      <View className='page page-index'>
        <View className='logo'>
          <Image src={bgImg} className='img' mode='widthFix'/>
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
    )
  }
}
