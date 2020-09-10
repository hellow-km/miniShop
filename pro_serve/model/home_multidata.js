const mongoose = require('mongoose')

const multidata = mongoose.model('Multidata', new mongoose.Schema({
  banner: Object,
  dKeyword: Object,
  keywords: Object,
  recommend: Object
}))

// multidata.create({
//   banner: {
//     context: {
//       currentTime: new Date().getTime()
//     },
//     isEnd: true,
//     list: [],
//     nextPage: 1
//   }
// })

module.exports = multidata