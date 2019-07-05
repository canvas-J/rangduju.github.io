import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.scss'

export default class CardPage extends Taro.Component {
  config = {
    navigationBarTitleText: '让渡居·用户评价'
  }

  constructor () {
    super(...arguments)

    this.state = {
      list: [
        {
          id: 1,
          author: 'Jie',
          content: 'location:地理位置极佳,距离枣营地铁站走路4分钟,出行非常方便｡步行15分钟左右到达蓝港,此外离朝阳公园和国贸也很近｡ surroundings:周边配套设施完善,马路对面是京客隆大型超市､小型菜市场和水果店,楼下两家24小时便利店,也有理发店､打印店,楼下一番街和马路对面的日料店都值得一吃,赶时间也有麦当劳和煎饼果子｡附近就有麦子店派出所,非常安全｡ inside:所见即所得,房间内部整体舒适度很高,房间朝南,从早到晚一直有阳光｡空气净化器对咽炎患者非常友善,打开之后在出风口滴一滴香水房间会变香香的~ 值得一提的还有床垫,超级舒服｡大家共享两个卫生间,热水稳定,配有全自动洗衣机｡ neighbors:邻居都是年轻人,日常不会打扰到对方生活,晚上睡觉时间不会吵闹比较安静｡ 此外房东人也很好,中间多次沟通都及时回复,超级nice｡',
        },
        {
          id: 2,
          author: '若',
          content: '挺不错，租一间房的话会碰到合租的。而且他家要办会员,如果经常去北京的话办一个挺合适。都是在普通小区里没有很难找,房东挺好的。',
        }
      ]
    }
  }

  handleClick = () => {
    console.log('Card handleClick')
  }

  render () {
    return (
      <View className='page'>

        <View className='doc-body'>
          <View className='panel'>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtCard title='Jie的评价'>
                location:地理位置极佳,距离枣营地铁站走路4分钟,出行非常方便｡步行15分钟左右到达蓝港,此外离朝阳公园和国贸也很近｡ surroundings:周边配套设施完善,马路对面是京客隆大型超市､小型菜市场和水果店,楼下两家24小时便利店,也有理发店､打印店,楼下一番街和马路对面的日料店都值得一吃,赶时间也有麦当劳和煎饼果子｡附近就有麦子店派出所,非常安全｡ inside:所见即所得,房间内部整体舒适度很高,房间朝南,从早到晚一直有阳光｡空气净化器对咽炎患者非常友善,打开之后在出风口滴一滴香水房间会变香香的~ 值得一提的还有床垫,超级舒服｡大家共享两个卫生间,热水稳定,配有全自动洗衣机｡ neighbors:邻居都是年轻人,日常不会打扰到对方生活,晚上睡觉时间不会吵闹比较安静｡ 此外房东人也很好,中间多次沟通都及时回复,超级nice｡
                </AtCard>
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtCard title='若的评价'>
                挺不错，租一间房的话会碰到合租的。而且他家要办会员,如果经常去北京的话办一个挺合适。都是在普通小区里没有很难找,房东挺好的。
                </AtCard>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}