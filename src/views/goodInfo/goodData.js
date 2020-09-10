import model from '@/api'

let info = {}

const infoRequest = (id, type) => {
  return model.$get('goodInfo', {
    id,
    type
  }, {
    instanceNum: 2
  }).then(res => {
    return res.data[0]
  })
}

const imgsRequest = (type, page = rand('floor', 10)) => {
  return model.$get('home_data', {
    type,
    page
  }, {
    instanceNum: 2
  }).then(res => {
    return res.data
  })
}

function rand(fuc, count) {
  return fuc ? eval('Math.' + fuc + '(' + Math.random() * count + ')') : Math.random() * count
}

const infoData = async (id, type) => {
  //轮播图图片
  const swipperNum = 3
  //需要随机的图片数量
  const imgLisLength = 8
  info = await infoRequest(id, type)
  const imgData = await imgsRequest(type)
  //添加当前商品图片到第一个轮播图里
  const imgArr = [info.image]
  for (let i = 0; i < imgLisLength; i++) {
    const randImg = rand('floor', 30)
    imgArr.push(imgData[randImg].image)
  }
  const swipperImgs = imgArr.splice(0, swipperNum)
  const goodImg = imgArr

  const sells = rand('floor', 10000)
  const allSells = sells + rand('floor', 50000)
  info = {
    ...info,
    swipperImgs,
    goodImg,
    sells,
    sendTime: '72小时发货',
    allSells,
    message: '【两件69元】 【新品特惠】 【赠送运费险 七天无理由退换货】 【无忧售后】'
  }
  return info
}

export default infoData
