const mongoose = require('mongoose')

const user = new mongoose.Schema({
  userName: String,
  passWord: String,
  headImage: String,
  starGoods: Array,
  email: String,
  token: String,
  name: String,
  cartGoods: Array,
  money: Number
})
const users = mongoose.model('User', user)

module.exports = users
