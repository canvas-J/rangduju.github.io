import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.scss'
import qrImg from '../../assets/images/qr.jpg'

export default class CardPage extends Taro.Component {
  config = {
    navigationBarTitleText: '让渡居·用户评价'
  }

  constructor () {
    super(...arguments)
  }

  handleClick = () => {
    console.log('Card handleClick')
  }

  render () {
    return (
    //   <View className='page'>

    //     <View className='doc-body'>
    //       <View className='panel'>
    //         <View className='panel__content no-padding'>
    //         <View className='example-item flex-page'>
    //             <View className='at-row'>
    //               <View className='at-col'>
    //                 <View className='at-row'>微信公众号</View>
    //                 <View className='at-row'><Image src={qrImg} className='img' mode='widthFix'/></View>
    //               </View>
    //               <View className='at-col'>加入我们</View>
    //                 <View className='at-col'>

    //                 </View>
    //               <View className='at-col'>联系我们</View>
    //                 <View className='at-col'>
    //                     北京市朝阳区建国路88号, 
    //                     SOHO现代城B座，100025
    //                     13488895246
    //                     pr@rangduju.com
    //                 </View>
    //             </View>
    //           </View>
    //          </View>
    //       </View>
    //     </View>
    //   </View>

        <View className='page'>

        <View className='doc-body'>
        <View className='panel'>
            <View className='panel__content no-padding'>
            <View className='example-item'>
                <AtCard title='微信公众号'>
                <Image src={qrImg} className='img' mode='widthFix'/>
                </AtCard>
            </View>
            </View>
        </View>

        <View className='panel'>
            <View className='panel__content no-padding'>
            <View className='example-item'>
                <AtCard title='联系我们'>
                北京市朝阳区建国路88号, 
                SOHO现代城B座, 100025<br/>
                13488895246,
                pr@rangduju.com
                </AtCard>
            </View>
            </View>
        </View>
        <View className='panel'>
            <View className='panel__content no-padding'>
            <View className='example-item'>
                <AtCard title='加入我们'>
                    <a href="https://hr.lagou.com/company/gongsi/580231.html">拉勾</a><br/>
                    <a href="https://www.zhipin.com/gongsi/7129188de810def203N_3d65EQ~~.html?ka=search_list_company_1_custompage">BOSS直聘</a>
                </AtCard>
            </View>
            </View>
        </View>
        </View>
        </View>
    )
  }
}