const express = require('express')
const my = express.Router()
const user = require('../model/login.js')
const {
  fashions,
  news,
  selects
} = require('../model/home_image_data')

const goodArr = {
  fashion: fashions,
  news: news,
  select: selects
}

my.post('/star', (req, res) => {
  const data = []
  const idObj = req.body
  for (const key in idObj) {
    goodArr[key].find({
      _id: {
        "$in": idObj[key]
      }
    }).then(result => {
      data.push(...result)
      if (key == 'select') {
        setTimeout(() => {
          res.send(data)
        }, 5)
      }
    })
  }
})
my.post('/invest', (req, res) => {
  user.updateOne({
    _id: req.body.userId
  }, {
    $inc: {
      money: req.body.money
    }
  }).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

module.exports = my
