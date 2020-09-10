const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const logos = require('./logoData')

function readImgFile(typeStr) {
  const files = fs.readdirSync(path.join(__dirname, '../public/images', typeStr))
  const arr = []
  const title = typeStr.split('/')[1]
  files.map(function (item, index) {
    arr.push({
      image: 'http://localhost:3000/public/images' + typeStr + '/' + item,
      title: title + index,
      price: (Math.random() * 500).toFixed(2),
      star: Math.ceil(Math.random() * 10000),
      redStar: false
    })
  })
  arr[0].redStar = true
  arr[5].redStar = true
  return arr
}



let fashionList = readImgFile('/fashion/1597885056025')
let newsList = readImgFile('/news/1597885587866')
let selectList = readImgFile('/select/1597885380298')

const arrSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  price: Number,
  star: Number,
  redStar: Boolean,
  shopLogo: String,
  shopName: String,
  allGoods: Number,
  sayScore: Number,
  priceScore: Number,
  goodScore: Number,
  newPrice: Number,
  count: Number
})

const fashions = mongoose.model('Fashion', arrSchema)
const news = mongoose.model('New', arrSchema)
const selects = mongoose.model('Select', arrSchema)

const iArr = [fashions, news, selects]
const lArr = [fashionList, newsList, selectList]

function rand(fuc, count) {
  return fuc ? eval('Math.' + fuc + '(' + Math.random() * count + ')') : Math.random() * count
}

lArr.forEach(item => {
  item.forEach((p, index) => {
    const random = rand('floor', logos.length)
    p = {
      ...p,
      ...logos[random],
      allGoods: rand('ceil', 500),
      sayScore: (4 + parseFloat(rand('', 1))).toFixed(2),
      priceScore: (4 + parseFloat(rand('', 1))).toFixed(2),
      goodScore: (4 + parseFloat(rand('', 1))).toFixed(2),
      id: new Date().getTime() + Math.random().toString().split('.')[1],
    }
    item[index] = p
  })
})

iArr.forEach((item, index) => {
  // item.deleteMany().then(res => {
  //   console.log(res);
  // })
  item.findOne().then(res => {
    if (res) return
    item.create(
      [...lArr[index]]
    )
  })
})
//新价格
// iArr.forEach(item => {
//   item.find().then(result => {
//     result.forEach(p => {
//       item.updateMany({
//         id: p.id
//       }, {
//         $set: {
//           "newPrice": (p.price - (p.price / 2 * Math.random())).toFixed(2)
//         }
//       }).then(res => {
//         console.log(res);
//       })
//     })

//   })
// })





module.exports = {
  fashions,
  news,
  selects
}
