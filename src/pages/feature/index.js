import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout, AtButton } from 'taro-ui'
import './index.scss'

export default class FloatLayoutPage extends Taro.Component {
  config = {
    navigationBarTitleText: '让渡居·产品特性'
  }

  constructor () {
    super(...arguments)
    this.state = {
      isOpened1: false,
      isOpened2: false,
      isOpened3: false,
      isOpened4: false,
      isOpened5: false,
      isOpened6: false
    }
  }

  onScroll = (...args) => {
    console.log('onScroll', args)
  }

  onScrollToLower = args => {
    console.log('onScrollToLower', args)
  }

  onScrollToUpper = (...args) => {
    console.log('onScrollToUpper', args)
  }

  handleClick = type => {
    this.setState({
      [`isOpened${type}`]: true
    })
    console.log(this.state.isOpened1,this.state.isOpened2,this.state.isOpened3)
  }

  handleClose = type => {
    console.log('handleClose')
    this.setState({
      [`isOpened${type}`]: false
    })
    console.log(this.state.isOpened1,this.state.isOpened2,this.state.isOpened3)
  }

  render () {
    const { isOpened1, isOpened2, isOpened3, isOpened4, isOpened5, isOpened6 } = this.state

    return (
      <View className='page float-layout-page'>

        <View className='doc-body'>
          {/* 基本用法 */}
          <View className='panel'>
            <View className='panel__title'>优质床品</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, 1)}>
                  了解详情
                </AtButton>
              </View>
            </View>
          </View>

          {/* 最大高度 */}
          <View className='panel'>
            <View className='panel__title'>精品洗护</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, 2)}>
                  了解详情
                </AtButton>
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>高速WIFI</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, 3)}>
                  了解详情
                </AtButton>
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>智能门锁</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, 4)}>
                  了解详情
                </AtButton>
              </View>
            </View>
          </View>

          {/* 最大高度 */}
          <View className='panel'>
            <View className='panel__title'>核心商圈</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, 5)}>
                  了解详情
                </AtButton>
              </View>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>房间宽敞</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, 6)}>
                  了解详情
                </AtButton>
              </View>
            </View>
          </View>
        </View>

        <AtFloatLayout
          isOpened={isOpened1}
          onClose={this.handleClose.bind(this, '1')}
        >
          <View className='content-wrapper'>
          床品的介绍
          </View>
        </AtFloatLayout>

        <AtFloatLayout
          isOpened={isOpened2}
          onClose={this.handleClose.bind(this, '2')}
        >
          <View className='content-wrapper'>
            洗护的介绍
          </View>
        </AtFloatLayout>

        <AtFloatLayout
          isOpened={isOpened3}
          onScroll={this.onScroll}
          onScrollToLower={this.onScrollToLower}
          onScrollToUpper={this.onScrollToUpper}
          onClose={this.handleClose.bind(this, '3')}
        >
          <View className='content-wrapper'>
            wifi的介绍
          </View>
        </AtFloatLayout>

        <AtFloatLayout
          isOpened={isOpened4}
          onScroll={this.onScroll}
          onScrollToLower={this.onScrollToLower}
          onScrollToUpper={this.onScrollToUpper}
          onClose={this.handleClose.bind(this, '4')}
        >
          <View className='content-wrapper'>
            门锁的介绍
          </View>
        </AtFloatLayout>

        <AtFloatLayout
          isOpened={isOpened5}
          onScroll={this.onScroll}
          onScrollToLower={this.onScrollToLower}
          onScrollToUpper={this.onScrollToUpper}
          onClose={this.handleClose.bind(this, '5')}
        >
          <View className='content-wrapper'>
            商圈介绍
          </View>
        </AtFloatLayout>

        <AtFloatLayout
          isOpened={isOpened6}
          onScroll={this.onScroll}
          onScrollToLower={this.onScrollToLower}
          onScrollToUpper={this.onScrollToUpper}
          onClose={this.handleClose.bind(this, '6')}
        >
          <View className='content-wrapper'>
            房间介绍
          </View>
        </AtFloatLayout>


      </View>
    )
  }
}