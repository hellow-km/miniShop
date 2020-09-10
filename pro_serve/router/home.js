const express = require('express')
const home = express.Router()
//const multidata = require('../model/home_multidata.js')
//const request = require('request')
const {
  fashions,
  news,
  selects
} = require('../model/home_image_data')

home.get('/multidata', async (req, res) => {
  res.send('请用1号接口')
})

home.get('/data', async (req, res) => {

  //res.sendFile(__dirname + "/" + req.url);
  //console.log("Request for " + req.url + " received.");
  const limit = req.query.pageSize ? req.query.pageSize : 30
  const skip = req.query.page ? req.query.page * limit : 0
  const type = req.query.type ? req.query.type : 'fashion'
  // const obj = {
  //   'fashion': 1,
  //   'news': 2,
  //   'select': 3
  // }
  // const id = obj[type]
  // items.find({
  //   id: id
  // }).then(result => {
  //   const data = result[0].items.splice(skip, limit)
  //   res.send(data)
  // }).catch(err => {
  //   res.send(err)
  // })
  const obj = {
    'fashion': fashions,
    'news': news,
    'select': selects
  }
  obj[type].find({}).limit(parseInt(limit)).skip(skip).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = home
