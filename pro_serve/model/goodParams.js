const mongoose = require('mongoose')
const {
  fashions,
  news,
  selects
} = require('./home_image_data.js')
const paramsScema = mongoose.Schema({
  id: String,
  //尺寸
  size: Array,
  //肩宽
  shoulderWidth: Array,
  //衣长
  closeWidth: Array,
  //胸围
  bustWidth: Array,
  //图案
  design: String,
  //厂名
  company: String,
  //季节
  season: String,
  //颜色
  color: String,
  //厂址
  address: String,
  //材质
  texture: String,
  //领型
  collarType: String
})

function rand(count, fuc = 'floor') {
  return fuc ? eval('Math.' + fuc + '(' + Math.random() * count + ')') : Math.random() * count
}

function randData(arr, multi = true, fixedItems, count, isArray = false) {
  let data = []
  if (multi) {
    if (fixedItems) {
      data = fixedItems
      arr = arr.filter(item => !fixedItems.includes(item))
    }
    //数据个数
    let dataCount = count ? count - 1 : rand(arr.length)
    for (let i = 0; i <= dataCount; i++) {
      //随机数据
      const randNum = rand(arr.length)
      if (!data.includes(arr[randNum])) {
        data.push(arr[randNum])
      } else {
        i--
      }
    }
  } else {
    const randNum = rand(arr.length)
    data.push(arr[randNum])
  }
  return isArray ? data : data.join(' ')
}

const sizeArr = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XS']

const shoulderWidthArr = [
  [160, 165, 170],
  [165, 170, 175],
  [170, 175, 180]
]

const designArr = ['字母', '文字', '数字']
const companyArr = ['杉 杉 (中国驰名商标)', '波司登 (中国驰名商标)', '红 豆 (中 国 名 牌)', '罗 蒙(中国驰名商标)', '报喜鸟(中国驰名商标)', '雅戈尔(中国驰名商标)', '鄂尔多斯(中国驰名商标)', '庄 吉(中国驰名商标)', '阳 光(中国驰名商标)', '柒 牌(中国驰名商标)']
const seasonArr = ['春季', '夏季', '秋季', '冬季']
const colorArr = ['白色', '黑色', '锡白色', '鹅黄色来', '淡粉色', '果绿色', '粉绿色', '淡蓝色', '淡紫色', '浅蓝色']
const aAddress = ['桂林七星路', '阳朔蟠桃路', '桂林象山区', '合肥庐阳区', '合肥蜀山区']
const addressArr = []
for (let i = 0; i < 30; i++) {
  const str = aAddress[rand(aAddress.length)] + rand(200) + '路'
  addressArr.push(str)
}
const closeWidthArr = [90, 92, 94, 96, 98, 100, 102, 104, 106, 88]
const bustWidthArr = [88, 90, 92, 94, 96, 98, 100, 102, 86]
const textureArr = ['羊毛', '羊绒', '涤纶', '棉']
const collarTypeArr = ['圆领', '衬衣领', '娃娃领', '菱领', '椭方领']

//数组:Array，可多个(默认true):Boolean，默认包含的数据的数组:Array

let Lists = {
  fashionData: [],
  newsData: [],
  selectsData: []
}
const cArr = [{
  list: fashions,
  name: 'fashionData'
}, {
  list: news,
  name: 'newsData'
}, {
  list: selects,
  name: 'selectsData'
}]


function callback(callback) {
  cArr.forEach((item, index) => {
    item.list.find({}, 'id -_id').then(res => {
      Lists[item.name] = res
      if (index == cArr.length - 1) {
        callback(Lists)
      }
    })
  })

}
const paramsList = mongoose.model('Param', paramsScema)
paramsList.findOne().then(res => {
  if (res) return
  callback(Lists => {
    //console.log(Lists);
    for (const name in Lists) {
      Lists[name].forEach((item, index) => {
        const size = ['S', 'M', 'L']
        const shoulderWidth = randData(shoulderWidthArr, false)
        const design = randData(designArr)
        const company = randData(companyArr, false)
        const season = randData(seasonArr, false)
        const color = randData(colorArr, true, ['白色', '黑色'])
        const collarType = randData(collarTypeArr)
        const closeWidth = randData(closeWidthArr, true, [], 3, true)
        const bustWidth = randData(bustWidthArr, true, [], 3, true)
        const texture = randData(textureArr)
        const address = randData(addressArr, false)
        const d = {
          id: item.id,
          size,
          shoulderWidth,
          design,
          company,
          season,
          color,
          collarType,
          closeWidth,
          bustWidth,
          texture,
          address
        }
        Lists[name][index] = d
      })
    }
    //多此二举了，就存在一个里面,前面就不用分模块了，前面懒得改了,id也多了，本来直接用id:_id就好，自己创了个。。。前端写的时候没那么方便了
    const paramsArr = [...Lists['fashionData'], ...Lists['newsData'], ...Lists['selectsData']]

    paramsList.create([...paramsArr]).then(res => {
      console.log('成功');
    })
  })
})

module.exports = paramsList
