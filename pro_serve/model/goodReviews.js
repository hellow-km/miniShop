const mongoose = require('mongoose')
const headImg = require('./headImg.js')
const {
  fashions,
  news,
  selects
} = require('./home_image_data.js')

const reviews = mongoose.model('Review', new mongoose.Schema({
  id: String,
  image: String,
  headImg: String,
  name: String,
  time: String,
  say: String,
  userId: String
}))

function rand(count, fuc = 'floor') {
  return fuc ? eval('Math.' + fuc + '(' + Math.random() * count + ')') : Math.random() * count
}

reviews.findOne().then(res => {
  if (res) return
  const headImgs = headImg

  const arr = [fashions, news, selects]
  const goodList = []

  function callback(callback) {
    arr.forEach((item, index) => {
      item.find({}, 'id image -_id').then(res => {
        goodList.push(...res)
        if (index == arr.length - 1) {
          callback(goodList)
        }
      })
    })
  }
  callback(goodList => {
    const li = goodList.map(item => {
      const r = rand(headImgs.length)
      return {
        id: item.id,
        image: item.image,
        headImg: headImgs[r],
        name: '默认账号',
        time: new Date().getTime(),
        say: '头号默认沙发'
      }
    })
    reviews.create(...li).then(res => {
      console.log('成功');
    })
  })
})

module.exports = reviews
